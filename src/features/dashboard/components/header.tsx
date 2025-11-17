import { Button } from '@/shared/components/ui/button'
import { animate, cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import SideBarButton from './ui/sidebar-button'
import { useState } from 'react'
import FormAddTask from './form-add-task'

function Header({
  onSideBarButtonClick,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  onSideBarButtonClick?: () => void
}) {
  const [isDialogActive, setIstask] = useState(false)

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
        className="anime -ml-1 @[10rem]:ml-0 z-20"
      />
      <hr className="border-foreground/50 anime hidden h-full border @min-[10rem]/header:block" />
      <h1 className="font-roboto anime hidden font-semibold @min-[10rem]/header:block">
        Tag Title
      </h1>
      <Button
        onClick={() => setIstask((p) => !p)}
        variant={'ghost'}
        className="hover:bg-foreground/10 rounded my-0 ml-auto hidden py-0 text-[12px] md:inline-flex"
      >
        <Plus />
        Add Task
      </Button>
      {isDialogActive && (
        <div
          onClick={() => setIstask(false)}
          className="bg-foreground/35 fixed inset-0 z-20"
        />
      )}
      <FormAddTask className={cn('z-20', animate(isDialogActive))} />
    </div>
  )
}

export default Header
