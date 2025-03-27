import { TodoListContext } from './toDolistContext'
import { useContext } from 'react'
export default function useTodoList() {
  const context = useContext(TodoListContext)

  if (context === undefined) {
    throw new Error('useTodoList must be used within a TodoListProvider')
  }

  return context
}
