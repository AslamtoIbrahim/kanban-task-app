import { Sidebar } from "lucide-react"

function SideBarButton({
  className,
  ...props
}: React.ComponentProps<"button"> & { className?: string }) {
  return (
    <button className={className} {...props}>
      <Sidebar className="p-1 hover:bg-foreground/10 hover:rounded" />
    </button>
  )
}

export default SideBarButton
