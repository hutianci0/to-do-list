import Sidebar from './components/sidebar'
import Main from './components/main'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SearchTask from './components/SearchTask'

export default function App() {
  // const { activeId } = useTodoList()
  return (
    <>
      {/* 标题 */}
      <header className="flex justify-between bg-primary text-white text-2xl py-4 shadow-lg">
        <h3 className="font-bold ">To Do List</h3>
        <SearchTask />
      </header>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-12">
          {' '}
          {/* sidebar */}
          <div className="col-span-3 shadow-md">
            <Sidebar />
          </div>
          {/* ToItem */}
          <div className="col-span-9">
            <Main />
          </div>
        </div>
      </DndProvider>
    </>
  )
}
