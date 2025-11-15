import { cn } from '@/shared/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'

function ButtomTheme({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  const onDarkModeClick = () => {
    setIsDark((pv) => !pv)
  }
  return (
    <div
      className={cn(
        'm-1 flex w-[calc(100%-1rem)] items-center justify-between p-1',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <section>
          <Sun
            className={`text-foreground/50 absolute size-4 transition-all duration-200 ease-in-out ${isDark ? 'invisible opacity-0' : 'visible opacity-100'}`}
          />
          <Moon
            className={`text-foreground/50 size-4 transition-all duration-200 ease-in-out ${!isDark ? 'invisible opacity-0' : 'visible opacity-100'}`}
          />
        </section>
        <p className="text-sm capitalize">dark mode</p>
      </div>
      <section
        onClick={onDarkModeClick}
        className="bg-foreground/50 w-10 rounded p-1"
      >
        <div
          className={`bg-popover size-3 rounded-2xl transition-all duration-300 ease-in-out ${isDark ? 'translate-x-0' : 'translate-x-5'}`}
        />
      </section>
    </div>
  )
}

export default ButtomTheme
