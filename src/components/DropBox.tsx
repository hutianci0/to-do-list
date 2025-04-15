import { Item } from '@/types/sharedType'
import DraggableItem from './DropItem'
import { useDrop } from 'react-dnd'
import { useRef } from 'react'
import useTodoContext from '@/context/hooks'

export default function DropBox({
  list,
  isdone,
  activeId,
}: {
  list: Item[]
  isdone: boolean
  activeId: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { toggleComplete } = useTodoContext()

  const handleDrop = (item: { id: string }) => {
    if (item.id === activeId) return
    toggleComplete(item.id, activeId)
  }
  const [, drop] = useDrop(
    () => ({ accept: 'tdItem', drop: (item: { id: string }) => handleDrop(item) }),
    [list],
  )
  drop(ref)
  return (
    <div ref={ref} className="bg-gray-50 rounded-lg shadow p-4">
      {/* title */}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        {isdone ? 'Complete' : 'In Progress'}
      </h3>
      {/* 任务项列表 */}
      <div className="space-y-3">
        {list.map((item) => (
          <DraggableItem key={item.id} item={item} isdone={isdone} activeId={activeId} />
        ))}
      </div>
    </div>
  )
}
