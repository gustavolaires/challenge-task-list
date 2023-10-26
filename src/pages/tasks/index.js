import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ref, push, child, onValue } from "firebase/database";

import { AuthContext } from '@/contexts/AuthContext'
import { DatabaseContext } from '@/contexts/DatabaseContext'
import NavBar from '@/layouts/NavBar'
import CreateTaskModal from '@/layouts/CreateTaskModal'
import TaskCard from '@/layouts/TaskCard'

const priorities = [
  {value: '2', label: 'Muito alta', borderColor: 'border-red-600', bgColor: 'bg-red-600', textColor: 'text-white'},
  {value: '1', label: 'Alta', borderColor: 'border-yellow-600', bgColor: 'bg-yellow-600', textColor: 'text-gray-900'},
  {value: '0', label: 'Normal', borderColor: 'border-gray-400', bgColor: 'bg-gray-600', textColor: 'text-white'},
  {value: '-1', label: 'Baixa', borderColor: 'border-blue-600', bgColor: 'bg-blue-600', textColor: 'text-white'},
  {value: '-2', label: 'Muito baixa', borderColor: 'border-cyan-600', bgColor: 'bg-cyan-300', textColor: 'text-gray-900'},
]

export default function TaskList() {
  const { database } = useContext(DatabaseContext)
  const { auth } = useContext(AuthContext);
  const [ user, loading ] = useAuthState(auth)
  const router = useRouter()

  const [ tasks, setTasks ] = useState([])
  
  useEffect(() => {
    console.log(auth)
    
    // Retrieve all tasks
    loadTasks()

  }, [])

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading])

  const handleSignOut = () => {
    auth.signOut()
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

            return b.priority - a.priority || aIsDone - bIsDone || a.timestamp - b.timestamp
          })

        console.log(taskList)
        console.log()
        setTasks(taskList)
      } 
    })
  }
  const handleCreateTask = (formData) => {
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
  }
  
  return (
    <>
      {
        user &&
        <div className='min-h-screen'>
          <NavBar signOutCallback={handleSignOut}
            user={{
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL
            }}
          />

          <header className='flex flex-col sm:flex-row justify-between items-center bg-white'>
            <div className='px-8 py-4 text-2xl text-gray-900'>
              Tarefas
            </div>
            <div className='px-8 py-4'>
              <CreateTaskModal createTaskCallback={handleCreateTask} user={user} priorities={priorities}/>
            </div>
          </header>

          <main className='flex flex-wrap content-start justify-center sm:justify-start h-screen bg-gray-100 text-neutral-950 px-2 sm:px-8 py-4'>
            {tasks.map((task) => {
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
                  priorities={priorities}
                />
              )
            })}
          </main>
        </div>
      }
    </>
  )
}