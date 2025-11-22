import Dialog from '@/shared/components/ui/dialog'
import { animate, cn } from '@/shared/lib/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDeleteStatuses, useGetAllStatuses } from '../hooks/status-hook'
import { type Statuses } from '../utils/types'
import DeleteDialog from './delete-dialog'
import FormAddStatus from './form-add-status'
import MobileTasksContainer from './mobile-tasks-container'
import StatusList from './status-list'
import StatusButton from './ui/status-buton'

type NavStatusProp = React.ComponentProps<'div'> & {
  className?: string
  tagId?: string
}

function MobileStatusContainer({ className, tagId, ...props }: NavStatusProp) {
  const [status, setStatus] = useState<Statuses | null>(null)
  const [isStatusActive, setIsStatusActive] = useState(false)
  const [isAddStatusActive, setIsAddStatusActive] = useState(false)
  const { data, error, isPending } = useGetAllStatuses(tagId)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<Statuses>()
  const [selectedId, setSelectedId] = useState<string>()
  const useDeleteStatus = useDeleteStatuses()

  useEffect(() => {
    if(data){
      const status = data.pages.flatMap((p) => p.statuses.map((s) => s) ?? [])[0]
      setStatus(status)
    }
  }, [tagId, data]);

  const onSelectStatusHandler = (status: Statuses) => {
    setStatus(status)
    setIsStatusActive(false)
  }

  const handleDeleteStatus = (id: string) => {
    if (id) {
      setIsDeleteDialogOpen(true)
      setSelectedId(id)
    }
  }

  const handleUpdateStatus = (status: Statuses) => {
    if (status) {
      setIsUpdateDialogOpen(true)
      setSelectedStatus(status)
    }
  }

  const handleDeleteItem = () => {
    if (selectedId) {
      useDeleteStatus.mutate(selectedId, {
        onSuccess: () => {
          toast.success('Status deleted!', { autoClose: 500 })
          setIsDeleteDialogOpen(false)
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

  if (isPending) {
    return null
  }

  const statuses = data.pages.flatMap((p) => p.statuses.map((s) => s) ?? [])
 
  return (
    <div
      className={cn('relative h-[calc(100vh-2.5rem)] md:hidden', className)}
      {...props}
    >
      {isStatusActive && (
        <div
          onClick={() => setIsStatusActive(false)}
          className="fixed inset-0"
        />
      )}
      {status && (
        <StatusButton
          className="px-5 py-2 md:hidden"
          onClick={() => setIsStatusActive((pv) => !pv)}
          status={status}
        />
      )}
      {statuses && statuses?.length > 0 && (
        <StatusList
          onDeleteStatus={handleDeleteStatus}
          onUpdateStatus={handleUpdateStatus}
          addStatusClick={() => setIsAddStatusActive((pv) => !pv)}
          className={cn('', animate(isStatusActive))}
          onSelectStatus={onSelectStatusHandler}
          statuses={statuses}
        />
      )}

      <Dialog
        className="z-50"
        open={isAddStatusActive}
        closeDialog={() => setIsAddStatusActive(false)}
      >
        {statuses && statuses?.length > 0 && (
          <FormAddStatus
            onCloseClik={() => setIsAddStatusActive(false)}
            tagId={tagId}
            className={cn('z-50', animate(isAddStatusActive))}
            position={statuses?.length}
          />
        )}
      </Dialog>

      <Dialog
        className="z-50"
        open={isUpdateDialogOpen}
        closeDialog={() => setIsUpdateDialogOpen(false)}
      >
        {selectedStatus && (
          <FormAddStatus
            onCloseClik={() => setIsUpdateDialogOpen(false)}
            status={selectedStatus}
            tagId={tagId}
            position={selectedStatus.position}
          />
        )}
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        closeDialog={() => setIsDeleteDialogOpen(false)}
      >
        <DeleteDialog
          title="status"
          deleteItem={handleDeleteItem}
          cancelClick={() => setIsDeleteDialogOpen(false)}
        />
      </Dialog>

      {/* Task Container */}
      {statuses && (
        <MobileTasksContainer
          statuses={statuses}
          status={status ?? statuses[0]}
        />
      )}
    </div>
  )
}

export default MobileStatusContainer
