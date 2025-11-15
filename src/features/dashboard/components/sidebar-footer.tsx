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
    console.log('isActive: ', isActive)
    e.preventDefault()
    e.stopPropagation()
    setIsActive((prv) => !prv)
  }
  return (
    <div
      className={cn(' @container px-4 md:px-2 py-3 anime', className)}
      {...props}
    >
      {isActive && (
        <div
          onClick={onBgClickHandler}
          className="absolute top-0 left-0 h-screen w-screen z-10"
        />
      )}
      <User
        onClick={onActiveClick}
        className={`@[10rem]:p-1 hover:bg-foreground/10 ${isActive && 'bg-foreground/10'}`}
        classNameInfo="hidden @[10rem]:block anime "
      />
      <NavUser
        className={`transition-all duration-300 ease-in-out z-20 ${isActive ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-75'}`}
      />
    </div>
  )
}

export default SidebarFooter
