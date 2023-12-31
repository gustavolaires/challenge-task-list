import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { XMarkIcon } from '@heroicons/react/24/solid'

import { Priorities } from '@/utils/generics';

export default function TaskFormModal({
  showModal = false,
  closeModalCallback = () => {},
  actionModelCallback = () => {},
  actionType = 'create',
  users = [],
  initialFormData = {},
}) {
  const { register, handleSubmit, reset } = useForm({defaultValues: initialFormData});

  const handleActionModalTask = (data, e) => {
    e.preventDefault

    const responsible = data.responsible === '' ? 
      null : 
      users.find(e => e.uid === data.responsible)

    actionModelCallback({
      ...data,
      responsible: responsible,
    }, initialFormData.id)
    
    if(actionType === 'create') { reset() }
    closeModalCallback()
  }
  
  return(
    <>
      { /* Modal */
        showModal && 
        <div className='relative z-10'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center py-4 text-center sm:p-0'>

              <div className='overflow-hidden  text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl sm:rounded-md'>
                <div className='bg-white text-left'>
                  <form onSubmit={handleSubmit(handleActionModalTask)}>
                    
                    {/* Header */}
                    <div className='bg-gray-800 px-4 py-2 flex justify-between sm:pl-6 text-gray-100'>
                      <h3 className='flex items-center text-lg font-medium leading-6'>
                        {
                          actionType == 'create' ? 'Nova tarefa' : 'Atualizar tarefa'
                        }
                      </h3>
                      <button className='p-2 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'
                        onClick={() => closeModalCallback()}
                      >
                        <XMarkIcon className='h-6 w-6'/>
                      </button>
                    </div>

                    {/* Body */}
                    <div className='bg-gray-50 p-4 pb-5'>
                      <div className='flex flex-col items-stretch'>
                        <div className='text-left mt-0'>
                          <div className='mt-2'>
                            <div className='space-y-6'>

                              {/* Field Title */}
                              <div>
                                <label htmlFor='title' className='block text-sm font-medium text-gray-900 leading-6'>
                                  Título <span className='text-red-600'>*</span>
                                </label>
                                <input {...register('title', { required: true })}
                                    id='title'  
                                    className='block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5
                                    placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-300
                                    focus:ring-2 focus:ring-inset focus:ring-indigo-400'
                                    placeholder='Título da tarefa'
                                    required
                                />
                              </div>

                              {/* Field Description */}
                              <div>
                                <label htmlFor='description' className='block text-sm font-medium text-gray-900 leading-6'>
                                  Descrição
                                </label>
                                <textarea {...register('description')}
                                    id='description'
                                    className='block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5
                                    placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-300
                                    focus:ring-2 focus:ring-inset focus:ring-indigo-400'
                                    placeholder='Descrição da tarefa'
                                />
                              </div>

                              {/* Field Priority */}
                              <div>
                                <label htmlFor='priority' className='block text-sm font-medium text-gray-900 leading-6'>
                                  Prioridade <span className='text-red-600'>*</span>
                                </label>
                                <select {...register('priority')}
                                  id='priority'
                                  className='block w-full rounded-md leading-6 font-normal p-2 bg-white ring-1 ring-inset ring-gray-300'
                                  defaultValue={0}
                                >
                                  {
                                    Priorities.map((priority, index) => {
                                      return (
                                        <option key={index}
                                          className='font-normal'
                                          value={priority.value}
                                        >
                                          {priority.label}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                              </div>

                              {/* Field Responsible */}
                              <div>
                                <label htmlFor='responsible' className='block text-sm font-medium text-gray-900 leading-6'>
                                  Responsável
                                </label>
                                <select {...register('responsible')}
                                  id='responsible'
                                  className='block w-full leading-6 font-normal p-2 bg-white ring-1 ring-inset ring-gray-300'
                                  defaultValue=''
                                >
                                  <option key={0} value='' className=''></option>

                                  {
                                    users.map((user, index) => {
                                      return (
                                        <option key={index + 1}
                                          className='font-normal text-sm'
                                          value={user.uid}
                                        >
                                          {`${user?.displayName} (${user?.email})`}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className='bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button type='submit'
                        className='inline-flex w-full justify-center rounded-md px-3 py-2 shadow-sm sm:w-auto 
                        bg-indigo-600 hover:bg-indigo-500 sm:ml-3'
                      >
                        <span className='text-base font-medium text-gray-50'>
                          {
                            actionType == 'create' ? 'Criar tarefa' : 'Atualizar tarefa'
                          }
                        </span>
                      </button>

                      <button type='button' onClick={() => closeModalCallback()} 
                        className='mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 sm:mt-0 shadow-sm sm:w-auto
                        bg-gray-50  hover:bg-gray-100 ring-1 ring-inset ring-gray-300'
                      >
                        <span className='text-base font-medium text-gray-900'>
                          Cancelar
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}