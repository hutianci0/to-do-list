import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useTodoList from '@/context/hooks'
import { Plus } from 'lucide-react'
import { useState } from 'react'
export default function DialogForm() {
  const [value, setValue] = useState<string>('')
  const { addProject } = useTodoList()
  const handleAdd = () => {
    if (value.trim() === '') return alert('Please enter a project name')

    addProject(value)
    setValue('')
  }

  return (
    <div className="text-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-[90%]">
            <Plus size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start your project</AlertDialogTitle>
            <AlertDialogDescription />
          </AlertDialogHeader>
          <div className=" mb-4">
            {' '}
            <form action={'/'} onSubmit={handleAdd}>
              <Input
                type="text"
                placeholder="New project..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button variant={'ghost'} type="submit"></Button>
            </form>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-20" onClick={handleAdd}>
              <Plus />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
