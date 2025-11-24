import { cn } from '@/shared/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash } from 'lucide-react'
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: 'task', task },
  })

  const style = {
    transform: isDragging ? CSS.Transform.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 100 : 'auto',
  }

  const handleDeleteSelectID = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onDeleteTask(task.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        onUpdateTask(task)
      }}
      className={cn(
        'bg-background/75 ring-foreground/10 hover:ring-primary flex cursor-default items-center justify-between rounded-md px-4 py-2 ring hover:ring',
        className
      )}
      {...attributes}
      {...props}
    >
      <GripVertical
        {...listeners}
        onClick={handleDeleteSelectID}
        className="text-foreground/50 hover:text-foreground/90 size-4 shrink-0 cursor-grab"
      />
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
