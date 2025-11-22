import { cn } from '@/shared/lib/utils'
import { Edit, Trash } from 'lucide-react'
import React from 'react'
import ButtonIcon from './button-icon'

function UDPopoup({
  updateTag,
  deleteTag,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  updateTag?: () => void
  deleteTag?: () => void
}) {
  return (
    <div className={cn('absolute bg-popover rounded px-1  py-2 right-1.5 top-2 ', className)} {...props}>
      <ButtonIcon onClick={updateTag}>
        <Edit className="text-foreground/50 size-4" />
        <p>Update tag</p>
      </ButtonIcon>
      <ButtonIcon onClick={deleteTag}>
        <Trash className="text-foreground/50 size-4" />
        <p>Delete tag</p>
      </ButtonIcon>
    </div>
  )
}

export default UDPopoup
