import Sidebar from './components/sidebar'
import useTodoList from './context/hooks'
import TdItem from './components/tdItem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
  const { activeId } = useTodoList()
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* 标题 */}
        <header className="bg-cyan-500 text-white text-2xl font-bold text-center py-4 shadow-md">
          To Do List
        </header>
        <div className="flex">
          {' '}
          {/* sidebar */}
          <Sidebar />
          {/* ToItem */}
          <TdItem id={activeId} />
        </div>
      </DndProvider>
    </>
  )
}
