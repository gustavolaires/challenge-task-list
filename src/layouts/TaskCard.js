import { useState, useContext } from "react"
import { ref, update } from "firebase/database";
import moment from "moment/moment"

import { DatabaseContext } from '@/contexts/DatabaseContext'
import TaskFormModal from '@/layouts/TaskFormModal'

import { 
  EllipsisVerticalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"

export default function TaskCard({
  id = '',
  title = 'Card Title',
  description = 'Card description',
  priority = '0',
  done = false,
  createdBy = null,
  createdAt = 0,
  responsible = null,
  priorities = [],
  user = user,
}) {
  const { database } = useContext(DatabaseContext)

  const [ expanded, setExpanded ] = useState(false)
  const [ showMenu, setShowMenu ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)

  const handleUpdateTask = (formData, uid) => {
    requestUpdateToDatabase(uid, {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      responsible: formData.responsible,
      done: done,
      createdBy: createdBy,
      timestamp: createdAt,
    })
  }

  const handleUpdateDone = (uid) => {
    requestUpdateToDatabase(uid, {
      title: title,
      description: description,
      priority: priority,
      done: !done,
      timestamp: createdAt,
      responsible: responsible,
      createdBy: createdBy,
    })

    setShowMenu(!showMenu)
  }

  const handleDeleteTask = (uid) => {
    requestUpdateToDatabase(uid, null)
  }

  const requestUpdateToDatabase = (uid, taskData) => {
    const updates = {}
    updates['/tasks/' + uid] = taskData

    // Update data with ID to database
    update(ref(database), updates)
  }

  const showUpdateTaskBtn = () => {
    if(responsible) {
      return [responsible.uid, createdBy.uid].includes(user.uid)
    } 
    
    return true
  }

  const getTaskTitleColor = (done) => {
    if (done) return 'bg-green-900'
    return 'bg-gray-800'
  }

  const getPriorityColor = (priority) => {
    const selectedPriority = priorities.find(e => e.value === priority)
    const borderColor = selectedPriority ? selectedPriority.borderColor : 'border-white'

    return borderColor
  }

  const getPriorityTagColors = (priority) => {
    const selectedPriority = priorities.find(e => e.value === priority)
    const tagColors = selectedPriority ? 
      [selectedPriority.bgColor, selectedPriority.textColor].join(' ') :
      'bg-white text-gray-900'

    return tagColors
  }

  const getPrioritLabel = (priority) => {
    const selectedPriority = priorities.find(e => e.value === priority)

    return selectedPriority.label || ''
  }

  const getDate = (timestamp) => {
    const date = moment(timestamp)
    return date.format('DD/MM/YYYY')
  }

  const getTime = (timestamp) => {
    const date = moment(timestamp)
    return date.format('HH:mm')
  }

  return (
    <div className='pb-2 w-full'>
      {/* Card Header */}
      <div className={`flex justify-between flex-nowrap border-l-8 px-4 py-2 text-gray-100 w-full 
        ${getTaskTitleColor(done)} ${getPriorityColor(priority)}`}
      >

        <div className='flex flex-row flex-nowrap w-5/6 sm:w-full' onClick={() => {setExpanded(!expanded)}}>
          { done &&
            <div className='flex items-center text-green-200 sm:mr-2'>
              <CheckCircleIcon className='h-6 w-6'/> 
            </div>
          }

          <button className='rounded-md p-1 text-gray-100 hover:bg-gray-700 hover:text-white' onClick={() => {setExpanded(!expanded)}}>
            { 
              !expanded ? (<ChevronDownIcon className='h-6 w-6'/>) : (<ChevronUpIcon className='h-6 w-6'/>)
            }
          </button>
          
          <span className='flex items-center whitespace-nowrap sm:mx-4 truncate text-base'>{title}</span>
        </div>


        <div className='relative'>
          <button onClick={() => {setShowMenu(!showMenu)}} onBlur={e => {
            if(e.relatedTarget?.ariaLevel !== `task-menu-${id}`) {
              setShowMenu(false)
            }
          }}
            className='p-1 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'
          >
            <EllipsisVerticalIcon className='h-6 w-6'/>
          </button>

          { /* Task Menu */
            showMenu && 
              <div className='absolute right-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
                {/*  Btn Done/Undone */}
                <button onClick={() => handleUpdateDone(id)}
                  className='block px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
                  aria-level={`task-menu-${id}`}
                >
                  {
                    done ? (
                      <>
                        <XCircleIcon className='inline-block h-6 w-6'/>
                        <span className='ml-2'>Reabrir tarefa</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className='inline-block h-6 w-6 text-lime-500'/>
                        <span className='ml-2'>Concluir tarefa</span>
                      </>
                    )
                  }
                </button>

                {
                  /* Btn Atualizar */
                  showUpdateTaskBtn() &&
                  <button 
                    className='block px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
                    onClick={() => {
                      setShowModal(!showModal)
                      setShowMenu(false)
                    }}
                    aria-level={`task-menu-${id}`}
                  >
                    <PencilSquareIcon className='inline-block h-6 w-6 text-orange-600'/>
                    <span className='ml-2'>Atualizar tarefa</span>
                  </button>
                }

                {
                  /* Btn Deletar */
                  !done &&
                  <button 
                    className='block px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
                    onClick={() => {
                      handleDeleteTask(id)
                      setShowMenu(false)
                    }}
                    aria-level={`task-menu-${id}`}
                  >
                    <TrashIcon className='inline-block h-6 w-6 text-red-600'/>
                    <span className='ml-2'>Deletar tarefa</span>
                  </button>
                }
              </div>
            } 
        </div>
      </div>

      { /* Card Body */
        expanded && 
        <div className='px-6 py-4 flex flex-col bg-zinc-300 space-y-2'>
          { /* Priority */ }
          <div className='flex border-gray-400 border-b-2 pb-2 flex-row justify-between'>
            <span className='break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Prioridade:</span>

            <span className={`break-words whitespace-nowrap rounded-full leading-6 px-4  w-max ${getPriorityTagColors(priority)}`}>
              {getPrioritLabel(priority)}
            </span>
          </div>

          { /* Responsible */ }
          <div className='flex flex-col border-gray-400 border-b-2 pb-2 sm:flex-row sm:justify-between'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Responsável:</span>

            <span className='block break-words overflow-hidden whitespace-nowrap leading-6 font-semibold max-w-full'>
              {responsible?.displayName}
            </span>
          </div>

          { /* Description */ }
          <div className='flex flex-col border-gray-400 border-b-2 pb-2'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-1'>Descrição:</span>

            <div className=' bg-white p-2 rounded-md'>
              <p className='block break-words overflow-x-hidden leading-6 font-medium text-base max-w-full max-h-32'>
                {description}
              </p>
            </div>
          </div>

          { /* CreatedBy */ }
          <div className='flex flex-col border-gray-400 border-b-2 pb-2 sm:flex-row sm:justify-between'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Criado por:</span>

            <span className='block break-words overflow-hidden whitespace-nowrap leading-6 font-medium text-sm max-w-full'>
              {createdBy?.displayName}
            </span>
          </div>

          { /* CreatedAt */ }
          <div className='flex flex-row justify-between border-gray-400 border-b-2 pb-2'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Criado em:</span>

            <div className='flex flex-row flex-nowrap'>
              <span className='block  leading-6 font-medium text-sm'>{getDate(createdAt)}</span>

              <span className='hidden sm:block leading-6 font-medium text-sm ml-2'>{getTime(createdAt)}</span>
            </div>
          </div>
        </div>
      }

      <TaskFormModal
        showModal={showModal}
        closeModalCallback={() => setShowModal(false)}
        actionModelCallback={handleUpdateTask}
        actionType='update'
        user={user}
        priorities={priorities}
        initialFormData={{
          id: id,
          title: title,
          description: description,
          priority: priority,
          responsible: responsible?.uid || '',
          createdBy: createdBy
        }}
      />
    </div>
  )
}