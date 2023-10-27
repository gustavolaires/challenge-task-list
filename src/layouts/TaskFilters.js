import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

export default function TaskFilters({
  priorities = [],
  priorityFilter = {},
  priorityFilterCallback = () => {},
  statuses = [],
  statusFilter = 'all',
  statusFilterCallback = () => {}
}) {
  const [ showSituationFilter, setShowSituationFilter ] = useState(false)

  const togglePriorityCheckbox = (key) => {
    const newState = {}
    newState[key] = !priorityFilter[key]

    priorityFilterCallback(prevState => ( {...prevState, ...newState} ))
  }

  const resetAllPriorityCheckboxes = (value) => {
    const newState = priorities.reduce((acc, element) => {
      acc[element.value] = value

      return acc
    }, {})

    priorityFilterCallback(prevState => ( {...prevState, ...newState} ))
  }

  const isAllPriorityCheckboxesChecked = (selection) => {
    const result = Object.values(selection).every((element) => element === true)

    return result
  }

  return (
    <div className='border-y-2 pb-4 pt-3 mt-2 space-y-4 sm:space-y-2'>
      <div className='text-lg text-gray-900'>Filtros</div>
      <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 items-stretch'>
        {/* Situação */}
        <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2'>
          <label htmlFor='task-filters-situation' className='block text-sm font-medium text-gray-900 leading-6'>
            Situação:
          </label>
          <select id='task-filters-situation' name='task-filters-situation'
            className='block py-2 px-3 mt-0.5 w-full h-[40px] rounded-md leading-6 font-medium bg-white ring-1 ring-inset ring-gray-300'
            defaultValue={statusFilter}
            onChange={e => statusFilterCallback(e.target.value)}
          >
            {
              statuses.map((element) => {
                return (
                  <option key={element.value}
                    className='font-normal text-base'
                    value={element.value}
                  >
                    {element.label}
                  </option>
                )
              })
            }
          </select>
        </div>

        {/* Prioridade */}
        <div className='relative block sm:inline-block text-left'>
          {/* Btn */}
          <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2'>
            <label htmlFor='task-filters-priority' className='block text-sm font-medium text-gray-900 leading-6'>
              Prioridade:
            </label>
            <button id='task-filters-priority' name='task-filters-priority'
              className='flex w-full justify-between items-center rounded-md bg-white pl-3 py-2 mt-0.5 text-gray-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              onClick={() => setShowSituationFilter(!showSituationFilter)} 
            >
              <span className='sm:pr-14'>Prioridade</span>
              {
                showSituationFilter ? (
                  <ChevronUpIcon className='inline-block text-black h-[1.15rem] w-[1.15rem]'/>
                  ) : (
                  <ChevronDownIcon className='inline-block text-black h-[1.15rem] w-[1.15rem]'/>
                )
              }
            </button>
          </div>

          {/* Menu */}
          {
            showSituationFilter &&
            <div className='absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg 
              ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <div className='py-2'>
                {
                  priorities.map((priority, index) => {
                    return (
                      <div key={`div-priority-${index}`}
                        className='flex flex-row flex-start items-center p-2 w-full hover:bg-slate-200'
                      >
                        <label htmlFor={`priority${index}`} >
                          <input key={`priority${index}`}
                            type='checkbox'
                            id={`priority${index}`}
                            name={`priority${index}`} 
                            className='scale-150 ml-4'
                            checked={priorityFilter[priority.value]}
                            onChange={() => togglePriorityCheckbox(priority.value)}
                          />
                          <span className='ml-2'>{priority.label}</span>
                        </label>
                      </div>
                    )
                  })
                }

                <div className='flex justify-center border-t-2'>
                  {
                    isAllPriorityCheckboxesChecked(priorityFilter) ? (
                    <button className='p-2 w-full hover:bg-slate-200'
                      onClick={() => resetAllPriorityCheckboxes(false)}
                    >
                      Desmarcar todas
                    </button>
                    ) : (
                    <button className='p-2 w-full hover:bg-slate-200'
                      onClick={() => resetAllPriorityCheckboxes(true)}
                    >
                      Marcar todas
                    </button>
                    )
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}