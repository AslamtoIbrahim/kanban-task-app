import { cn } from '@/shared/lib/utils'
import { Edit, Plus, Trash } from 'lucide-react'
import { BsCircleFill } from 'react-icons/bs'
import type { Statuses } from '../utils/types'
import ButtonIcon from './ui/button-icon'

function StatusList({
  addStatusClick,
  onDeleteStatus,
  onUpdateStatus,
  statuses,
  onSelectStatus,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  statuses: Statuses[]
  className?: string
  onSelectStatus?: (status: Statuses) => void
  onUpdateStatus?: (status: Statuses) => void
  onDeleteStatus?: (id: string) => void
  addStatusClick?: () => void
}) {

  return (
    <div
      className={cn(
        'ring-foreground/10 bg-popover absolute top-10 left-4 w-58 rounded-md py-2 shadow-lg ring md:hidden',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 px-2 pb-2">
        <p className="text-foreground/80">Statuses</p>
        <Plus
          className="text-foreground/50 hover:text-primary mr-2 ml-auto size-4"
          onClick={addStatusClick}
        />
      </div>
      <hr />
      <div className="max-h-92 overflow-auto">
        {statuses.map((s) => (
          <div key={s.id} className="flex items-center justify-start pr-4">
            <ButtonIcon
              key={s.id}
              className="flex items-center justify-start"
              onClick={() => {
                onSelectStatus?.(s)
              }}
            >
              <BsCircleFill
                style={{ color: s.color }}
                className="size-4 flex-none shrink-0"
              />
              <p className="truncate">{s.title}</p>
            </ButtonIcon>
            <Trash
              onClick={() => {
                onDeleteStatus?.(s.id)
              }}
              className="zoom text-foreground/50 mr-2 ml-auto size-5"
            />
            <Edit
              onClick={() => onUpdateStatus?.(s)}
              className="zoom text-foreground/50 ml-auto size-5"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusList
