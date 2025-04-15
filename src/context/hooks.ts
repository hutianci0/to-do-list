import { TodoListContext } from './toDolistContext'
import { useContext } from 'react'
import { listType } from '@/types/sharedType'
import { useState } from 'react'
// 安全获取并消费context
export default function useTodoList() {
  const context = useContext(TodoListContext)

  if (context === undefined) {
    throw new Error('useTodoList must be used within a TodoListProvider')
  }

  return context
}

// 返回对象, 用于provider的value
export const useTodoListMethods = () => {
  // todoList
  const [todoList, setTodoList] = useState<listType[]>(() =>
    localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : [],
  )

  // atciveId
  const [activeId, setActiveId] = useState<string>(todoList.length ? todoList[0].id : '-1')

  // searchQuery
  const [searchQuery, setSearchQuery] = useState<string>('')

  const addProject = (projectName: string) => {
    const newProject = { id: crypto.randomUUID(), title: projectName, item: [] }

    // 使用函数式更新
    setTodoList((prevTodoList) => {
      const updatedTodoList = [...prevTodoList, newProject]
      localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
      return updatedTodoList
    })

    setActiveId(newProject.id)
  }

  const delProject = (id: string) => {
    // 更新todoList
    setTodoList((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      const deletedIndex = prev.findIndex((item) => item.id === id)

      let newActiveId = activeId
      if (id === activeId) {
        if (updated.length === 0) {
          newActiveId = '-1'
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

  const addTask = (taskName: string, projectId: string) => {
    const changedList = todoList.map((project) =>
      projectId === project.id
        ? {
            ...project,
            item: [...project.item, { id: crypto.randomUUID(), text: taskName, completed: false }],
          }
        : project,
    )

    setTodoList(changedList)
    localStorage.setItem('todoList', JSON.stringify(changedList))
  }

  const delTask = (taskId: string, projectId: string) => {
    const changedList = todoList.map((project) =>
      projectId === project.id
        ? { ...project, item: project.item.filter((item) => item.id !== taskId) }
        : project,
    )

    setTodoList(changedList)
    localStorage.setItem('todoList', JSON.stringify(changedList))
  }

  const toggleComplete = (taskId: string, projectId: string) => {
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
    if (dragIndex === hoverIndex || dragIndex < 0 || hoverIndex < 0) return

    setTodoList((prevList) => {
      const updatedList = [...prevList]
      // if (dragIndex === -1 || hoverIndex === -1 || dragIndex === hoverIndex) {
      //   return updatedList
      // }
      const draggedItem = updatedList[dragIndex]
      updatedList.splice(dragIndex, 1)
      updatedList.splice(hoverIndex, 0, draggedItem)

      localStorage.setItem('todoList', JSON.stringify(updatedList))
      return updatedList
    })
  }
  const filterList = (searchQuery: string) => {
    if (!searchQuery.trim()) return []
    return todoList
      .map((project) => ({
        ...project,
        item: project.item.filter((item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((project) => project.item.length > 0)
  }

  return {
    todoList,
    setTodoList,
    activeId,
    setActiveId,
    searchQuery,
    setSearchQuery,
    addProject,
    delProject,
    addTask,
    delTask,
    toggleComplete,
    handleMove,
    filterList,
  }
}
