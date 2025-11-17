import { cn } from '@/shared/lib/utils'
import React from 'react'
import TaskItem from './ui/task-item'
import { BsCircleFill } from 'react-icons/bs'

function StatusContainer({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const task = {
    id: 'ddgdgdgd',
    title: 'string',
    description: 'string',
    currentStatus: 'Pending',
  }
  return (
    <div className={cn('space-y-2 p-2 md:w-50 hidden md:block', className)} {...props}>
      <div className="flex items-center gap-2">
        <BsCircleFill style={{ color: "#adad1" }} />
        <p className="w-38 truncate text-start">Pending</p>
      </div>
      {[...Array(6)].map(() => (
        <TaskItem task={task} />
      ))}
    </div>
  )
}

export default StatusContainer
