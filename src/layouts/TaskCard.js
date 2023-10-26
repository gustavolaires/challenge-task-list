import { useState } from "react"
import moment from "moment/moment"

import { EllipsisVerticalIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

export default function TaskCard({
  title = 'Card Title',
  description = 'Card description',
  priority = '0',
  done = false,
  createdBy = null,
  createdAt = 0,
  responsible = null,
  priorities = [],
}) {
  const [ expanded, setExpanded ] = useState(false)

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
      {/* Header */}
      <div className={`flex justify-between flex-nowrap bg-gray-800 border-l-8 px-4 py-2 text-gray-100 w-full ${getPriorityColor(priority)}`}>

        <div className='flex flex-row flex-nowrap w-5/6 sm:w-full'>
          { done &&
            <div className='flex items-center text-green-200'>
              <CheckCircleIcon className='h-6 w-6'/> 
            </div>
          }

          <button onClick={() => {setExpanded(!expanded)}} className='rounded-md p-1 text-gray-100 hover:bg-gray-700 hover:text-white'>
            { 
              !expanded ? (<ChevronDownIcon className='h-6 w-6'/>) : (<ChevronUpIcon className='h-6 w-6'/>)
            }
          </button>
          
          <span className='flex items-center whitespace-nowrap sm:mx-4 truncate text-base'>{title}</span>
        </div>


        <button className='p-1 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'>
          <EllipsisVerticalIcon className='h-6 w-6'/>
        </button>
      </div>

      {/* Description */}
      {
        expanded && 
        <div className='px-6 py-4 flex flex-col bg-zinc-300 space-y-2'>
          { /* Priority */ }
          <div className='flex border-gray-400 border-b-2 pb-2 flex-row justify-between'>
            <span className='break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Prioridade:</span>

            <span className={`break-words whitespace-nowrap rounded-full px-4 leading-6 w-max ${getPriorityTagColors(priority)}`}>
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
              <p className='block break-words overflow-x-hidden leading-6 font-medium max-w-full max-h-32'>
                {description}
              </p>
            </div>
          </div>

          { /* CreatedBy */ }
          <div className='flex flex-col border-gray-400 border-b-2 pb-2 sm:flex-row sm:justify-between'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Criado por:</span>

            <span className='block break-words overflow-hidden whitespace-nowrap leading-6 font-medium max-w-full'>
              {createdBy?.displayName}
            </span>
          </div>

          { /* CreatedAt */ }
          <div className='flex flex-row justify-between border-gray-400 border-b-2 pb-2'>
            <span className='block break-words text-sm font-medium text-gray-900 leading-6 pb-0.5'>Criado em:</span>

            <div className='flex flex-row flex-nowrap'>
              <span className='block  leading-6 font-medium'>{getDate(createdAt)}</span>

              <span className='hidden sm:block leading-6 font-medium ml-2'>{getTime(createdAt)}</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}