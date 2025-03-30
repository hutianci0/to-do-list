# To-Do-List

## MVP version

`MVP` （Minimum Viable Product，最小可行产品）是指一个功能最少但可以满足核心需求的产品版本。

## Features

- [ ] TASK CRUD
- [ ] localStorage
- [ ] UI

## Vite alias

`vite.config.ts`

```ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

`tsconfig.json`

```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
    }
```

## react 19 hooks

### "use" hook

data fetching

```jsx
const WeatherComponent = () => {
  const weather = use(fetchWeather())
}
```

Why This Is Better:

- **No More useEffect**
- **Suspense for Loading:** automatic suspense
- **Error Boundaries for Error Handling**

context

```jsx
// 1. createContext and contextType
type TodoListContextType = {
  todoList: Item[] | []
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>
}
export const TodoListContext = createContext<TodoListContextType | undefined>(undefined)

// 2. create wrapper
import { Item } from '@/types/sharedType'
// 创建wrapper
export const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<Item[] | []>(() =>
    localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')!) : [],
  )

  return (
    <TodoListContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoListContext.Provider>
  )
}
// 3. use context
  const { todoList, setTodoList } = use(TodoListContext)!
```

## 拖拽 API

### 原生 HTML

1. 给需要拖拽的元素添加`draggable="true"`属性
2. 监听拖拽元素 or 父元素的事件`(事件委托)`:e.target 触发事件的元素
   1. `onDragStart`: 开始拖拽时触发: 被拖拽的 element
   2. `onDragOver`: 拖拽元素在目标元素上移动时触发: 目标元素
   3. `onDragEnter`: 拖拽元素进入目标元素上: 只出发一次: 目标元素
   4. `onDrop`: 大部分元素不支持, 需要在目标元素上添加:`e.preventDefault()`
3. 控制拖拽鼠标样式:
   可通过自定义属性控制
   ```js
   container.ondragStart = (e) => {
     e.dataTransfer.effectAllowed = e.target.dataset.XXX // 默认为复制‘copy’的鼠标样式
   }
   ```
4. 通过拖拽类型区分区域: 在区域 A effect 为'move', 在区域 B effect 为'copy'
5. 通过全局变量储存被拖拽元素, 方便之后 onDrop/onDragEnd 使用

### react-dnd

- 拖拽本质是修改状态
- 一般是创建一个 DropBox 传递 props,再遍历 list 创建一个 DragItem(unqie ref)
- 使用 react-dnd 创建排序列表

1. 下载 react-dnd 和 react-dnd-html5-backend
2. DNDprovider 包裹拖移组件 backend 为 html5
3. useDrag Hook<br>

- `type`: 特定标识
- `item`: 被拖拽的元素的属性
- `collect(monitor)`: 返回一个对象, 包含被拖拽元素的状态 -`drag(ref)`(useRef 绑定元素)

```jsx
const [{ isDragging }, drag] = useDrag(() => ({
  type: 'sidebar',
  item: { id: project.id, index },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
}))
```

4. useDrop Hook:

- `accept`: 接受拖拽的类型与`type`一致
- `collect(monitor)`: 返回一个对象, 包含被拖拽元素的状态
- `handlerId`: 通过 data-handler-id 绑定
- drop(ref) (useRef 绑定元素)
- `hover`: 鼠标悬停时触发

```jsx
  const [{ handlerId }, drop] = useDrop<
    { id: number; index: number },
    void,
    { handlerId: Identifier | null }
  >(
    () => ({
      accept: 'sidebar',
      collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
      hover: (item: { index: number }, monitor) => {
        const dragIndex = item.index
        const hoverIndex = index

        // 获取 hover 目标的位置信息
        const hoverBoundingRect = ref.current!.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // 获取鼠标位置
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // 向下拖拽，鼠标必须超过 hover 目标的一半高度
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        // 向上拖拽，鼠标必须低于 hover 目标的一半高度
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        if (dragIndex !== hoverIndex) {
          handleMove(dragIndex, hoverIndex)
        }

        item.index = hoverIndex
      },
    }),
    [todoList],
  )
```

5. 列表排序
   - 列表 item 添加`data-handler-id`属性, 既是 droppable 又是 draggable
   - 拖拽元素添加`data-drag-id`属性

### 排序逻辑

- 拖拽时能获取拖拽的元素和 hover 的元素的 index
  - 拖拽元素: 一般父组件传递(list.map(item,`index`))
  - hover 元素: `collect(item,monitor)`中获取
- 添加 threshold
  1. 获取 hover 盒子的高度
  2. 获取鼠标位置
  3. 判断鼠标位置是否超过 hover 盒子的一半高度
- 修改数组

```js
functionSwap(arr, index1, index2) {
  const arrCopy = [...arr] // 复制
  const drapItem = arrCopy[index1] // 删除dragItem
  arrCopy.splice(index1, 1)
  arrCopy.splice(index2, 0, drapItem) // 在index2位置插入

  return arrCopy
}
```

- <mark>最后讲 dragItem 的 index 更新为 hoverIndex</mark>

## 受控组件防抖

- 通过管理更新 state 的频率实现防抖
  useDebounce 函数

```ts
// 受控组件的防抖
import { useState, useEffect } from 'react'
export default function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    // dealy秒后更新value
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounceValue
}
```

使用:

```tsx
const [xxx, setXXX]=useState('')
// 防抖
const queryResult = useDebounce(xxx, 500)
<input value={XXX} onChange={e=> setXXX(e.target.value)} />
```
