import Dialog from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/spinner'
import { animate, cn } from '@/shared/lib/utils'
import { Edit, PlusCircle, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BsCircleFill } from 'react-icons/bs'
import { InView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { useDeleteStatuses } from '../hooks/status-hook'
import {
  useDeleteTask,
  useGetAllTasks,
  useUpdateTasks,
} from '../hooks/task-hook'
import type { Statuses, Tasks } from '../utils/types'
import DeleteDialog from './delete-dialog'
import FormAddStatus from './form-add-status'
import FormAddTask from './form-add-task'
import TaskItem from './ui/task-item'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type StatusContainerProp = React.ComponentProps<'div'> & {
  className?: string
  status: Statuses
  tagId?: string
  statuses: Statuses[]
}
function StatusContainer({
  className,
  status,
  tagId,
  statuses,
  ...props
}: StatusContainerProp) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const useDeleteStatus = useDeleteStatuses()
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState<Tasks | null>(null)
  const [deletedTaskId, setDeletedTaskId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const deleteTask = useDeleteTask()
  const [localTasks, setLocalTasks] = useState<Tasks[]>([])
  const updateTaskMutation = useUpdateTasks()

  const { data, error, isPending, fetchNextPage, hasNextPage } = useGetAllTasks(
    status.id
  )

  useEffect(() => {
    if (data) {
      const tasks = data.pages.flatMap((p) => p.tasks?.map((t) => t) ?? [])
      if (tasks) setLocalTasks(tasks)
    }
  }, [data])

  const showTaskDialog = () => {
    setEditedTask(null)
    setIsTaskDialogOpen((pr) => !pr)
  }

  const handleDeleteItem = () => {
    if (status) {
      useDeleteStatus.mutate(status.id, {
        onSuccess: () => {
          toast.success('Status deleted!', { autoClose: 500 })
          setOpenDeleteDialog(false)
        },
        onError: (error) => {
          console.log('error: ', error.message)
          toast.error(error.message)
        },
      })
    }
  }

  const handleOnUpdateTask = (task: Tasks) => {
    setEditedTask(task)
    setIsTaskDialogOpen((pr) => !pr)
  }

  const handleOncloseClick = () => {
    setIsTaskDialogOpen(false)
    setEditedTask(null)
  }

  const handleOnchangeView = (inView: boolean) => {
    if (inView) {
      fetchNextPage()
    }
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setDeletedTaskId(null)
  }

  const handleOnDeleteTask = (id: string) => {
    console.log('id', id)
    setDeletedTaskId(id)
    setIsDeleteDialogOpen((pr) => !pr)
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = localTasks.findIndex((t) => t.id === active.id)
    const newIndex = localTasks.findIndex((t) => t.id === over.id)

    const newOrder = [...localTasks]
    const [moved] = newOrder.splice(oldIndex, 1)
    newOrder.splice(newIndex, 0, moved)

    // update position
    const updated = newOrder.map((t, i) => ({
      ...t,
      position: i,
    }))
    setLocalTasks(updated)

    updated.forEach((t) => {
      updateTaskMutation.mutate(
        { id: t.id, updateTask: t },
        {
          onError(error) {
            console.log('error', error)
          },
        }
      )
    })
  }

  if (error) {
    return null
  }

  if (isPending) {
    return null
  }

  // console.log('status.title: ',status.title);
  const tasks = data.pages.flatMap((p) => p.tasks?.map((t) => t) ?? [])

  return (
    <div
      className={cn('hidden space-y-2 p-2 md:block md:w-50', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <BsCircleFill style={{ color: status.color }} />
        <p className="w-38 truncate text-start">{status.title}</p>
        <PlusCircle onClick={showTaskDialog} className="zoom icons" />

        <Edit
          onClick={() => setOpenUpdateDialog((p) => !p)}
          className="zoom icons"
        />
        <Trash
          onClick={() => setOpenDeleteDialog((p) => !p)}
          className="zoom icons"
        />
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={localTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {localTasks.map((t, i) => (
            <TaskItem
              onDeleteTask={handleOnDeleteTask}
              onUpdateTask={handleOnUpdateTask}
              task={t}
              key={i}
            />
          ))}
        </SortableContext>
      </DndContext>

      {tasks && hasNextPage && (
        <InView className="flex justify-center" onChange={handleOnchangeView}>
          <Spinner />
        </InView>
      )}

      <Dialog
        open={openUpdateDialog}
        closeDialog={() => setOpenUpdateDialog(false)}
      >
        {
          <FormAddStatus
            onCloseClik={() => setOpenUpdateDialog(false)}
            status={status}
            tagId={tagId}
            position={status.position}
          />
        }
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
      >
        <DeleteDialog
          title="status"
          deleteItem={handleDeleteItem}
          cancelClick={() => setOpenDeleteDialog(false)}
        />
      </Dialog>

      <Dialog open={isTaskDialogOpen} closeDialog={handleOncloseClick}>
        <FormAddTask
          task={editedTask ?? undefined}
          onCloseClik={handleOncloseClick}
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

export default StatusContainer
