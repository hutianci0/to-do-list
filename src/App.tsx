import Sidebar from './components/sidebar'
import Main from './components/main'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SearchTask from './components/SearchTask'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function App() {
  // const { activeId } = useTodoList()
  return (
    <>
      {/* 标题 */}
      <header className="flex justify-between bg-primary text-white text-2xl py-4 shadow-lg">
        <h3 className="font-bold ">To Do List</h3>
        <SearchTask />
      </header>

      <SidebarProvider>
        <DndProvider backend={HTML5Backend}>
          <div className=" shadow-md">
            <Sidebar />
          </div>
          {/* ToItem */}
          <SidebarTrigger size={'lg'} />
          <Main />
        </DndProvider>
      </SidebarProvider>
    </>
  )
}
