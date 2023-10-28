import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { io } from "socket.io-client"
import ClipLoader from 'react-spinners/ClipLoader'

import { AuthContext } from '@/contexts/AuthContext'

export default function SingIn() {
  const { register, handleSubmit } = useForm();
  const { auth, googleProvider, githubProvider } = useContext(AuthContext)
  const [ userFromProviders ] = useAuthState(auth)
  const [ signInWithEmailAndPassword, user, loading, error ] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()
  const socket = io()

  useEffect(() => {
    socket.disconnect()
  }, [])

  useEffect(() => {
    if (user || userFromProviders) router.push('/tasks')
  }, [user, userFromProviders])

  const handleSignIn = async (formData, e) => {
    e.preventDefault()
    signInWithEmailAndPassword(formData.email, formData.password)
  }

  const handleSingInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
  }

  const handleSingInWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider)
  }

  const handleSingUp = () => {
    router.push('/singup')
  }

  return (
    <>
      {
        loading &&
        <div className='flex justify-center items-center h-screen'>
          <ClipLoader
            loading={!loading}
            color='#4f46e5'
            size={100}
          />
        </div>
      }
      {
        !loading &&
        <main className='flex flex-col items-center min-h-screen bg-gray-300 pb-10'>
          {/* Title */}
          <div className='mt-10'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 leading-6'>
              Sign in to tasker
            </h2>
          </div>

          {/* Body */}
          <div className='bg-gray-100 mt-10 px-6 py-8 w-full sm:rounded-md sm:max-w-sm '>
            <form className='space-y-6' onSubmit={(handleSubmit(handleSignIn))}>
                
                {/* Login Input */}
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-900 leading-6'>Email</label>
                  <input
                    {...register('email')}
                    id='email'
                    type='email'
                    placeholder='example@email.com'
                    className='block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5 ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-400'
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-900 leading-6'>Senha</label>
                  <input
                    {...register('password')}
                    id='password'
                    type='password'
                    placeholder='Digite sua senha'
                    className='block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5 ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-400'
                  />
                </div>

                <div>
                  <button className='block w-full rounded-md leading-6 font-semibold p-2 bg-indigo-600 hover:bg-indigo-500'>
                    <span className='text-gray-50'>Login</span>
                  </button>
                </div>

              <div className='flex flex-row justify-between items-center relative py-2'>
                <span className='block w-full h-0.5 rounded-xl bg-gray-300'/>
                <span className='block mx-4 whitespace-nowrap text-sm font-medium text-gray-900 leading-6'>
                  Or continue with
                </span>
                <span className='block w-full h-0.5 rounded-xl bg-gray-300'/>
              </div>

              {/* Google Btn */}
              <div>
                <button 
                  className='block w-full rounded-md leading-6 font-semibold p-2 bg-gray-100 hover:bg-slate-200 ring-1 ring-inset ring-gray-300'
                  onClick={handleSingInWithGoogle}
                >
                  <span className='text-gray-900'>Google</span>
                </button>
              </div>

              {/* Github Btn */}
              <div>
                <button 
                  className='block w-full rounded-md leading-6 font-semibold p-2 bg-neutral-900 hover:bg-neutral-800'
                  onClick={handleSingInWithGithub}
                >
                  <span className='text-gray-50'>GitHub</span>
                </button>
              </div>

            </form>
          </div>

          {/* Footer */}
          <div className='mt-10'>
            <span className='text-sm font-medium text-gray-500 leading-6'>
              {`Don´t have an account? `}
              <button 
                className='text-indigo-500 font-semibold'
                onClick={() => handleSingUp()}
              >
                Sign up
              </button>
            </span>
          </div>
        </main>
      }
    </>
  )
}