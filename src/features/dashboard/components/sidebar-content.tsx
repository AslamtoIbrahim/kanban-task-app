import Dialog from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/spinner'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { useDeleteTag, useGetAllTags } from '../hooks/tag-hook'
import type { Tag } from '../utils/types'
import DeleteDialog from './delete-dialog'
import FormAddTag from './ui/form-add-tag'
import TagItem from './ui/tag-item'
import { useNavigate } from 'react-router-dom'
function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const { data, error, status, fetchNextPage, hasNextPage } = useGetAllTags()
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag>()
  const [selectedId, setSelectedId] = useState<string>()
  const deleteTag = useDeleteTag()
  const navigate = useNavigate()
  const onChangeHandler = (inView: boolean) => {
    if (inView) {
      fetchNextPage()
    }
  }

  const handleSelectUpdatedTag = (tag: Tag) => {
    console.log('tag: ', tag)
    if (tag) {
      setOpenUpdateDialog(true)
      setSelectedTag(tag)
    }
  }

  const handleSelectDeletedTag = (id: string) => {
    if (id) {
      setOpenDeleteDialog(true)
      setSelectedId(id)
    }
  }

  const handleDeleteItem = () => {
    if (selectedId) {
      deleteTag.mutate(selectedId, {
        onSuccess: () => {
          toast.success('Tag deleted!', { autoClose: 500 })
          setOpenDeleteDialog(false)
          navigate('/')
        },
        onError: (error) => {
          console.log('error: ', error.message)
          toast.error(error.message)
        },
      })
    }
  }

  if (error) {
    return null
  }

  if (status === 'pending') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-4',
          className
        )}
        {...props}
      >
        <Spinner />
      </div>
    )
  }

  return (
    <div className={cn('space-y-4 py-4', className)} {...props}>
      <h2 className="font-roboto px-4 text-[12px]">All tags</h2>

      {data && (
        <section className="h-full space-y-2 overflow-y-auto">
          {data?.pages?.map((p) =>
            p.tags.map((t) => (
              <TagItem
                selectDeletedTag={handleSelectDeletedTag}
                selectUpdatedTag={handleSelectUpdatedTag}
                key={t.id}
                tag={t}
              />
            ))
          )}
          {hasNextPage && (
            <InView
              className="flex w-full justify-center"
              onChange={onChangeHandler}
            >
              <Spinner />
            </InView>
          )}
        </section>
      )}

      <Dialog
        open={openUpdateDialog}
        closeDialog={() => setOpenUpdateDialog(false)}
      >
        <FormAddTag
          onCloseClik={() => setOpenUpdateDialog(false)}
          tag={selectedTag}
        />
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
      >
        <DeleteDialog
          title="tag"
          deleteItem={handleDeleteItem}
          cancelClick={() => setOpenDeleteDialog(false)}
        />
      </Dialog>
    </div>
  )
}

export default SidebarContent
