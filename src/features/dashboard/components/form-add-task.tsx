import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/auth/components/ui/card'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/features/auth/components/ui/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/features/auth/components/ui/Form'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/texstarea'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCreateTask, useUpdateTasks } from '../hooks/task-hook'
import {
  TaskDialogSchema,
  type DialogTask,
  type Statuses,
  type Tasks,
} from '../utils/types'
import { SelectStatus } from './ui/select-status'
import { Spinner } from '@/shared/components/ui/spinner'

type FormAddTaskProp = React.ComponentProps<'div'> & {
  className?: string
  status: Statuses
  position: number
  statuses: Statuses[]
  onCloseClik?: () => void
  task?: Tasks
}

function FormAddTask({
  task,
  className,
  status,
  position,
  statuses,
  onCloseClik,
  ...props
}: FormAddTaskProp) {
  const [isLoading, setIsLoading] = useState(false)
  const addTask = useCreateTask()
  const updateTask = useUpdateTasks()

  const form = useForm({
    resolver: zodResolver(TaskDialogSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (task) {
      console.log('status.title', status.title)
      console.log('task.currentStatus', task?.currentStatus)
      console.log('status.id', status.id)
      // reset for update task
      form.reset({
        id: task.id,
        title: task.title,
        position: position,
        statusId: status.id,
        description: task.description,
        currentStatus: task?.currentStatus,
        subtasks: task.subtasks,
      })
    } else {
      // reset for add task
      form.reset({
        title: '',
        description: '',
        statusId: status.id,
        position: position,
        currentStatus: status.title,
        subtasks: [
          { _tempId: crypto.randomUUID(), title: 'Make coffee', isDone: true },
          { _tempId: crypto.randomUUID(), title: 'Take break', isDone: false },
        ],
      })
    }
  }, [task, form, status])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  })

  const onSubmit = async (data: DialogTask) => {
    setIsLoading(true)
    if (task?.id) {
      updateTask.mutate(
        {
          id: task.id,
          updateTask: {
            title: data.title,
            description: data.description,
            position: data.position,
            currentStatus: data.currentStatus,
            statusId: data.statusId,
            subtasks: data.subtasks
              .filter((f) => f.title.trim() !== '')
              .map((s) => ({
                id: s.id,
                title: s.title,
                isDone: s.isDone,
              })),
          },
        },
        {
          onSuccess: () => {
            toast.success('Task updated!', { autoClose: 500 })
            form.reset()
            onCloseClik?.()
            setIsLoading(false)
          },
          onError: (error) => {
            console.log('error: ', error.message)
            toast.error(error.message)
          },
        }
      )
    } else {
      addTask.mutate(
        {
          title: data.title,
          description: data.description,
          position: data.position,
          currentStatus: data.currentStatus,
          statusId: data.statusId,
          subtasks: data.subtasks
            .filter((f) => f.title.trim() !== '')
            .map((s) => ({
              id: s.id,
              title: s.title,
              isDone: s.isDone,
            })),
        },
        {
          onSuccess: () => {
            toast.success('Task created!', { autoClose: 500 })
            form.reset()
            onCloseClik?.()
            setIsLoading(false)
          },
          onError: (error) => {
            console.log('error: ', error.message)
            toast.error(error.message)
          },
        }
      )
    }
  }

  return (
    <Card
      className={cn(
        'fixed top-[50%] left-[50%] h-fit w-70 -translate-[50%]',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>{!task?.id ? 'Create' : 'Update'} a task</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="text-sm"
                      placeholder="Take coffee break"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Description</FieldLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="h-22 text-sm"
                      placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FieldLabel htmlFor="subtasks">Subtasks</FieldLabel>
            <div className="max-h-48 space-y-4 overflow-auto">
              {fields.map((sb, i) => (
                <div key={sb.id} className="flex items-center gap-x-1">
                  {/* Title input field */}
                  <FormField
                    key={sb.id}
                    control={form.control}
                    name={`subtasks.${i}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className={`text-sm ${form.watch(`subtasks.${i}.isDone`) && 'line-through'}`}
                            placeholder="Make coffee"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Checkbox field */}
                  <FormField
                    name={`subtasks.${i}.isDone`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Checkbox
                          disabled={isLoading}
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          className="shrink-0"
                          checked={!!field.value}
                        />
                      </FormItem>
                    )}
                  />
                  <X
                    onClick={() => remove(i)}
                    className="text-foreground/50 shrink-0"
                  />
                </div>
              ))}
            </div>

            <Button
              disabled={isLoading}
              type="button"
              onClick={() =>
                append({
                  _tempId: crypto.randomUUID(),
                  title: '',
                  isDone: false,
                })
              }
              className="bg-background text-foreground w-full"
            >
              <Plus className="size-4" />
              Add Subtask
            </Button>

            <FormField
              control={form.control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="currentStatus">Statuses</FieldLabel>
                  <FormControl>
                    <SelectStatus
                      value={field.value}
                      statuses={statuses}
                      selectStatus={(s) => {
                        field.onChange(s.title)
                        if (s.id) form.setValue('statusId', s.id)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Spinner />}
                  {!task?.id ? 'Create' : 'Update'} Task
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddTask
