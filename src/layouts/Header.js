import { useState } from 'react'
import { EllipsisVerticalIcon, EyeIcon, EyeSlashIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid'

import TaskFormModal from '@/layouts/TaskFormModal'
import TaskFilters from '@/layouts/TaskFilters'

export default function Headers({
  children,
  user = null,
  priorities = [],
  actionModelCallback = () => {},
  priorityFilter = {},
  priorityFilterCallback = () => {},
  statuses = [],
  statusFilter = 'all',
  statusFilterCallback = () => {},
}) {
  const [ showFilters, setShowFilters ] = useState(false)
  const [ showListMenu, setListMenu ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)

  const filtersOnDisplay = () => {
    if (showFilters) {
      return 'bg-gray-100 hover:bg-gray-200 ring-1 ring-inset ring-gray-400'
    }

    return 'bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300'
  }

  return (
    <div className='px-4 sm:px-8 py-4 space-y-4 bg-white'>
      <header className='relative flex flex-col sm:flex-row justify-between items-center bg-white'>
        {/* Title */}
        <div className='text-2xl text-gray-900'>
          {children}
        </div>

        {/* Options btns */}
        <div className='hidden sm:block sm:flex flex-col sm:flex-row-reverse'>
          <button onClick={() => setShowModal(!showModal)}
            className='inline-flex justify-center rounded-md bg-white px-3 py-2 ml-4
              hover:bg-gray-50 sm:mt-0 ring-1 ring-inset ring-gray-300'
          >
            <PlusCircleIcon className='inline-block h-6 w-6 text-lime-700'/>
            <span className='font-normal text-gray-900 text-base ml-2'>Criar Tarefa</span>
          </button>

          <button onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex justify-center items-center rounded-md px-3 py-2 sm:mt-0
              ${filtersOnDisplay()} ring-1 ring-inset ring-gray-300`}
          >
            {
              !showFilters ? (
                <>
                  <EyeIcon className='inline-block h-6 w-6'/>
                  <span className='ml-2 font-normal text-gray-900 text-base'>Mostrar filtros</span>
                </>
              ) : (
                <>
                  <EyeSlashIcon className='inline-block h-6 w-6'/>
                  <span className='ml-2 font-normal text-gray-900 text-base'>Ocultar filtros</span>
                </>
              )
            }
          </button>
        </div>

        {/* Menu btn - Size sm */}
        <div className='block sm:hidden absolute right-0 top-0' 
          onClick={() => setListMenu(!showListMenu)}
        >
            <button className='p-1 rounded-md text-gray-900 hover:bg-gray-100'>
            <EllipsisVerticalIcon className='h-6 w-6'/>
          </button>
        </div>

        {/* Menu - Size sm */}
        { showListMenu && 
          <div className='block sm:hidden absolute right-0 top-10 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg 
            ring-1 ring-black ring-opacity-5'
          >
            {/* New task Btn */}
            <button 
              className='block flex items-center px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
              onClick={() => {
                setShowModal(!showModal)
                setListMenu(false)
              }}
            >
              <PlusCircleIcon className='inline-block h-6 w-6 text-lime-700'/>
              <span className='ml-2 font-normal text-gray-900 text-base'>Nova tarefa</span>
            </button>

            {/* Filter Btn */}
            <button className='block flex items-center px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
              onClick={() => {
                setShowFilters(!showFilters)
                setListMenu(false)
              }}
            >
              {
              !showFilters ? (
                <>
                  <EyeIcon className='inline-block h-6 w-6'/>
                  <span className='ml-2 font-normal text-gray-900 text-base'>Mostrar filtros</span>
                </>
              ) : (
                <>
                  <EyeSlashIcon className='inline-block h-6 w-6'/>
                  <span className='ml-2 font-normal text-gray-900 text-base'>Ocultar filtros</span>
                </>
              )
            }
            </button>
          </div>
        }
      </header>

      <TaskFormModal
        showModal={showModal}
        closeModalCallback={() => setShowModal(false)}
        actionModelCallback={actionModelCallback}
        user={user}
        priorities={priorities}
      />

      {
        showFilters &&
        <TaskFilters 
          priorities={priorities}
          priorityFilter={priorityFilter}
          priorityFilterCallback={priorityFilterCallback}
          statuses={statuses}
          statusFilter={statusFilter}
          statusFilterCallback={statusFilterCallback}
        />
      }
    </div>
  )
}