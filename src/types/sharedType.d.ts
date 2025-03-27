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
