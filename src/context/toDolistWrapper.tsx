import { TodoListContext } from './toDolistContext'
import { useTodoListMethods } from './hooks'
// 创建wrapper
export const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useTodoListMethods()

  return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>
}
