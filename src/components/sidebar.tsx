import { useState } from 'react'
import { Plus } from 'lucide-react'
import useTodoList from '@/context/hooks'
import SidebarItem from './draggable'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
export default function Sidebar() {
  // input
  const [value, setValue] = useState<string>('')
  // context
  const { todoList, addProject } = useTodoList()
  // useDrag

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (value.trim() === '') return alert('Please enter a project name')

    addProject(value)
    setValue('')
  }

  return (
    <div className="w-1/4 h-screen bg-gray-900 text-white p-6 border-r border-gray-700 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Your Projects</h3>

      {/* 输入框 */}
      <form className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="New project..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded-lg shadow flex items-center gap-1"
          onClick={handleAdd}
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {/* sidebarItem */}

      <div className="flex-1 overflow-y-auto">
        {todoList.length === 0 ? (
          <div className="text-gray-400 text-sm text-center">No projects</div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            {todoList.map((item, index) => (
              <SidebarItem project={item} key={item.id} index={index} />
            ))}
          </DndProvider>
        )}
      </div>
    </div>
  )
}
