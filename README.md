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
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
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