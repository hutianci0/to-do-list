import { Input } from '@/components/ui/input'
import useTodoList from '@/context/hooks'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchTask() {
  const { searchQuery, setSearchQuery, filterList, setActiveId } = useTodoList()
  const filteredList = filterList(searchQuery)
  const [isActive, setActive] = useState(false)

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
        <Input
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-5 rounded-lg border-2 focus-visible:ring-0 focus-visible:border-primary transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setTimeout(() => setActive(false), 150)}
        />
      </div>

      {/* 搜索结果下拉框 */}
      {isActive && filteredList?.length > 0 && (
        <div className="absolute mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 w-full overflow-y-auto z-50">
          <div className="p-2 space-y-4">
            {filteredList?.map((list) => (
              <div key={list.id} className="space-y-2">
                <h3 className="px-2 text-sm font-semibold text-cyan-500 dark:text-cyan-400">
                  {list.title}
                </h3>
                <ul className="space-y-1">
                  {list.item.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-cyan-300"
                      onClick={() => setActiveId(list.id)}
                    >
                      <span
                        className={`flex-1 ${task.completed ? 'line-through text-cyan-500' : ''}`}
                      >
                        {task.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 空状态提示 */}
      {isActive && searchQuery && filteredList?.length === 0 && (
        <div className="absolute mt-2 w-full p-4 text-center text-cyan-500 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
          {searchQuery.trim() === '' ? 'no empty' : `no result for ${searchQuery}`}
        </div>
      )}
    </div>
  )
}
