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
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/teastarea'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  statuses,
  TaskDialogSchema,
  type DialogTask
} from '../utils/types'
import { SelectStatus } from './ui/select-status'

function FormAddTask({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const form = useForm({
    resolver: zodResolver(TaskDialogSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      title: '',
      // description: '',
      subtasks: [{ id: crypto.randomUUID(), title: '' }],
      currentStatus: statuses[0].title,
    },
    mode: 'onChange',
  })

  // const subs = useWatch({ control: form.control, name: 'subtasks' }) || []

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
  })

  const onSubmit = async (data: DialogTask) => {
    console.log('🟡 data: ', data)
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
        <CardTitle>Create a task</CardTitle>
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
                <FormField
                  key={sb.id}
                  control={form.control}
                  name={`subtasks.${i}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-x-1">
                        <FormControl>
                          <Input
                            className="text-sm"
                            placeholder="Make coffee"
                            {...field}
                          />
                        </FormControl>
                        <X
                          onClick={() => remove(i)}
                          className="text-foreground/50 shrink-0"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button
              onClick={() => append({ id: crypto.randomUUID(), title: '' })}
              className="bg-foreground w-full"
            >
              <Plus className="size-4" />
              Add Subtask
            </Button>

            <FormField
              control={form.control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="subtasks">Statuses</FieldLabel>
                  <FormControl>
                    <SelectStatus
                      statuses={statuses}
                      selectStatus={(s) => field.onChange(s.title)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FieldGroup>
              <Field>
                <Button type="submit">Create Task</Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddTask
