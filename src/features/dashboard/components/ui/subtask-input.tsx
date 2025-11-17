import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import React from 'react'

function SubtaskInput({
  exist,
  onChangeSub,
  subId,
  onRemoveInputClick,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  onRemoveInputClick?: (id: string) => void
  onChangeSub: (id: string, value: string) => void
  subId: string
  exist: { [id: string]: boolean }
}) {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Input
        onChange={(e) => onChangeSub(subId, e.currentTarget.value)}
        className={`text-sm ${exist[subId] ? 'border-2 border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50 ' 
          : 'border  border-input focus-visible:border-ring focus-visible:ring-ring/50 '}`}
        placeholder="Make coffee"
      />
      <X
        onClick={() => onRemoveInputClick?.(subId)}
        className="text-foreground/50 shrink-0"
      />
    </div>
  )
}

export default SubtaskInput
