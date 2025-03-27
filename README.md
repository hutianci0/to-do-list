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
