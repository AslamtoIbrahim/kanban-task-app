import Dialog from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/spinner'
import { animate, cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { useDeleteTask, useGetAllTasks } from '../hooks/task-hook'
import type { Statuses, Tasks } from '../utils/types'
import DeleteDialog from './delete-dialog'
import FormAddTask from './form-add-task'
import ButtonAddTask from './ui/button-add-task'
import TaskItem from './ui/task-item'

type MobileTasksContainerProp = React.ComponentProps<'div'> & {
  status: Statuses
  className?: string
  statuses: Statuses[]
}
function MobileTasksContainer({
  className,
  status,
  statuses,
  ...props
}: MobileTasksContainerProp) {
  const { data, error, isPending, fetchNextPage, hasNextPage } = useGetAllTasks(
    status.id
  )
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState<Tasks | null>(null)
  const [deletedTaskId, setDeletedTaskId] = useState<string | null>(null)
  const deleteTask = useDeleteTask()

  const showTaskDialog = () => {
    setEditedTask(null)
    setIsTaskDialogOpen((pr) => !pr)
  }

  const handleOnUpdateTask = (task: Tasks) => {
    setEditedTask(task)
    setIsTaskDialogOpen((pr) => !pr)
  }

  const handleOnDeleteTask = (id: string) => {
    setDeletedTaskId(id)
    setIsDeleteDialogOpen((pr) => !pr)
  }

  const handleCloseFormTaskDialog = () => {
    setIsTaskDialogOpen(false)
    setEditedTask(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setDeletedTaskId(null)
  }

  const handleOnchangeView = (inView: boolean) => {
    if (inView) {
      fetchNextPage()
    }
  }
  const handleDeleteTaskItem = () => {
    if (deletedTaskId) {
      deleteTask.mutate(deletedTaskId, {
        onSuccess: () => {
          toast.success('task deleted!', { autoClose: 1000 })
          setIsDeleteDialogOpen(false)
          setDeletedTaskId(null)
        },
        onError: (error) => {
          console.error({ error: error })
          toast.error('Something went wrong!', { autoClose: 1000 })
        },
      })
    }
  }

  if (error) {
    return null
  }

  if (isPending) {
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center py-2">
        <Spinner />
      </div>
    )
  }
  const tasks = data.pages.flatMap((p) => p.tasks?.map((t) => t) ?? [])
  return (
    <div
      className={cn(
        '2xm:px-6 h-[calc(100vh-5rem)] space-y-3 overflow-auto p-4 md:hidden',
        className
      )}
      {...props}
    >
      {tasks.map((t, i) => (
        <TaskItem
          onDeleteTask={handleOnDeleteTask}
          onUpdateTask={handleOnUpdateTask}
          task={t}
          key={i}
        />
      ))}
      {hasNextPage && (
        <InView className="flex justify-center" onChange={handleOnchangeView}>
          <Spinner />
        </InView>
      )}

      <ButtonAddTask className="z-50" onClick={showTaskDialog} />
      <Dialog open={isTaskDialogOpen} closeDialog={handleCloseFormTaskDialog}>
        <FormAddTask
          task={editedTask ?? undefined}
          onCloseClik={handleCloseFormTaskDialog}
          statuses={statuses}
          status={status}
          position={tasks.length}
          className={cn('', animate(isTaskDialogOpen))}
        />
      </Dialog>

      <Dialog open={isDeleteDialogOpen} closeDialog={handleCloseDeleteDialog}>
        <DeleteDialog
          title="task"
          cancelClick={handleCloseDeleteDialog}
          deleteItem={handleDeleteTaskItem}
        />
      </Dialog>
    </div>
  )
}

export default MobileTasksContainer
