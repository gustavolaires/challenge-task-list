import { useState } from 'react'
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

export default function NavBar({
  user = {
    name: 'John Doe',
    email: 'john_doe@email.com',
    photoURL: null
  },
  signOutCallback = () => {}
}) {
  const [ showProfileMenu, setShowProfileMenu ] = useState(false)
  const firstLetterCapitalized = user?.name?.charAt(0).toUpperCase() || "X"

  const handleClickProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  return (
    <nav className='bg-gray-800'>
      {/* Profile Menu Dropdown */}
      <div className='hidden sm:block p-4'>
        <div className='flex justify-end'>
          <div className='relative rounded-full bg-gray-100'>
            {/* Button */}
            <button 
              onClick={() => handleClickProfileMenu()}
              onBlur={e => {
                if(e.relatedTarget?.ariaLevel !== `login-btn`) setShowProfileMenu(false)
              }}
            >
              <span className='flex justify-center items-center font-semibold text-xl w-6 h-6 m-2'>{firstLetterCapitalized}</span>
            </button>

            {/* Menu */}
            { showProfileMenu && 
              <div className='absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
                <button 
                  className='block px-4 py-2 w-full text-sm text-left text-gray-700 bg-white hover:bg-slate-200'
                  onClick={signOutCallback}
                  aria-level={`login-btn`}
                >
                  <ArrowRightOnRectangleIcon className='inline-block h-6 w-6'/>
                  <span className='ml-2'>Sign Out</span>
                </button>
              </div>
            } 
          </div>
        </div>
      </div>

      {/* Mobile Profile Menu Dropdown */}
      <div className='sm:hidden'>
        <div className='flex justify-end px-2 py-4'>
          {/* Button */}
          <div className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-100 
            hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          >
            <button onClick={() => handleClickProfileMenu()}>
              { 
                showProfileMenu ? <XMarkIcon className='h-6 w-6'/> : <Bars3Icon className='h-6 w-6'/>
              }
            </button>
          </div>
        </div>

        {/* Menu */}
        { 
          showProfileMenu &&
          <div className='border-t-2 border-solid border-gray-600 pb-3 pt-4'>
            <div className='flex items-center px-5'>
              <div className='rounded-full bg-gray-100'>
                <span className='block flex justify-center items-center font-semibold text-xl h-6 w-6 m-1'>{firstLetterCapitalized}</span>
              </div>
              <div className='ml-3'>
                <div className='text-base font-medium leading-none text-white'>{user.name}</div>
                <div className='text-sm font-medium leading-none text-gray-400'>{user.email}</div>
              </div>
            </div>
            <div className='mt-3 space-y-1 px-2'>
              <button 
                className='block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                onClick={signOutCallback}
              >
                <ArrowRightOnRectangleIcon className='inline-block h-6 w-6'/>
                <span className='ml-2'>Sign Out</span>
              </button>
            </div>
          </div>
        }
      </div>
    </nav>
  )
}