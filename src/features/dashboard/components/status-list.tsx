import { cn } from '@/shared/lib/utils'
import { BsCircleFill } from 'react-icons/bs'
import ButtonIcon from './ui/button-icon'
import { useState } from 'react'
import type { Status } from '../utils/types'
import { Plus } from 'lucide-react'

function StatusList({
  addStatusClick,
  statuses,
  onSelectStatus,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  statuses: Status[]
  className?: string
  onSelectStatus?: (status: Status) => void
  addStatusClick?: () => void
}) {
  const [status, setStatus] = useState(statuses[0])
  return (
    <div
      className={cn(
        'ring-foreground/10 bg-popover absolute top-10 left-4 w-58 rounded-md py-2 shadow-lg ring md:hidden',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 px-2 pb-2">
        <BsCircleFill className="size-4" style={{ color: status.color }} />
        <p className="truncate">{status.title}</p>
        <Plus
          className="text-foreground/50 hover:text-primary mr-2 ml-auto size-4"
          onClick={addStatusClick}
        />
      </div>
      <hr />
      <div className="max-h-92 overflow-auto">
        {statuses.map((s) => (
          <ButtonIcon
            key={s.id}
            className="flex items-center justify-start"
            onClick={() => {
              console.log('status: ', status)
              onSelectStatus?.(s)
              setStatus(s)
            }}
          >
            <BsCircleFill
              style={{ color: s.color }}
              className="size-4 flex-none shrink-0"
            />
            <p className="truncate">{s.title}</p>
          </ButtonIcon>
        ))}
      </div>
    </div>
  )
}

export default StatusList
