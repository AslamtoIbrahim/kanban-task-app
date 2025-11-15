import { cn } from '@/shared/lib/utils'
import type React from 'react'
import SidebarContent from './sidebar-content'
import SidebarFooter from './sidebar-footer'
import SidebarHeader from './sidebar-header'

const AppSidebar = ({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) => {
  return (
    <div
      className={cn(
        'h-screen border-r border-r-foreground/20 @container/sidebar flex flex-col justify-between relative',
        className
      )}
      {...props}
    >
      <SidebarHeader className="" />
      <SidebarContent className="@max-[10rem]/sidebar:hidden anime max-h-[75%]" />
      <SidebarFooter className="" />

    </div>
  )
}

export default AppSidebar
