import React from "react"

const InputField = React.forwardRef(({
  label = 'Input Field Label',
  type = 'text',
  placeholder = '',
  name = '',
  id = '',
}, ref) => {
 return (
  <div>
    <label className='block text-sm font-medium text-gray-900 leading-6'>{label}</label>
    <input
        className='block w-full text-gray-900 leading-6 rounded-md p-2 mt-0.5
        placeholder:text-gray-400
        ring-1 ring-inset ring-gray-300
        focus:ring-2 focus:ring-inset focus:ring-indigo-400'

        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        ref={ref}
    />
  </div>
 )
})

export default InputField