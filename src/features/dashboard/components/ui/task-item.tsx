import { cn } from '@/shared/lib/utils'
import { Trash } from 'lucide-react'
import React from 'react'
import type { Tasks } from '../../utils/types'

type TaskItemProp = React.ComponentProps<'div'> & {
  task: Tasks
  className?: string
  onUpdateTask: (task: Tasks) => void
  onDeleteTask: (id: string) => void
}
function TaskItem({
  task,
  className,
  onUpdateTask,
  onDeleteTask,
  ...props
}: TaskItemProp) {
  const handleDeleteSelectID = (e: React.MouseEvent<SVGSVGElement>) => {
    onDeleteTask(task.id)
    e.stopPropagation()
  }
  return (
    <div
      onClick={() => onUpdateTask(task)}
      className={cn(
        'bg-background/75 ring-foreground/10 hover:ring-primary flex cursor-grab items-center justify-between rounded-md px-4 py-2 ring hover:ring',
        className
      )}
      {...props}
    >
      <div>
        <p className="truncate font-semibold">{task.title}</p>
        <p className="text-foreground/75 text-sm">
          {task.subtasks?.filter((f) => f.isDone === true).length} of{' '}
          {task.subtasks?.length} subtask{`${task.subtasks?.length ? 's' : ''}`}
        </p>
      </div>
      <Trash
        onClick={handleDeleteSelectID}
        className="text-foreground/50 hover:text-foreground/90 size-4 shrink-0 cursor-default"
      />
    </div>
  )
}

export default TaskItem
