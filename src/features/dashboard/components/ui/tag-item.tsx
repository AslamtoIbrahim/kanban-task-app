import { animate, cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import type { Tag } from '../../utils/types'
import UDPopoup from './ud-popup'
import { NavLink } from 'react-router-dom'

type TagItemProps = React.ComponentProps<'a'> & {
  className?: string
  selectUpdatedTag: (tag: Tag) => void
  selectDeletedTag: (id: string) => void
  tag: Tag
}
function TagItem({
  tag,
  className,
  selectUpdatedTag,
  selectDeletedTag,
  ...props
}: TagItemProps) {
  const [popup, setPopup] = useState(false)

  const handleUpdateTag = () => {
    setPopup(false)
    selectUpdatedTag(tag)
  }

  const hanleDeleteTag = () => {
    setPopup(false)
    selectDeletedTag(tag.id)
  }

  return (
    <NavLink
      to={`tag/${tag.id}`}
      state={{ title: tag.title }}
      className={({ isActive }) => {
        return cn(
          `hover:bg-foreground/5 anime relative mx-3 flex cursor-default items-center justify-between px-1 py-1 hover:rounded ${isActive && 'bg-foreground/5'}`,
          className
        )
      }}
      {...props}
    >
      <p className="font-nunito truncate text-[12px] capitalize md:text-sm">
        {tag.title}
      </p>
      <BsThreeDotsVertical
        onClick={() => setPopup((p) => !p)}
        className="zoom text-sm"
      />
      {popup && (
        <div onClick={() => setPopup(false)} className="fixed inset-0 z-50" />
      )}
      <UDPopoup
        deleteTag={hanleDeleteTag}
        updateTag={handleUpdateTag}
        className={cn('z-50', animate(popup))}
      />
    </NavLink>
  )
}

export default TagItem
