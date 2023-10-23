import { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AuthContext } from '@/contexts/AuthContext'
import InputField from '@/components/InputField'
import Button from '@/components/Button'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { auth, googleProvider, githubProvider } = useContext(AuthContext)
  const [ user ] = useAuthState(auth)
  const router = useRouter()
  const ref = useRef();

  useEffect(() => {
    if (user) router.push('/tasks')
  }, [user])

  const handleSignIn = async (data, e) => {
    e.preventDefault()
    console.log(data)
  }

  const handleSingInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
  }

  const handleSingInWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider)
  }

  return (
    <main className='flex flex-col items-center h-screen bg-gray-300 pb-10'>
      <div className='mt-10'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 leading-6'>
          Sign in to tasker
        </h2>
      </div>

      <div className='bg-gray-100 mt-10 px-6 py-8 w-full sm:rounded-md sm:max-w-sm '>
        <form className='space-y-6' onSubmit={handleSubmit(handleSignIn)}>
            <InputField
              {...register('email')}
              id='email'
              type='email'
              label='Email'
              placeholder='my-email@email.com'
              ref={ref}
            />
            <InputField
              {...register('password')}
              id='password'
              type='password'
              label='Senha'
              ref={ref}
            />

            <Button className='bg-indigo-600 hover:bg-indigo-500'>
              <span className='text-gray-50'>Login</span>
            </Button>

          <div className='flex flex-row justify-between items-center relative pt-6'>
            <span className='block w-full h-0.5 rounded-xl bg-gray-300'/>
            <span className='block mx-4 whitespace-nowrap text-sm font-medium text-gray-900 leading-6'>
              Or continue with
            </span>
            <span className='block w-full h-0.5 rounded-xl bg-gray-300'/>
          </div>

          <Button 
            className='bg-gray-100 hover:bg-slate-200 ring-1 ring-inset ring-gray-300'
            onClick={handleSingInWithGoogle}
          >
            <span className='text-gray-900'>Google</span>
          </Button>

          <Button 
            className='bg-neutral-900 hover:bg-neutral-800'
            onClick={handleSingInWithGithub}
          >
            <span className='text-gray-50'>GitHub</span>
          </Button>

        </form>
      </div>

      <div className='mt-10'>
        <span className='text-sm font-medium text-gray-500 leading-6'>
          Don´t have an account? Sign up
        </span>
      </div>
    </main>
  )
}