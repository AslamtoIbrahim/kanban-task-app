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
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { BsCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import uniqolor from 'uniqolor'
import { useCreateTag, useUpdateTag } from '../../hooks/tag-hook'
import { TagDialogSchema, type DialogTag, type Tag } from '../../utils/types'
import { Spinner } from '@/shared/components/ui/spinner'

function FormAddTag({
  tag,
  onCloseClik,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  tag?: Tag
  className?: string
  onCloseClik?: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const useAddTag = useCreateTag()
  const updateTag = useUpdateTag()
  const form = useForm({
    resolver: zodResolver(TagDialogSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      statuses: [
        {
          _tempId: crypto.randomUUID(),
          title: 'Todo',
          color: uniqolor('Todo').color,
          position: 0,
        },
        {
          _tempId: crypto.randomUUID(),
          title: 'Done',
          color: uniqolor('Done').color,
          position: 1,
        },
      ],
    },
  })

  useEffect(() => {
    if (!tag) {
      return
    }

    form.reset({
      id: tag.id,
      title: tag.title,
      statuses: tag.statuses,
    })
  }, [tag, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'statuses',
  })

  const onSubmit = (data: DialogTag) => {
    setIsLoading(true)
    // console.log('🧧 tag: ', data)
    if (tag?.id) {
      updateTag.mutate(
        {
          id: tag.id,
          title: data.title,
          statuses: data.statuses
            .filter((f) => f.title.trim() !== '')
            .map((s) => ({
              id: s.id,
              title: s.title,
              color: s.color,
              position: s.position,
            })),
        },
        {
          onSuccess: () => {
            toast.success('Tag updated!', { autoClose: 500 })
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
      useAddTag.mutate(
        {
          title: data.title,
          statuses: data.statuses
            .filter((f) => f.title.trim() !== '')
            .map((s) => ({
              title: s.title,
              color: s.color,
              position: s.position,
            })),
        },
        {
          onSuccess: (res) => {
            console.log('✔😁 res: ', res)
            toast.success('Tag created!')
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
    <Card className={cn('w-70 md:max-w-82', className)} {...props}>
      <CardHeader>
        <CardTitle>{tag ? 'Update' : 'Create'} a tag</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="title">Tag name</FieldLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="text-sm"
                      placeholder="Web design"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FieldLabel htmlFor="subtasks">Statues</FieldLabel>
            <div className="max-h-48 space-y-4 overflow-auto">
              {fields.map((sb, i) => (
                <FormField
                  key={sb._tempId}
                  control={form.control}
                  name={`statuses.${i}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-x-1">
                        <BsCircleFill
                          style={{ color: sb.color }}
                          className="size-4 flex-none shrink-0"
                        />
                        <FormControl>
                          <Input
                            disabled={isLoading}
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
              disabled={isLoading}
              type="button"
              onClick={() =>
                append({
                  _tempId: crypto.randomUUID(),
                  title: '',
                  color: uniqolor(crypto.randomUUID()).color,
                  position: fields.length,
                })
              }
              className="bg-foreground text-background my-3 w-full"
            >
              <Plus className="size-4" />
              Add Status
            </Button>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Spinner />}
                  {tag ? 'Update' : 'Create'} Tag
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddTag
