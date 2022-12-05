import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { GiConfirmed } from 'react-icons/gi'

const List = ({
  data,
  provided,
  snapshot,
  todoData,
  setTodoData,
  handleClick,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(data.title)

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) data.completed = !data.completed
      return data
    })

    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    let newTodoData = todoData.map((item) => {
      if (item.id === data.id) {
        item.title = editedTitle
      }
      return item
    })

    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div
        className={`${
          snapshot.isDragging ? 'bg-green-100 border-b-0' : 'bg-white'
        } px-4 py-5 border-b flex items-center relative last:border-b-0`}
        key={data.id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
      >
        <input
          className="mr-4"
          type="checkbox"
          defaultChecked={data.completed}
          onChange={() => handleCompleteChange(data.id)}
        />
        <span className={data.completed ? 'line-through' : undefined}>
          {data.title}
        </span>

        <button
          className="absolute right-10 bottom-1/2 translate-y-1/2 w-6 h-6 rouded text-green-600 text-lg"
          onClick={() => setIsEditing(true)}
        >
          <BiEdit />
        </button>
        <button
          className="absolute right-0 bottom-1/2 translate-y-1/2 w-6 h-6 rounded-full flex justify-center items-center text-green-600 text-xl font-bold pb-1"
          onClick={() => handleClick(data.id)}
        >
          &times;
        </button>
      </div>
    )
  } else {
    return (
      <div
        className={`${
          snapshot.isDragging ? 'bg-green-100 border-b-0' : 'bg-white'
        } px-4 py-5 border-b flex items-center relative last:border-b-0`}
        key={data.id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
      >
        <form onSubmit={handleEditSubmit}>
          <input
            className="mr-4 border rounded py-2 px-3"
            type="text"
            value={editedTitle}
            onChange={handleEditChange}
            autoFocus
          />
        </form>
        <button
          className="absolute right-10 bottom-1/2 translate-y-1/2 w-6 h-6 rouded text-green-600 text-lg"
          onClick={handleEditSubmit}
        >
          <GiConfirmed />
        </button>
        <button
          className="absolute right-0 bottom-1/2 translate-y-1/2 w-6 h-6 rounded-full flex justify-center items-center text-green-600 text-xl font-bold pb-1"
          onClick={() => handleClick(data.id)}
        >
          &times;
        </button>
      </div>
    )
  }
}

export default List
