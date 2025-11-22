import { animate, cn } from '@/shared/lib/utils'
import React, { type ReactNode } from 'react'

type DialoProps = React.ComponentProps<'div'> & {
  className?: string
  backdropClassName?: string
  open: boolean
  closeDialog?: () => void
  children?: ReactNode
}

function Dialog({
  children,
  className,
  open,
  closeDialog,
  backdropClassName,
  ...props
}: DialoProps) {
  return (
    <div className={cn('', className)} {...props}>
      {open && <div
        onClick={closeDialog}
        className={cn('bg-foreground/10 fixed inset-0', backdropClassName)}
      />}
      <div
        className={cn(animate(open), 'fixed top-1/2 left-1/2 -translate-1/2')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Dialog
