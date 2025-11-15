import { cn } from '@/shared/lib/utils'
import { Bell, Info, LogOutIcon, Sparkle } from 'lucide-react'
import ButtonIcon from './ui/button-icon'
import ButtomTheme from './ui/button-theme'
import User from './user'

function NavUser({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const onClickPrevent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      onClick={onClickPrevent}
      className={cn(
        'ring-foreground/10 bg-popover absolute bottom-14 left-4 w-58 overflow-hidden rounded-md py-2 shadow-lg ring md:bottom-4 md:left-52 md:w-52 @max-[10rem]:left-11',
        className
      )}
      {...props}
    >
      <User className="mx-2 py-1" />
      <hr />
      <ButtonIcon>
        <Sparkle className="text-foreground/50 size-4" />
        <p>Upgrade to Pro</p>
      </ButtonIcon>
      <hr />
      <ButtonIcon>
        <Bell className="text-foreground/50 size-4" />
        <p>Notifications</p>
      </ButtonIcon>
      <ButtonIcon
        onClick={() =>
          window.open('https://github.com/AslamtoIbrahim', '_blank')
        }
      >
        <Info className="text-foreground/50 size-4" />
        <p>About us</p>
      </ButtonIcon>
      <ButtomTheme />
      <hr />
      <ButtonIcon>
        <LogOutIcon className="text-foreground/50 size-4" />
        <p>Log out</p>
      </ButtonIcon>
    </div>
  )
}

export default NavUser
