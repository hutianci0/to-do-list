import useTodoList from '@/context/hooks'
import { useState } from 'react'
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react'

export default function TdItem({ id }: { id: number | null }) {
  const { todoList, addTask, delTask, toggleComplete } = useTodoList()
  const [value, setValue] = useState<string>('')

  const list = todoList.find((list) => list.id === id)
  if (!list) return <div className="text-gray-500 text-center">Add your project</div>

  return (
    <div className="p-6  rounded-lg shadow-md w-3/4 mx-auto">
      <h3 className="text-xl font-semibold mb-4">This is {list?.title}</h3>

      {/* 输入框 */}
      <form className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={list.item.length === 0 ? 'Start your project' : 'Add another item'}
        />
        <button
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded-lg shadow flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault()
            if (value.trim() !== '') {
              addTask(value, list.id)
              setValue('')
            }
          }}
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {/* 任务列表 */}
      <ul className="space-y-2 text-white">
        {list.item.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between p-3 rounded-lg transition ${
              item.completed ? 'bg-blue-300 text-gray-400 line-through' : 'bg-blue-400'
            }`}
          >
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleComplete(item.id, list.id)}
            >
              {item.completed ? (
                <CheckCircle className="text-green-400" size={20} />
              ) : (
                <Circle className="text-amber-300" size={20} />
              )}
              <span>{item.text}</span>
            </div>
            <button
              className="text-amber-300 hover:text-red-500 transition"
              onClick={() => delTask(item.id, list.id)}
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      {list.item.length === 0 && (
        <div className="text-gray-400 text-sm text-center mt-4">No tasks yet</div>
      )}
    </div>
  )
}
