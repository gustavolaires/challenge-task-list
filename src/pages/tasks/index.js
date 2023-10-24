import { useState, useEffect, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AuthContext } from '@/contexts/AuthContext'
import NavBar from '@/layouts/NavBar'
import Modal from '@/components/Modal'
import InputField from '@/components/InputField'
import Select from '@/components/Select'
import TaskCard from '@/layouts/TaskCard'

const tasks = require('@/data/tasks.json');

export default function TaskList() {
  const { auth } = useContext(AuthContext);
  const [ user, loading ] = useAuthState(auth)
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const [ loggedIn, setLoggedIn ] = useState(user !== null)
  const ref = useRef();
  
  useEffect(() => {
    if (!loggedIn && !loading) router.push('/')
  }, [loggedIn])

  const handleSignOut = () => {
    auth.signOut()
    setLoggedIn(false)
  }
  
  return (
    <div className='min-h-screen'>
      <NavBar user={{name: user?.displayName, email: user?.email}} signOutCallback={handleSignOut}/>

      <header className='flex flex-col sm:flex-row justify-between items-center bg-white'>
        <div className='px-8 py-4 text-2xl text-gray-900'>
          Tarefas
        </div>
        <div className='px-8 py-4'>
          <Modal showBtnValue={'Criar tarefa'} title={'Nova tarefa'} actionBtnValue={'Criar tarefa'}>
            <form className='space-y-6'>
              <InputField
                {...register('name')}
                id='name'
                label='Nome'
                ref={ref}
              />

              <InputField
                {...register('description')}
                id='description'
                label='Descrição'
                ref={ref}
              />

              <Select
                {...register('priority')}
                id='priority'
                label='Prioridade'
                values={['higher', 'high', 'medium', 'low', 'lower']}
              />

              <InputField
                {...register('responsible')}
                id='responsible'
                label='Responsável'
                ref={ref}
              />

            </form>
          </Modal>
        </div>
      </header>

      <main className='flex flex-wrap content-start justify-center sm:justify-start h-screen bg-gray-100 text-neutral-950 px-8 py-4'>
        {tasks.map((task) => {
          return (
            <TaskCard 
              title={task.title}
              description={task.description}
              priority={task.priority}
              done={task.done}
              created-by={task.createdBy}
              responsible={task.responsible}
            />
          )
        })}
      </main>
    </div>
  )
}