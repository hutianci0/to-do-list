import Sidebar from './components/sidebar'
import Main from './components/main'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
  // const { activeId } = useTodoList()
  return (
    <>
      {/* 标题 */}
      <header className="bg-cyan-500 text-white text-2xl font-bold text-center py-4 shadow-md">
        To Do List
      </header>
      <DndProvider backend={HTML5Backend}>
        <div className="flex">
          {' '}
          {/* sidebar */}
          <Sidebar />
          {/* ToItem */}
          <Main />
        </div>
      </DndProvider>
    </>
  )
}
