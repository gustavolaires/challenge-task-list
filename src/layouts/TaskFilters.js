import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

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
    <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 items-stretch'>
      {/* Situação */}
      <div>
        <select id='situation' defaultValue={statusFilter} onChange={e => statusFilterCallback(e.target.value)}
          className='block py-2 px-3 w-full h-full rounded-md leading-6 font-medium bg-white ring-1 ring-inset ring-gray-300'
        >
          {
            statuses.map((element) => {
              return (
                <option key={element.value} className='font-normal text-base' value={element.value}>{element.label}</option>
              )
            })
          }
        </select>
      </div>

      {/* Prioridade */}
      <div className='relative inline-block text-left'>
        {/* Btn */}
          <button onClick={() => setShowSituationFilter(!showSituationFilter)} 
            className='flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          >
            <span>Prioridade</span>
            {
              showSituationFilter ? (
                <ChevronUpIcon className='inline-block h-6 w-6'/>
                ) : (
                <ChevronDownIcon className='inline-block h-6 w-6'/>
              )
            }
          </button>

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
                    <div key={`div-priority-${index}`} className='flex flex-row flex-start items-center p-2 w-full hover:bg-slate-200'>
                      <label>
                        <input 
                          type='checkbox'
                          key={`priority${index}`}
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
                  <button className='p-2 w-full hover:bg-slate-200' onClick={() => resetAllPriorityCheckboxes(false)}>
                    Desmarcar todas
                  </button>
                  ) : (
                  <button className='p-2 w-full hover:bg-slate-200' onClick={() => resetAllPriorityCheckboxes(true)}>
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
  )
}