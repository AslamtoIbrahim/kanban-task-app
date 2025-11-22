import z from 'zod'
import { checkStatus } from '../api/status.service'
import { checkTag } from '../api/tag.service'

export const SubtaskSchema = z.object({
  _tempId: z.string().optional(),
  id: z.string().optional(),
  title: z.string(),
  isDone: z.boolean(),
  taskId: z.string().optional(),
})

export const StatusSchema = z.object({
  _tempId: z.string().optional(),
  id: z.string().optional(),
  title: z.string(),
  color: z.string(),
  position: z.number(),
  tagId: z.string().optional(),
})

export const StatusDialogSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().nonempty('Status name required'),
    color: z.string(),
    position: z.number(),
    tagId: z.string(),
  })
  .superRefine(async (data, ctx) => {
    console.log('superRefine: ', data)
    // you add api here
    // const exist = statuses.find((s) => s.title === data.title)
    const { exist, id } = await checkStatus(data.title, data.tagId)
    if (data.id !== id) {
      if (exist) {
        ctx.addIssue({
          code: 'custom',
          message: 'This status is already exist',
          path: ['title'],
        })
      }
    }
  })

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(40, 'Title is too long'),
  description: z.string().optional(),
  position: z.number().optional(),
  currentStatus: z.string(),
  statusId: z.string().optional(),
  subtasks: z.array(SubtaskSchema),
})

export const TaskDialogSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required').max(40, 'Title is too long'),
    description: z.string().optional(),
    position: z.number(),
    currentStatus: z.string().nonempty('Status is required'),
    statusId: z.string(),
    subtasks: z.array(SubtaskSchema),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>()
    data.subtasks.forEach((s, i) => {
      if (seen.has(s.title)) {
        ctx.addIssue({
          code: 'custom',
          message: 'this subtask is already exist',
          path: ['subtasks', i, 'title'],
        })
      } else {
        seen.add(s.title)
      }
    })
  })

export const TagDialogSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().nonempty('Tag name is required'),
    statuses: z.array(StatusSchema),
  })
  .superRefine(async (data, ctx) => {
    // console.log('superRefine: ', data)
    const { exist, id } = await checkTag(data.title)
    // console.log('check: ', exist, id, data.id)
    if (data.id !== id) {
      if (exist) {
        ctx.addIssue({
          code: 'custom',
          message: 'This tage is already exist',
          path: ['title'],
        })
      }
    }

    const list = new Set<string>()
    data.statuses.forEach((s, i) => {
      if (list.has(s.title)) {
        ctx.addIssue({
          code: 'custom',
          message: 'This status is already exist',
          path: ['statuses', i, 'title'],
        })
      } else {
        list.add(s.title)
      }
    })
  })

export type Subtask = z.infer<typeof SubtaskSchema>
export type Status = z.infer<typeof StatusSchema>
export type Task = z.infer<typeof TaskSchema>
export type DialogTask = z.infer<typeof TaskDialogSchema>
export type DialogTag = z.infer<typeof TagDialogSchema>
export type DialogStatus = z.infer<typeof StatusDialogSchema>

export type Tag = {
  id: string
  title: string
  statuses: Statuses[]
}

export type AxiosTag = {
  tags: Tag[]
  nextCursor: string | null
}

export type CreateStatus = {
  title: string
  color: string
  position: number
}

export type Statuses = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  color: string
  position: number
  tagId: string
}

export type AxiosStatuses = {
  statuses: Statuses[]
  nextCursor: string | null
}

export type Tasks = {
  id: string
  title: string
  position: number
  createdAt?: Date
  updatedAt?: Date
  description?: string
  currentStatus: string
  statusId: string
  subtasks: Subtasks[]
}


export type AxiosTasks = {
  tasks: Tasks[]
  nextCursor: string | null
}

export type Subtasks = {
  id: string
  title: string
  createdAt?: Date
  updatedAt?: Date
  isDone: boolean
  taskId: string
}
