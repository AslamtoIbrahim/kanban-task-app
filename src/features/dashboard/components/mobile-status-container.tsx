import { cn } from '@/shared/lib/utils'
import React from 'react'
import TaskItem from './ui/task-item'

function MobileStatusContainer({
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
    <div className={cn('md:hidden p-4 space-y-3 2xm:px-6', className)} {...props}>
      {[...Array(26)].map(() => (
        <TaskItem task={task} />
      ))}
    </div>
  )
}

export default MobileStatusContainer
