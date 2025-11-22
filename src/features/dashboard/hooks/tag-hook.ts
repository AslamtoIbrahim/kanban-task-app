import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createNewTag,
  deleteTag,
  getAllTags,
  updateTag,
} from '../api/tag.service'

export const useCreateTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['tag'],
    mutationFn: createNewTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}

export const useGetAllTags = () => {
  return useInfiniteQuery({
    queryKey: ['tags'],
    queryFn: getAllTags,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useUpdateTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['tag'],
    mutationFn: updateTag,
    onSuccess: (res) => {
      console.log('onSuccess: ', res)
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
      queryClient.invalidateQueries({ queryKey: ['tag', res.title] })
    },
  })
}

export const useDeleteTag = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['tag'],
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}
