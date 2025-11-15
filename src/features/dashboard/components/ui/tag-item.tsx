import { cn } from '@/shared/lib/utils'
import React from 'react'

function TagItem({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  return (
    <div
      className={cn(
        'py-1 mx-3 px-1 hover:bg-foreground/5 hover:rounded anime cursor-default',
        className
      )}
      {...props}
    >
      <p className="truncate font-nunito capitalize text-[12px] md:text-sm ">
        platform launch tag one late blol
      </p>
    </div>
  )
}

export default TagItem
