export interface Item {
  id: string
  text: string
  completed: boolean
}

export type listType = {
  id: string
  title: string
  item: Item[]
}

export type todoActions = {
  setActiveId: (id: string) => void
  addProject: (project: string) => void
  delProject: (id: string) => void
  addTask: (taskName: string, projectId: string) => void
  delTask: (taskId: string, projectId: string) => void
  toggleComplete: (taskId: string, projectId: string) => void
  handleMove: (dragIndex: number, index: number) => void
  setSearchQuery: (query: string) => void
  filterList: (searchQuery: string) => listType[]
}
