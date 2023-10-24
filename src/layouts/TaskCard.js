import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"

export default function TaskCard({
  title='Card Title',
  description='Card description'
}) {
  return (
    <div className='pr-4 pb-4'>
      <div className='rounded-md bg-white w-60 sm:w-fit'>
        {/* Header */}
        <div className='bg-gray-800 px-4 py-2 flex justify-between flex-nowrap text-gray-100 rounded-t-md max-w-sm sm:max-w-md'>
          <span className='flex items-center whitespace-nowrap mr-4 truncate'>{title}</span>
          <button className='p-1 rounded-md text-gray-100 hover:bg-gray-700 hover:text-white'>
            <EllipsisVerticalIcon className='h-6 w-6'/>
          </button>
        </div>
        <div className='px-4 py-4 flex justify-between rounded-b-md max-w-sm sm:max-w-md'>
          <span className='break-words overflow-hidden leading-tight h-14 w-max'>{description}</span>
        </div>
      </div>
    </div>
  )
}