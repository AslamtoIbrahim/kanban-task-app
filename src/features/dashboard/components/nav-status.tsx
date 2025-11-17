import { animate, cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { statuses, type Status } from '../utils/types'
import FormAddStatus from './form-add-status'
import StatusList from './status-list'
import StatusButton from './ui/status-buton'

function NavStatus({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [status, setStatus] = useState(statuses[0])
  const [isStatusActive, setIsStatusActive] = useState(false)
  const [isAddStatusActive, setIsAddStatusActive] = useState(false)
  const onSelectStatusHandler = (status: Status) => {
    setStatus(status)
    setIsStatusActive(false)
  }
  return (
    <div className={cn('relative', className)} {...props}>
      {isStatusActive && (
        <div
          onClick={() => setIsStatusActive(false)}
          className="fixed inset-0 z-10"
        />
      )}
      <StatusButton
        className="px-5 py-2 md:hidden"
        onClick={() => setIsStatusActive((pv) => !pv)}
        status={status}
      />
      <StatusList
        addStatusClick={() => setIsAddStatusActive((pv) => !pv)}
        className={cn('z-20', animate(isStatusActive))}
        onSelectStatus={onSelectStatusHandler}
        statuses={statuses}
      />
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

export default NavStatus
