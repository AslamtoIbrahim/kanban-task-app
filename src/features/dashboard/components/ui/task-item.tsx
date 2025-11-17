import { cn } from '@/shared/lib/utils'
import React from 'react'
import type { Task } from '../../utils/types'

function TaskItem({
  task,
  className,
  ...props
}: React.ComponentProps<'div'> & { task: Task; className?: string }) {
  return (
    <div
      className={cn(
        'bg-background/75 ring-foreground/10 hover:ring-primary rounded-md px-4 py-2 ring hover:ring',
        className
      )}
      {...props}
    >
      <p className="truncate font-semibold">
        {task.title} hello world there play that game aga
      </p>
      <p className="text-foreground/75 text-sm">
        {2} of {6} subtask{`${6 > 1 ? 's' : ''}`}
      </p>
    </div>
  )
}

export default TaskItem
