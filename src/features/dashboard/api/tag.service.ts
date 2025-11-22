import { BASE_API_URL } from '@/shared/lib/utils'
import axios from 'axios'
import type { AxiosTag, CreateStatus, Status } from '../utils/types'

export const createNewTag = async ({
  title,
  statuses,
}: {
  title: string
  statuses: CreateStatus[]
}) => {
  try {
    const res = await axios.post(
      `${BASE_API_URL}/tag`,
      { title, statuses },
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

export const checkTag = async (title: string) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/tag/check`, {
      params: {
        title,
      },
      withCredentials: true,
    })
    return { exist: res.data.exist, id: res.data.id }
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const getAllTags = async ({
  pageParam,
}: {
  pageParam: string | null
}) => {
  try {
    const res = await axios.get<AxiosTag>(`${BASE_API_URL}/tag`, {
      params: {
        cursor: pageParam,
        limit: 16,
      },
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const updateTag = async ({
  id,
  title,
  statuses,
}: {
  id: string
  title: string
  statuses: Status[]
}) => {
  try {
    const res = await axios.patch(
      `${BASE_API_URL}/tag/${id}`,
      { title, statuses },
      {
        withCredentials: true,
      }
    )
    console.log('update 😍: ', res.data)
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}

export const deleteTag = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/tag/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    console.log('error: ', error)
    throw error
  }
}
