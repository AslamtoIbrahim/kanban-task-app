import { BASE_API_URL } from '@/shared/lib/utils'
import axios from 'axios'
import type { AxiosTasks, DialogTask, Task } from '../utils/types'

export const createNewTask = async (task: DialogTask) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/task`, task, {
      withCredentials: true,
    })

    console.log('createNewTask 💎',res.data)

    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const checkTask = async (title: string, statusId: string) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/task/check`, {
      params: {
        title,
        statusId,
      },
      withCredentials: true,
    })
    return { exist: res.data.exist, id: res.data.id }
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const getAllTasks = async ({
  pageParam,
  queryKey,
}: {
  pageParam: string | null
  queryKey: [string, string]
}) => {
  try {
    const [_, statusId] = queryKey
    const res = await axios.get<AxiosTasks>(`${BASE_API_URL}/task`, {
      params: {
        statusId,
        cursor: pageParam,
        limit: 12,
      },
      withCredentials: true,
    })

    // console.log('🥤 getAllTasks: ', res.data)
    return res.data
  } catch (error) {
    console.log('🔴 error: ', error)
    throw error
  }
}

export const updateTask = async ({
  id,
  updateTask,
}: {
  id: string
  updateTask: Task
}) => {
  try {
    const res = await axios.patch(
      `${BASE_API_URL}/task/${id}`,
      updateTask,
      {
        withCredentials: true,
      }
    )
    console.log('updateTask 😍: ', res.data)
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/task/${id}`, {
      withCredentials: true,
    })
    console.log('deleteTask : ', res.data)
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}
