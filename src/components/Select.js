export default function Select({
  label='Select label',
  name ='',
  id ='',
  className = '',
  values = []
}) {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-900 leading-6'>{label}</label>
      <select
        id={id}
        name={name}
        className={`block w-full rounded-md leading-6 font-normal p-2 bg-white ring-1 ring-inset ring-gray-300 ${className}`}
      >
        {
          values.map((value) => {
            return (
              <option className='font-normal' value={value}>{value}</option>
            )
          })
        }
      </select>
    </div>
  )
}