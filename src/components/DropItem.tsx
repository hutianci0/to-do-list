import { Trash2, CheckCircle, Circle } from 'lucide-react'
import { useDrag } from 'react-dnd'
import { useRef } from 'react'
import useTodoList from '@/context/hooks'
import { Item } from '@/types/sharedType'

interface DraggableItemProps {
  item: Item
  isdone: boolean
  activeId: number
}

export default function DraggableItem({ item, isdone, activeId }: DraggableItemProps) {
  const { toggleComplete, delTask } = useTodoList()
  const ref = useRef<HTMLDivElement | null>(null)

  const [, drag] = useDrag(() => ({
    type: 'tdItem',
    item: { id: item.id }, // 可根据实际情况传入 index 或其他唯一标识
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // 将当前 DOM 节点与拖拽绑定
  drag(ref)

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-3 rounded-md transition ${
        isdone
          ? 'bg-blue-100 text-gray-500 line-through'
          : 'bg-blue-200 text-gray-800 hover:bg-blue-300'
      }`}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => toggleComplete(item.id, activeId)}
      >
        {isdone ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle className="text-amber-500" size={20} />
        )}
        <span>{item.text}</span>
      </div>
      <button
        className="text-amber-500 hover:text-red-500 transition"
        onClick={() => delTask(item.id, activeId)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
