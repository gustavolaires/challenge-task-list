import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { io } from "socket.io-client"
import ClipLoader from 'react-spinners/ClipLoader'
import { XCircleIcon } from '@heroicons/react/24/solid'

import { AuthContext } from '@/contexts/AuthContext'

export default function SingUp() {
  const { register, handleSubmit, getValues } = useForm();
  const { auth } = useContext(AuthContext)
  const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(auth);
  const socket = io()

  const router = useRouter()
  
  const [ validationError, setValidationError ] = useState(null)

  useEffect(() => {
    socket.disconnect()
  })

  useEffect(() => {
    if (user) router.push('/tasks')
  }, [user])

  console.log('email: ', getValues('email'))

  const validateEmail = () => {
    if (getValues('email') !== '') {
      const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-])+(?:\.[a-zA-Z0-9-]+)/, "gm")
      return emailRegex.test(getValues('email'))
    }

    return false
  }

  const handleSignUp = async (formData, e) => {
    e.preventDefault()

    if(!validateEmail()) { 
      setValidationError('O e-mail informado não é válido')
    } else if(formData.password === '' || formData['password-repeat'] === '') { 
      setValidationError('A senha é obrigatória') 
    } else if(formData.password !== formData['password-repeat']) { 
      setValidationError('As senhas informadas são diferentes') 
    } else {
      createUserWithEmailAndPassword(formData.email, formData.password)
    }
  }

  const getEmailClassOnError = () => {
    if (validationError && !validateEmail()) return 'ring-red-600'
    return ''
  }

  const getPasswordClassOnError = () => {
    if (validationError && validateEmail()) return 'ring-red-600'
    return ''
  }

  const handleCancel = () => {
    router.push('/')
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
              Sign up to tasker
            </h2>
          </div>

          {/* Body */}
          <div className='bg-gray-100 mt-10 px-6 py-8 w-full sm:rounded-md sm:max-w-sm '>
            <form className='space-y-6' onSubmit={(handleSubmit(handleSignUp))}>

                {
                  validationError &&
                  <div className='flex flex-row items-center rounded-md pl-3 py-3 bg-red-500 text-white font-normal'>
                    <XCircleIcon className='w-5 h-5'/>
                    <span className='ml-2'>{validationError}</span>
                  </div>
                }
                
                {/* Login Input */}
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-900 leading-6'>Email</label>
                  <input
                    {...register('email')}
                    id='email'
                    type='email'
                    placeholder='Digite seu email'
                    className={`block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5 ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-400
                      ${getEmailClassOnError()}`}
                    required
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
                    className={`block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5 ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-400
                    ${getPasswordClassOnError()}`}
                    required
                  />
                </div>

                {/* Password Repeat Input */}
                <div>
                  <label htmlFor='password-repeat' className='block text-sm font-medium text-gray-900 leading-6'>Repita a senha</label>
                  <input
                    {...register('password-repeat')}
                    id='password-repeat'
                    type='password'
                    placeholder='Digite sua senha novamente'
                    className={`block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5 ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-400
                    ${getPasswordClassOnError()}`}
                    required
                  />
                </div>

                <div className='pt-4'>
                  <button className='block w-full rounded-md leading-6 font-semibold p-2 bg-indigo-600 hover:bg-indigo-500'>
                    <span className='text-gray-50'>Cadastrar</span>
                  </button>
                </div>

                <div>
                  <button className='block w-full rounded-md leading-6 font-semibold p-2 bg-gray-50  hover:bg-gray-100
                    ring-1 ring-inset ring-gray-300 hover:ring-2'
                    onClick={() => handleCancel()}
                  >
                    <span className='text-gray-900'>Voltar</span>
                  </button>
                </div>
            </form>
          </div>
        </main>
      }
    </>
  )
}