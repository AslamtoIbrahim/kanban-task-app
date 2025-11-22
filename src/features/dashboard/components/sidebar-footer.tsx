import { cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import NavUser from './nav-user'
import User from './user'

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [isActive, setIsActive] = useState(false)
  const onBgClickHandler = () => {
    setIsActive(false)
  }

  const onActiveClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive((prv) => !prv)
  }
  return (
    <div
      className={cn('anime @container px-4 py-3 md:px-2', className)}
      {...props}
    >
      {isActive && (
        <div onClick={onBgClickHandler} className="fixed inset-0 z-10 " />
      )}
      <User
        onClick={onActiveClick}
        className={`hover:bg-foreground/10 @[10rem]:p-1 ${isActive && 'bg-foreground/10'}
        hidden @[10rem]:flex md:flex`}
        classNameInfo="hidden @[10rem]:block anime "
      />
      <NavUser
        className={`z-20 transition-all duration-300 ease-in-out hiddenn @[10rem]:block anime ${isActive ? 'visible scale-100 opacity-100' : 'invisible scale-75 opacity-0'}`}
      />
     
    </div>
  )
}

export default SidebarFooter
