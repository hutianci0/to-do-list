import { TodoListContext } from './toDolistContext'
import { useState } from 'react'
import { Item } from '@/types/sharedType'
// 创建wrapper
export const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<Item[] | []>(() =>
    localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : [],
  )

  return (
    <TodoListContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoListContext.Provider>
  )
}
