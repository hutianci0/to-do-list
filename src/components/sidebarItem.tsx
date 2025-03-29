import { Trash2 } from 'lucide-react'
import useTodoList from '@/context/hooks'
import { useDrag, useDrop } from 'react-dnd'
import { listType } from '@/types/sharedType'
import { useRef } from 'react'
import { Identifier } from 'dnd-core'
export default function SidebarItem({ project, index }: { project: listType; index: number }) {
  const { todoList, activeId, delProject, setActiveId, handleMove } = useTodoList()
  const ref = useRef<HTMLDivElement | null>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sidebar',
    item: { id: project.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [{ handlerId }, drop] = useDrop<
    { id: number; index: number },
    void,
    { handlerId: Identifier | null }
  >(
    () => ({
      accept: 'sidebar',
      collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
      hover: (item: { index: number }, monitor) => {
        const dragIndex = item.index
        const hoverIndex = index

        // 获取 hover 目标的位置信息
        const hoverBoundingRect = ref.current!.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // 获取鼠标位置
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // 向下拖拽，鼠标必须超过 hover 目标的一半高度
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        // 向上拖拽，鼠标必须低于 hover 目标的一半高度
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        if (dragIndex !== hoverIndex) {
          handleMove(dragIndex, hoverIndex)
        }

        item.index = hoverIndex
      },
    }),
    [todoList],
  )

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`flex justify-between items-center px-4 py-3 rounded-lg mb-2 cursor-pointer transition ${
        activeId === project.id ? 'bg-cyan-600 text-white' : 'hover:bg-rose-200'
      }`}
      onClick={() => setActiveId(project.id)}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <span className="truncate">{project.title}</span>
      <button
        className="text-gray-400 hover:text-red-500 transition"
        onClick={(e) => {
          e.stopPropagation()
          delProject(project.id)
        }}
      >
        <Trash2 size={16} className="hover:cursor-pointer" />
      </button>
    </div>
  )
}
