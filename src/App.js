import React, { useState, useCallback } from 'react'
import './App.css'
import Lists from './components/Lists'
import Form from './components/Form'

const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : []

const App = () => {
  const [todoData, setTodoData] = useState(initialTodoData)
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    setTodoData((prev) => [...prev, newTodo])
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]))
    setValue('')
  }

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id)

      setTodoData(newTodoData)
      localStorage.setItem('todoData', JSON.stringify(newTodoData))
    },
    [todoData],
  )

  const handleAllDeleteClick = () => {
    setTodoData([])
    localStorage.setItem('todoData', JSON.stringify([]))
  }

  return (
    <div className="flex justify-center items-center bg-green-100 w-screen h-screen p-5">
      <div className="w-full bg-white rounded-lg shadow-xl shadow-green-200 py-4 px-5 lg:max-w-xl">
        <div className="flex justify-between items-center border-b border-green-200 pb-4 mb-4">
          <h1 className="text-2xl text-green-600 font-bold">할 일 목록</h1>

          <button onClick={handleAllDeleteClick}>All Delete</button>
        </div>

        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  )
}

export default App
