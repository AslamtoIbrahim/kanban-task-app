import z from 'zod'

export const SubtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  // isDone: z.boolean(),
  // taskId: z.string().optional(),
})

export const StatusSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string(),
  // position: z.number().optional(),
  // tagId: z.string().optional(),
})
export const StatusDialogSchema = z
  .object({
    id: z.string(),
    title: z.string().nonempty('Status name required'),
    color: z.string(),
  })
  .superRefine((data, ctx) => {
    // console.log('superRefine: ', data)
    // you add api here
    const exist = statuses.find((s) => s.title === data.title)
    if (exist) {
      ctx.addIssue({
        code: 'custom',
        message: 'This status is already exist',
        path: ['title'],
      })
    }
  })

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(40, 'Title is too long'),
  description: z.string(),
  position: z.number().optional(),
  currentStatus: z.string(),
  statusId: z.string().optional(),
})

export const TaskDialogSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1, 'Title is required').max(40, 'Title is too long'),
    description: z.string().optional(),
    // position: z.number().optional(),
    currentStatus: z.string().nonempty('Status is required'),
    // statusId: z.string().optional(),
    subtasks: z.array(SubtaskSchema),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>()
    data.subtasks.forEach((s, i) => {
      if (seen.has(s.title)) {
        ctx.addIssue({
          code: 'custom',
          message: 'this title is already exist',
          path: ['subtasks', i, 'title'],
        })
      } else {
        seen.add(s.title)
      }
    })
  })

export const TagDialogSchema = z
  .object({
    title: z.string().nonempty('Tag name is required'),
    statuses: z.array(StatusSchema),
  })
  .superRefine((data, ctx) => {
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

export const statuses = [
  { id: 'sffszez', title: 'Todo', color: '#FACC15' }, // أصفر
  { id: 'sffezzjjjtszez', title: 'Doing', color: '#EF4444' }, // أحمر
 
]
