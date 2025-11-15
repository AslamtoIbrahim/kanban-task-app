import { cn } from '@/shared/lib/utils'
import React from 'react'
import UserAvatar from './ui/user-avatar'

function User({
  classNameInfo,
  className,
  ...props
}: React.ComponentProps<'div'> & { classNameInfo?: string, className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 cursor-default rounded',
        className
      )}
      {...props}
    >
      <UserAvatar
        className="zoom"
        username="Shadcn"
        imgUrl="https://ui.shadcn.com/avatars/shadcn.jpg"
      />
      <div className={cn("text-[10px]", classNameInfo)}>
        <p className="text-[12px]">shadcn</p>
        <p className="">m@example.com</p>
      </div>
    </div>
  )
}

export default User
