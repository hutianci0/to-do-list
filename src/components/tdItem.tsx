import { Item } from "@/types/sharedType"
import { useState } from "react"

export default function TdItem({item, onDelete}: {item:Item, onDelete: (id:number) => void}) {
  const { id, text, completed} = item
  const [isChecked, setChecked] = useState<boolean>(completed)

  const handleCheck = (id:number)=>{
    setChecked(!isChecked)
    const list = JSON.parse(localStorage.getItem("todoList")!)
    list?.filter((item:Item )=> item.id === id ? item.completed = !item.completed : item) 
    localStorage.setItem("todoList", JSON.stringify(list))

    
    
    
  }
  return (
      <div>
        <label htmlFor={text}>
        <input type="checkbox" id={text} checked={isChecked} onChange={()=> handleCheck(id)}/>
        {text}
        </label>
            <button type="button" onClick={()=> onDelete(id)}>Delete</button>
      </div>
  )
 
  
}