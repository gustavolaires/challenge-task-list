import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'


export default function Modal({
  children,
  showBtnValue = 'Show Model',
  showBtnClassName = '',
  showBtnValueClassName = '',
  title = 'model title',
  actionBtnValue = 'Action',
  actionBtnClassName = '',
  actionBtnValueClassName = '',
  cancelBtnValue = 'Cancel',
  cancelBtnClassName = '',
  cancelBtnValueClassName = ''
}) {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
    setShowModal(!showModal)
  }

  return(
    <>
      <button onClick={handleCloseModal}
        className={`inline-flex justify-center rounded-md bg-white px-3 py-2 hover:bg-gray-50 sm:mt-0 ${showBtnClassName}`}
      >
        <span className={`font-normal text-gray-900 text-lg ${showBtnValueClassName}`}>{showBtnValue}</span>
      </button>
      
      {
        showModal && 
        <div className='relative z-10'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center py-4 text-center sm:p-0'>

              <div className='overflow-hidden  text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl sm:rounded-md'>
                <div className='bg-white text-left'>
                  {/* Header */}
                  <div className='bg-gray-800 px-4 py-2 flex justify-between sm:pl-6 text-gray-100'>
                    <h3 className='flex items-center text-lg font-medium leading-6'>{title}</h3>
                    <button className='p-2 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'
                      onClick={handleCloseModal}
                    >
                      <XMarkIcon className='h-6 w-6'/>
                    </button>
                  </div>

                  {/* Body */}
                  <div className='bg-gray-50 p-4 pb-5'>
                    <div className='flex flex-col items-stretch'>
                      <div className='text-left ml-4 mt-0'>
                        <div className='mt-2'>
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button type='button' 
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 shadow-sm sm:w-auto 
                        bg-indigo-600 hover:bg-indigo-500 sm:ml-3 ${actionBtnClassName}`
                      }
                    >
                      <span className={`text-base font-medium text-gray-50 ${actionBtnValueClassName}`}>{actionBtnValue}</span>
                    </button>

                    <button type='button'
                      onClick={handleCloseModal}
                      className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 
                        bg-gray-50  hover:bg-gray-50 sm:mt-0 sm:w-auto ${cancelBtnClassName}`
                      }
                    >
                      <span className={`text-base font-medium text-gray-900 ${cancelBtnValueClassName}`}>{cancelBtnValue}</span>
                    </button>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}