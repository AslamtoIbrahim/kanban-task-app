import { cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import React from 'react'

function ButtonAddTask({
  className,
  ...props
}: React.ComponentProps<'button'> & { className?: string }) {
  return (
    <button className={cn('fixed right-4 bottom-4 bg-primary rounded-full shadow-2xl md:hidden', className)} {...props}>
      <Plus className='text-background m-2' />
    </button>
  )
}

export default ButtonAddTask
