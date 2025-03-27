import { createContext } from 'react'
import { listType } from '@/types/sharedType'

// 创建context: 定义类型 + 初始值
type TodoListContextType = {
  todoList: listType[] | []
  activeId: number | null
  setActiveId: (id: number) => void
  addProject: (project: string) => void
  delProject: (id: number) => void
  addTask: (taskName: string, projectId: number) => void
  delTask: (taskId: number, projectId: number) => void
  toggleComplete: (taskId: number, projectId: number) => void
  handleMove: (dragIndex: number, index: number) => void
}
export const TodoListContext = createContext<TodoListContextType | undefined>(undefined)
