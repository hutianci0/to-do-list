import useTodoList from '@/context/hooks'
import SidebarItem from './sidebarItem'
import DialogForm from './dialog'

export default function Sidebar() {
  // input

  // context
  const { todoList } = useTodoList()

  return (
    <div className="w-full h-screen border-r px-2 border-gray-50 flex flex-col">
      <div className="mt-1.5">
        <h1 className="text-lg text-center font-semibold mb-4">To Do List</h1>
        <DialogForm />
      </div>
      <h3 className="font-semibold my-4">Your Projects: </h3>
      <div className="w-full overflow-y-auto">
        {todoList.length === 0 ? (
          <div className="w-full text-gray-400 text-sm px-4">No projects</div>
        ) : (
          todoList.map((item, index) => <SidebarItem project={item} key={item.id} index={index} />)
        )}
      </div>
    </div>
  )
}
