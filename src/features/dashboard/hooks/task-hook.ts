import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '../api/task.service'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['task'],
    mutationFn: createNewTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useGetAllTasks = (statusId: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ['tasks', statusId] as [string, string],
    queryFn: getAllTasks,
    enabled: !!statusId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}

export const useUpdateTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['task'],
    mutationFn: updateTask,
    onSuccess: (res) => {
      console.log('onSuccess: ', res)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', res.title] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['task'],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
