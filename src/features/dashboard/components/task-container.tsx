import { animate, cn } from '@/shared/lib/utils'
import StatusContainer from './status-container'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import FormAddStatus from './form-add-status'

function TaskContainer({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [isAddStatusActive, setIsAddStatusActive] = useState(false)

  return (
    <div
      className={cn(
        'h-[calc(100vh-2.5rem)] hidden md:flex space-y-2 overflow-y-auto p-2 2xm:px-6',
        className
      )}
      {...props}
    >
      {[...Array(2)].map(() => (
        <StatusContainer />
      ))}

      <Button
        onClick={() => setIsAddStatusActive((pv) => !pv)}
        variant={'outline'}
        className="m-2 hidden h-[calc(100vh-5.5rem)] md:inline-flex md:w-50"
      >
        <Plus />
        Add Status
      </Button>
      {isAddStatusActive && (
        <div
          onClick={() => setIsAddStatusActive(false)}
          className="bg-foreground/35 fixed inset-0 z-30"
        />
      )}
      <FormAddStatus className={cn('z-30', animate(isAddStatusActive))} />
    </div>
  )
}

export default TaskContainer
