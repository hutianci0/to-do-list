import { TodoListContext } from './toDolistContext'
import { useState } from 'react'
import { listType } from '@/types/sharedType'
// 创建wrapper
export const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<listType[] | []>(() =>
    localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : [],
  )

  const [activeId, setActiveId] = useState<number | null>(todoList.length ? todoList[0].id : null)

  const addProject = (projectName: string) => {
    const newProject = { id: Date.now(), title: projectName, item: [] }

    // 使用函数式更新
    setTodoList((prevTodoList) => {
      const updatedTodoList = [...prevTodoList, newProject]
      localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
      return updatedTodoList
    })

    setActiveId(newProject.id)
  }

  const delProject = (id: number) => {
    // 更新todoList
    setTodoList((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      const deletedIndex = prev.findIndex((item) => item.id === id)

      let newActiveId = activeId
      if (id === activeId) {
        if (updated.length === 0) {
          newActiveId = null
        } else if (deletedIndex > 0) {
          newActiveId = prev[deletedIndex - 1].id
        } else {
          newActiveId = updated[0].id
        }
      }
      localStorage.setItem('todoList', JSON.stringify(updated))
      setActiveId(newActiveId) // 同步更新 activeId
      return updated
    })
  }

  const addTask = (taskName: string, projectId: number) => {
    const changedList = todoList.map((project) =>
      projectId === project.id
        ? {
            ...project,
            item: [...project.item, { id: Date.now(), text: taskName, completed: false }],
          }
        : project,
    )

    setTodoList(changedList)
    localStorage.setItem('todoList', JSON.stringify(changedList))
  }

  const delTask = (taskId: number, projectId: number) => {
    const changedList = todoList.map((project) =>
      projectId === project.id
        ? { ...project, item: project.item.filter((item) => item.id !== taskId) }
        : project,
    )

    setTodoList(changedList)
    localStorage.setItem('todoList', JSON.stringify(changedList))
  }

  const toggleComplete = (taskId: number, projectId: number) => {
    const changedList = todoList.map((project) =>
      projectId === project.id
        ? {
            ...project,
            item: project.item.map((item) =>
              taskId === item.id ? { ...item, completed: !item.completed } : item,
            ),
          }
        : project,
    )
    setTodoList(changedList)
    localStorage.setItem('todoList', JSON.stringify(changedList))
  }

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    setTodoList((prevList) => {
      const updatedList = [...prevList]
      if (dragIndex === -1 || hoverIndex === -1 || dragIndex === hoverIndex) {
        return updatedList
      }
      const draggedItem = updatedList[dragIndex]
      updatedList.splice(dragIndex, 1)
      updatedList.splice(hoverIndex, 0, draggedItem)

      localStorage.setItem('todoList', JSON.stringify(updatedList))
      return updatedList
    })
  }

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addProject,
        activeId,
        setActiveId,
        delProject,
        addTask,
        delTask,
        toggleComplete,
        handleMove,
      }}
    >
      {children}
    </TodoListContext.Provider>
  )
}
