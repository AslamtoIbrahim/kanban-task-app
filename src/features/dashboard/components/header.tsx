import { Button } from '@/shared/components/ui/button'
import { animate, cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import FormAddTask from './form-add-task'
import SideBarButton from './ui/sidebar-button'

function Header({
  onSideBarButtonClick,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  onSideBarButtonClick?: () => void
}) {
  const [isDialogActive, setIstask] = useState(false)
  const location = useLocation()
  const title = location.state?.title ?? ''

  return (
    <div
      className={cn(
        'border-b-foreground/20 @container/header flex h-10 w-full items-center gap-2 border-b px-4 py-3',
        className
      )}
      {...props}
    >
      <SideBarButton
        onClick={onSideBarButtonClick}
        className="anime z-20 -ml-1 @[10rem]:ml-0"
      />
      <hr className="border-foreground/50 anime hidden h-full border @min-[10rem]/header:block" />
      <h1 className="font-roboto anime hidden font-semibold @min-[10rem]/header:block">
        {title}
      </h1>
    </div>
  )
}

export default Header
