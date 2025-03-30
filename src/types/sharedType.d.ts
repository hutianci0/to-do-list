export interface Item {
  id: number
  text: string
  completed: boolean
}

export type listType = {
  id: number
  title: string
  item: Item[]
}

export type todoActions = {
  setActiveId: (id: number) => void
  addProject: (project: string) => void
  delProject: (id: number) => void
  addTask: (taskName: string, projectId: number) => void
  delTask: (taskId: number, projectId: number) => void
  toggleComplete: (taskId: number, projectId: number) => void
  handleMove: (dragIndex: number, index: number) => void
  setSearchQuery: (query: string) => void
  filterList: (searchQuery: string) => listType[]
}
