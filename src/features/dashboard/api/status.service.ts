import { BASE_API_URL } from '@/shared/lib/utils'
import axios from 'axios'
import type { AxiosStatuses, DialogStatus } from '../utils/types'

export const createNewStatus = async (status: DialogStatus) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/status`, status, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const checkStatus = async (title: string, tagId: string) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/status/check`, {
      params: {
        title,
        tagId,
      },
      withCredentials: true,
    })
    return { exist: res.data.exist, id: res.data.id }
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const getAllStatus = async ({
  pageParam,
  queryKey,
}: {
  pageParam: string | null
  queryKey: [string, string]
}) => {
  try {
    const [_, tagId] = queryKey
    const res = await axios.get<AxiosStatuses>(`${BASE_API_URL}/status`, {
      params: {
        tagId,
        cursor: pageParam,
        limit: 6,
      },
      withCredentials: true,
    })

    return res.data
  } catch (error) {
    console.log('🔴 error: ', error)
    throw error
  }
}

export const updateStatus = async ({
  id,
  title,
}: {
  id: string
  title: string
}) => {
  try {
    const res = await axios.patch(
      `${BASE_API_URL}/status/${id}`,
      { title },
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const deleteStatus = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/status/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}
