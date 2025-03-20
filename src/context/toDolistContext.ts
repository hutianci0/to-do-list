import { createContext } from 'react'
import { Item } from '@/types/sharedType'

// 创建context: 定义类型 + 初始值
type TodoListContextType = {
  todoList: Item[] | []
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>
}
export const TodoListContext = createContext<TodoListContextType | undefined>(undefined)
