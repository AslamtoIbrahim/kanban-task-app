import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/teastarea'
import { cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import { statuses, type Status, type Subtask } from '../../utils/types'
import CardSubtask from '../card-subtask'
import { SelectStatus } from './select-status'
import { toast } from 'react-toastify'

const subs = [{ id: crypto.randomUUID(), title: '' }]

function DialogAddTask({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [subtasks, setSubtasks] = useState<Subtask[]>()
  const selectStatusHandler = (status: Status) => {
    // console.log('status', status)
  }

  const onSubtasksChangeHandler = (subtaks: Subtask[]) => {
    setSubtasks(subtaks)
    // console.log('💖 subtaks: ',subtaks);
  }

  const onCreateNewTask = () => {
    if (!subtasks) {
      return
    }
    const titles = subtasks.map((sub) => sub.title)
    const hasDuplicates = new Set(titles).size !== titles.length
    if (hasDuplicates) {
      toast.error('You have duplicate titles')
      return
    }

    toast.success('New Task added successfully', {
      autoClose: 1500
    })
    console.log('✅subtasks: ', subtasks);
  }

  return (
    <div
      className={cn(
        'bg-popover ring-foreground/10 fixed top-[50%] left-[50%] h-fit w-70 -translate-[50%] space-y-4 rounded-lg p-3 shadow-2xl ring',
        className
      )}
      {...props}
    >
      <p>Add New Task</p>
      <div className="space-y-2">
        <Label className="ml-2">Title</Label>
        <Input className="text-sm" placeholder="Take coffee break" />
      </div>
      <div className="space-y-2">
        <Label className="ml-2">Description</Label>
        <Textarea
          className="h-20 text-sm"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little"
        />
      </div>
      <CardSubtask onSubtasksChange={onSubtasksChangeHandler} subtasks={subs} />
      <div className="space-y-2">
        <Label className="ml-2">Status</Label>
        <SelectStatus selectStatus={selectStatusHandler} statuses={statuses} />
      </div>
      <Button onClick={onCreateNewTask} className="w-full">
        Create Task
      </Button>
    </div>
  )
}

export default DialogAddTask
