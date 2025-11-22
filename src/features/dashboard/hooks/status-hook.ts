import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createNewStatus,
  deleteStatus,
  getAllStatus,
  updateStatus,
} from '../api/status.service'

export const useCreateStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['status'],
    mutationFn: createNewStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}

export const useGetAllStatuses = (tagId: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ['statuses', tagId] as [string, string],
    queryFn: getAllStatus,
    enabled: !!tagId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useUpdateStatuses = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['status'],
    mutationFn: updateStatus,
    onSuccess: (res) => {
      console.log('onSuccess: ', res)
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
      queryClient.invalidateQueries({ queryKey: ['status', res.title] })
    },
  })
}

export const useDeleteStatuses = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['status'],
    mutationFn: deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}
