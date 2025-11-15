import { cn } from '@/shared/lib/utils'
import SideBarButton from './ui/sidebar-button'

function Header({
  onSideBarButtonClick,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  onSideBarButtonClick?: () => void
}) {
  return (
    <div
      className={cn(
        'h-10 w-full py-3 px-4 flex items-center @container/header gap-2 border-b border-b-foreground/20',
        className
      )}
      {...props}
    >
      <SideBarButton
        className="-ml-1 @[10rem]:ml-0 anime"
        onClick={onSideBarButtonClick}
      />
      <hr className="border-foreground/50 border hidden @min-[10rem]/header:block h-full anime " />
      <h1 className="font-roboto font-semibold hidden @min-[10rem]/header:block anime">
        Tag Title
      </h1>
    </div>
  )
}

export default Header
