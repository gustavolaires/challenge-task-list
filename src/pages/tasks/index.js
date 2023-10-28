import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ref, push, child, onValue } from "firebase/database";
import { io } from "socket.io-client";
import ClipLoader from 'react-spinners/ClipLoader';

import { AuthContext } from '@/contexts/AuthContext'
import { DatabaseContext } from '@/contexts/DatabaseContext'
import { SocketContext } from '@/contexts/SocketContext';
import NavBar from '@/layouts/NavBar'
import Headers from '@/layouts/Header';
import TaskCard from '@/layouts/TaskCard'
import { Priorities, Statuses } from '@/utils/generics';

const getPriorityFilterInitialState = (value) => {
  const initialState = Priorities.reduce((acc, element) => {
    acc[element.value] = value
    return acc
  }, {})

  return initialState
}

export default function TaskList() {
  const { database } = useContext(DatabaseContext)
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [ user, loading ] = useAuthState(auth)
  const router = useRouter()

  const [ tasks, setTasks ] = useState([])
  const [ users, setUsers ] = useState([])
  const [ priorityFilter, setPriorityFilter ] = useState(getPriorityFilterInitialState(true))
  const [ statusFilter, setStatusFilter ] = useState('all')
  const [ initialDataLoaded, setInitialDataLoaded ] = useState(false)

  //console.log('users: ', users)
  //console.log('initialDataLoaded: ', initialDataLoaded)
  console.log('Priorities: ', Priorities)
  console.log('tasks: ', tasks)
  
  useEffect(() => {
    // Retrieve all tasks
    loadTasks()
    // Connect socket
    socketInitializer()
  }, [])

  useEffect(() => {
    // Retrive all users
    loadUsers()
  }, [user])

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading])

  const handleSignOut = () => {
    auth.signOut()
  }

  const socketInitializer = async () => {
    await fetch('/api/socket')

    // Listen for incoming messages
    socket.on('sync-tasks', (data) => {
      loadTasks()
    })

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }

  const loadTasks = () => {
    const taskRef = ref(database, 'tasks/')
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();

      if(data) {
        const taskList = Object.entries(data).map(([key, value]) => {
          return {
            id: key,
            title: value.title,
            description: value.description,
            priority: value.priority,
            done: value.done,
            responsible: value.responsible ? value.responsible : null,
            createdBy: value.createdBy ? value.createdBy : null,
            createdAt: value.timestamp || 0
          }
        })

        taskList.sort((a, b) => {
            const aIsDone = a.done ? 1 : -1
            const bIsDone = b.done ? 1 : -1

            return b.priority - a.priority || aIsDone - bIsDone || a.createdAt - b.createdAt
          })

        //console.log(taskList)
        //console.log()
        setTasks(taskList)
      } 
    })
  }

  const loadUsers = async () => {
    if (user) {
      await user.getIdToken()
        .then((idToken) => {
          return fetch('http://localhost:3000/api/users', {
            headers: {Authorization: `Bearer ${idToken}`}
          })
        })
        .then((response) => response.json())
        .then((result) => setUsers(result.users))
        .catch((err) => console.error(err))
        .finally(() => setInitialDataLoaded(true))
    }
  }

  const handleCreateTask = (formData, id) => {
    const taskData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      done: false,
      responsible: formData.responsible,
      createdBy: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      timestamp: Date.now()
    }

    console.log(taskData)
    
    // Send data to database with Auto UID
    push(child(ref(database), 'tasks'), taskData)
    socket.emit('update-tasks', true)
  }
  
  return (
    <>
      {
        user &&
        <div className='min-h-screen bg-gray-100'>
          <NavBar signOutCallback={handleSignOut}
            user={{
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL
            }}
            userLoaded={initialDataLoaded}
          />

          <Headers
            users={users}
            actionModelCallback={handleCreateTask}
            priorityFilter={priorityFilter}
            priorityFilterCallback={setPriorityFilter}
            statusFilter={statusFilter}
            statusFilterCallback={setStatusFilter}
          >
            <span>Tarefas</span>
          </Headers>

          <main className='flex flex-wrap content-start justify-center sm:justify-start bg-gray-100 text-neutral-950 px-4 sm:px-8 py-4 pb-10'>
            {tasks
              .filter((task) => {
                {/* Filtro por status */}
                const status = Statuses.find(e => e.value === statusFilter)

                return status.done.includes(task.done)
              })
              .filter((task) => {
                {/* Filtro por prioridade */}
                return priorityFilter[task.priority]
              })
              .map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    done={task.done}
                    createdBy={task.createdBy}
                    createdAt={task.createdAt}
                    responsible={task.responsible}
                    user={user}
                    users={users}
                  />
                )
              })}
          </main>
        </div>
      }
      {
        !initialDataLoaded &&
        <div className='flex justify-center items-center h-screen'>
          <ClipLoader
            loading={!initialDataLoaded}
            color='#4f46e5'
            size={100}
          />
        </div>
      }
    </>
  )
}