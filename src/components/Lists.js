import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import List from './List'

const Lists = React.memo(({ handleClick, todoData, setTodoData }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newTodoData = [...todoData]
    const [reorderedItem] = newTodoData.splice(result.source.index, 1)

    newTodoData.splice(result.destination.index, 0, reorderedItem)
    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      data={data}
                      provided={provided}
                      snapshot={snapshot}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
})

export default Lists
