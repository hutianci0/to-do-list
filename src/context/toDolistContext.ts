import { createContext } from 'react'
import { listType, todoActions } from '@/types/sharedType'

// 创建context: 定义类型 + 初始值
type TodoListContextType = {
  todoList: listType[] | []
  activeId: string
  searchQuery: string
} & todoActions
export const TodoListContext = createContext<TodoListContextType>({} as TodoListContextType)
