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
