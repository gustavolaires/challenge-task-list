const Button = ({
  className = '',
  onClick = function callback(){},
  children
}) => {
  return (
    <div>
      <button
        className={
          'block w-full rounded-md leading-6 font-semibold p-2 bg-gray-100 hover:bg-gray-100 ' + className
        }
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Button