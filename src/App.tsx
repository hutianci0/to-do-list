import TdItem from '@/components/tdItem'
import { useState, use } from 'react'
import { Item } from './types/sharedType'
import { TodoListContext } from '@/context/toDolistContext'
export default function App() {
  //   const [todoList, setTodoList] = useState<Item[]>(
  //     localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : []
  // )
  const { todoList, setTodoList } = use(TodoListContext)!
  const [value, setValue] = useState<string>('')

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (value.trim() === '') alert('Please enter a value')

    setTodoList([...todoList, { id: todoList.length + 1, text: value, completed: false }])
    localStorage.setItem(
      'todoList',
      JSON.stringify([...todoList, { id: todoList.length + 1, text: value, completed: false }]),
    )
    setValue('')
  }

  const onDelete = (id: number) => {
    const filteredList = todoList.filter((item: Item) => item.id !== id)
    setTodoList(filteredList)
    localStorage.setItem('todoList', JSON.stringify(filteredList))
  }
  return (
    <>
      <h1 className="bg-cyan-100">To Do List</h1>
      <form action="#">
        <p>new item</p>
        <input
          type="text"
          className="border-2 border-black rounded-md p-2"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <button
          className="block bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handleAdd(e)}
        >
          add
        </button>
      </form>
      <div>
        {todoList.map((item) => (
          <TdItem key={item.id} item={item} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}
