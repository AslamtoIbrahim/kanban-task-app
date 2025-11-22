import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useParams } from 'react-router-dom'
import LargeStatusContainer from './large-status-container'
import MobileStatusContainer from './mobile-status-container'

function Main({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const { tagId } = useParams()

  return (
    <div
      className={cn('@container/main relative h-full', className)}
      {...props}
    >
      <div className="hidden @min-[10rem]/main:block">
        <MobileStatusContainer tagId={tagId} />
        <LargeStatusContainer tagId={tagId} />
      </div>
    </div>
  )
}

export default Main
