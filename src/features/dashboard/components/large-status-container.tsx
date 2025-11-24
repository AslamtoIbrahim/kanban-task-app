import { Button } from '@/shared/components/ui/button'
import Dialog from '@/shared/components/ui/dialog'
import { animate, cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useGetAllStatuses } from '../hooks/status-hook'
import FormAddStatus from './form-add-status'
import StatusContainer from './status-container'

type TaskContainerProp = React.ComponentProps<'div'> & {
  className?: string
  tagId?: string
}

function LargeStatusContainer({
  className,
  tagId,
  ...props
}: TaskContainerProp) {
  const [isAddStatusActive, setIsAddStatusActive] = useState(false)
  const { data, error, isPending, isSuccess } = useGetAllStatuses(tagId)
   

  if (error) {
    return null
  }

  if (isPending) {
    return null
  }

  const statuses = data.pages.flatMap((p) => p.statuses.map((s) => s) ?? [])

  return (
    <div
      className={cn(
        '2xm:px-6 hidden h-[calc(100vh-2.5rem)] space-y-2 overflow-y-auto p-2 md:flex',
        className
      )}
      {...props}
    >
      {statuses.map((s) => (
        <StatusContainer
          statuses={statuses}
          tagId={tagId}
          status={s}
          key={s.id}
        />
      ))}

      {isSuccess && statuses?.[statuses.length - 1].title && (
        <Button
          onClick={() => setIsAddStatusActive((pv) => !pv)}
          variant={'outline'}
          className="m-2 hidden h-[calc(100vh-5.5rem)] md:inline-flex md:w-50"
        >
          <Plus />
          Add Status
        </Button>
      )}
      <Dialog
        className="z-50"
        open={isAddStatusActive}
        closeDialog={() => setIsAddStatusActive(false)}
      >
        {
          <FormAddStatus
            onCloseClik={() => setIsAddStatusActive(false)}
            tagId={tagId}
            className={cn('z-50', animate(isAddStatusActive))}
            position={data.pages.flatMap((p) => p.statuses).length}
          />
        }
      </Dialog>
    </div>
  )
}

export default LargeStatusContainer
