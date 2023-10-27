import { XMarkIcon } from '@heroicons/react/24/solid'

export default function AlertModal({
  children,
  title = 'Modal title',
  actionBtnName = 'Action',
  actionBtnClassName = '',
  showModal = true,
  actionModalCallback = () => {},
  closeModalCallback = () => {},
}) {
  return (
    <>
      { /* Modal */
        showModal && 
        <div className='relative z-10'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center py-4 text-center sm:p-0'>

              <div className='overflow-hidden  text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl sm:rounded-md'>
                <div className='bg-white text-left'>
                  {/* Modal Header */}
                  <div className='bg-gray-800 px-4 py-2 flex justify-between sm:pl-6 text-gray-100'>
                    <h3 className='flex items-center text-lg font-medium leading-6'>
                      {title}
                    </h3>
                    <button className='p-2 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'
                      onClick={() => closeModalCallback()}
                    >
                      <XMarkIcon className='h-6 w-6'/>
                    </button>
                  </div>

                    {/* Modal Body */}
                    <div className='bg-gray-50 p-4 pb-5'>
                      <div className='flex flex-col items-stretch'>
                        <div className='text-left mt-0'>
                          <div className='mt-2'>
                            <div className='space-y-6'>

                              {/* Message */}
                              <div>
                                {children}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Modal Footer */}
                  <div className='bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button  
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 shadow-sm sm:w-auto 
                      bg-indigo-600 hover:bg-indigo-500 sm:ml-3 ${actionBtnClassName}`}
                      onClick={() => {actionModalCallback()}}
                    >
                      <span className='text-base font-medium text-gray-50'>{actionBtnName}</span>
                    </button>

                    <button type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 sm:mt-0 shadow-sm sm:w-auto
                      bg-gray-50  hover:bg-gray-100 ring-1 ring-inset ring-gray-300'
                      onClick={() => closeModalCallback()}
                    >
                      <span className='text-base font-medium text-gray-900'>
                        Cancelar
                      </span>
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