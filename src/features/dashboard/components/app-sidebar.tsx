import { Button } from '@/shared/components/ui/button'
import { animate, cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import SidebarContent from './sidebar-content'
import SidebarFooter from './sidebar-footer'
import SidebarHeader from './sidebar-header'
import FormAddTag from './ui/form-add-tag'

const AppSidebar = ({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) => {
  const [isTagActive, setIsTagActive] = useState(false)
  return (
    <div
      className={cn(
        'border-r-foreground/20 bg-background @container/sidebar relative flex h-screen flex-col border-r',
        className
      )}
      {...props}
    >
      <SidebarHeader className="" />
      <SidebarContent className="anime max-h-[75%] @max-[10rem]/sidebar:hidden" />
      {isTagActive && (
        <div
          onClick={() => setIsTagActive(false)}
          className="bg-foreground/35 fixed inset-0"
        />
      )}
      <FormAddTag className={animate(isTagActive)} />
      <Button
        onClick={() => setIsTagActive((p) => !p)}
        variant={'outline'}
        className="anime mx-2 mt-6 @max-[10rem]/sidebar:hidden"
      >
        <Plus />
        Add Tag
      </Button>
      <SidebarFooter className="mt-auto" />
    </div>
  )
}

export default AppSidebar
