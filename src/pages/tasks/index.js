import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AuthContext } from '@/contexts/AuthContext'

export default function TaskList() {
  const [ showProfileMenu, setShowProfileMenu ] = useState(false)
  const { auth } = useContext(AuthContext);
  const [ user ] = useAuthState(auth)
  const router = useRouter()

  console.log(user)
  
  useEffect(() => {
    if (!user) router.push('/')
  }, [user])

  const handleClickProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }
  
  return (
    <div className='min-h-screen'>
      <nav className='bg-gray-800'>
        {/* Profile Menu Dropdown */}
        <div className='hidden sm:block p-4'>
          <div className='flex justify-end'>
            <div className='relative rounded-full bg-gray-100 p-2'>
              <button onClick={() => handleClickProfileMenu()}>
                <span className='block align-middle h-6 w-6'>P</span>
              </button>

              { showProfileMenu && 
                <div className='absolute right-0 z-10 mt-4 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
                  <button 
                    className='block px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
                    onClick={() => auth.signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              } 
            </div>
          </div>
        </div>

        {/* Mobile Profile Menu Dropdown */}
        <div className='sm:hidden'>
          <div className='flex justify-end p-4'>
            <div className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-100 
              hover:bg-gray-700 hover:text-white 
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            >
              <button onClick={() => handleClickProfileMenu()}>
                { 
                  showProfileMenu ?
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg> :
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                  </svg>
                }
              </button>
            </div>
          </div>

          {
            showProfileMenu && <div className='h-0.5 bg-gray-600'/>
          }
          { 
            showProfileMenu &&
            <div className='pb-3 pt-4'>
              <div className="flex items-center px-5">
                <div className='rounded-full bg-gray-100 p-2'>
                  <span className='block align-middle h-6 w-6 pl-2'>P</span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button 
                  className='block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </button>
              </div>
            </div>
          }
        </div>
      </nav>

      <header className='bg-white'>
        <div className='px-8 py-4 text-2xl text-neutral-950'>
          Tarefas
        </div>
      </header>

      <main className='h-screen bg-gray-100 text-neutral-950 px-8 py-4'>
        Main Content
      </main>
    </div>
  )
}