import { Trash2 } from 'lucide-react'
import useTodoList from '@/context/hooks'
import { useDrag } from 'react-dnd'
import { listType } from '@/types/sharedType'
export default function SidebarItem({ project }: { project: listType }) {
  const { activeId, delProject, setActiveId } = useTodoList()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sidebar',
    item: { id: project.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleDelete = (id: number) => {
    delProject(id)
  }

  if (isDragging) {
    setActiveId(project.id)
  }

  return drag(
    <div
      key={project.id}
      className={`flex justify-between items-center px-4 py-3 rounded-lg mb-2 cursor-pointer transition ${
        activeId === project.id ? 'bg-cyan-600 text-white' : 'hover:bg-gray-800'
      }`}
      onClick={() => setActiveId(project.id)}
    >
      <span className="truncate">{project.title}</span>
      <button
        className="text-gray-400 hover:text-red-500 transition"
        onClick={(e) => {
          e.stopPropagation()
          handleDelete(project.id)
        }}
      >
        <Trash2 size={16} className="hover:cursor-pointer" />
      </button>
    </div>,
  )
}
