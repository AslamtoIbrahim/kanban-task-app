import { authService } from '@/features/auth/auth.service';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import UserAvatar from './ui/user-avatar';
import { useNavigate } from 'react-router-dom';

function User({
  classNameInfo,
  className,
  ...props
}: React.ComponentProps<'div'> & { classNameInfo?: string, className?: string }) {
  const { data: session, error, isPending } = authService.useSession();
    const navigate = useNavigate();

  if (error) {
    navigate('*')
    return null
  }
  
  if (isPending) {
    return null
  }
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
        username={session?.user.name || "US"}
        imgUrl={session?.user.image || null}
      />
      <div className={cn("text-[10px]", classNameInfo)}>
        <p className="text-[11px]">{session?.user.name}</p>
        <p className="truncate">{session?.user.email}</p>
      </div>
    </div>
  )
}

export default User
