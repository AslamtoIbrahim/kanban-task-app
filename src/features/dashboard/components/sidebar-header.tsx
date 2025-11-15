import { cn } from '@/shared/lib/utils'

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  return (
    <div
      className={cn(
        'anime @container flex items-center gap-2 px-4 py-3 md:px-2',
        className
      )}
      {...props}
    >
      <picture>
        <source
          srcSet="/public/apple-touch-icon.png"
          media="(min-width: 768px)"
        />
        <img
          className="anime md:ml-1 size-4 @[10rem]:ml-2 "
          src="/public/apple-touch-icon.png"
          alt="Logo"
        />
      </picture>
      <h1 className="anime font-roboto hidden text-lg font-bold md:text-xl @[10rem]:block">
        Kanban
      </h1>
    </div>
  )
}

export default SidebarHeader
