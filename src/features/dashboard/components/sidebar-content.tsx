import { cn } from '@/shared/lib/utils'
import TagItem from './ui/tag-item'

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  return (
    <div className={cn('py-4 space-y-4 ', className)} {...props}>
      <h2 className="px-4 text-[12px] font-roboto">All boards</h2>
      <section className="space-y-2  h-full overflow-y-auto ">
        <TagItem />
        {[...Array(45)].map((_, i) => (
          <TagItem key={i} />
        ))}
      </section>
    </div>
  )
}

export default SidebarContent
