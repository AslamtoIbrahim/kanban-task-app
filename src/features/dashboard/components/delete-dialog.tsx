import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import React from 'react'

type DeleteDialogProps = React.ComponentProps<'div'> & {
  title: string
  deleteItem: () => void
  className?: string
  cancelClick?: () => void
}
function DeleteDialog({
  title,
  deleteItem,
  cancelClick,
  className,
  ...props
}: DeleteDialogProps) {
  return (
    <div className={cn('bg-background w-70 rounded p-4', className)} {...props}>
      <h1 className="text-sm capitalize">delete {title}</h1>
      <p className="mt-4 text-xs">
        Are you sure you want to delete this {title}?
      </p>
      <div className="flex justify-end gap-4 p-4 ">
        <Button onClick={cancelClick} variant={'outline'} className="text-xs capitalize">
          cancel
        </Button>
        <Button onClick={deleteItem} variant={'destructive'} className="text-xs capitalize">
          delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteDialog
