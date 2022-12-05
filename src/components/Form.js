import React from 'react'

const Form = ({ handleSubmit, value, setValue }) => {
  console.log('Form rendering')
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <form className="flex p-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-5/6 py-2 px-3 border rounded rounded-r-none outline-none focus:border-green-600"
        name="value"
        value={value}
        onChange={handleChange}
        placeholder="해야 할 일을 입력해주세요."
      />
      <input
        type="submit"
        className="w-1/5 py-2 px-3 border rounded rounded-l-none border-l-0 hover:shadow-inner transition-all font-medium text-gray-400 hover:text-green-600 hover:border-green-600 hover:border-l"
        value="입력"
      />
    </form>
  )
}

export default Form
