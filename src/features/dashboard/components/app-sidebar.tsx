import { Button } from '@/shared/components/ui/button'
import { animate, cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import SidebarContent from './sidebar-content'
import SidebarFooter from './sidebar-footer'
import SidebarHeader from './sidebar-header'
import FormAddTag from './ui/form-add-tag'
import Dialog from '@/shared/components/ui/dialog'

const AppSidebar = ({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) => {
  const [isTagOpen, setIsTagOpen] = useState(false)
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
      <Dialog open={isTagOpen} closeDialog={() => setIsTagOpen(false)}>
        <FormAddTag
          onCloseClik={() => setIsTagOpen(false)}
          className={animate(isTagOpen)}
        />
      </Dialog>
      <Button
        onClick={() => setIsTagOpen((p) => !p)}
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
