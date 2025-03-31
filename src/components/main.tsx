import useTodoList from '@/context/hooks'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Item } from '@/types/sharedType'
import DropBox from './DropBox'

export default function Main() {
  const { todoList, addTask, activeId } = useTodoList()
  const [value, setValue] = useState<string>('')

  const sortArr = (arr: Item[] | undefined) => {
    if (arr === undefined) return { completed: [], unCompleted: [] }
    const completed = arr.filter((item) => item.completed)
    const unCompleted = arr.filter((item) => !item.completed)
    return {
      completed,
      unCompleted,
    }
  }

  const list = todoList.find((item) => item.id === activeId)
  if (list === undefined) return <div className="text-gray-500 ">Add your project</div>

  return (
    <div className="w-full h-screen overflow-auto bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">This is {list?.title}</h3>

      {/* 输入框 */}
      <form className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={list.item.length === 0 ? 'Start your project' : 'Add another item'}
        />
        <button
          className="flex items-center gap-1 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition"
          onClick={(e) => {
            e.preventDefault()
            if (value.trim() !== '') {
              addTask(value, list.id)
              setValue('')
            }
          }}
        >
          <Plus size={18} /> Add
        </button>
      </form>

      <div className="h-full grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <DropBox list={sortArr(list.item).unCompleted} isdone={false} activeId={activeId} />
        <DropBox list={sortArr(list.item).completed} isdone={true} activeId={activeId} />
      </div>
    </div>
  )
}
