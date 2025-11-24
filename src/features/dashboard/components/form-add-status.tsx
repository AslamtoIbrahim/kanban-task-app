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
import { Spinner } from '@/shared/components/ui/spinner'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import uniqolor from 'uniqolor'
import { useCreateStatus, useUpdateStatuses } from '../hooks/status-hook'
import {
  StatusDialogSchema,
  type DialogStatus,
  type Statuses,
} from '../utils/types'

type FormAddStatusProp = React.ComponentProps<'div'> & {
  className?: string
  tagId?: string
  onCloseClik?: () => void
  position: number
  status?: Statuses
}
function FormAddStatus({
  status,
  tagId,
  className,
  onCloseClik,
  position,
  ...props
}: FormAddStatusProp) {
  const [isLoading, setIsLoading] = useState(false)

  const useAddStatus = useCreateStatus()
  const useUpdateStatus = useUpdateStatuses()

  const form = useForm({
    resolver: zodResolver(StatusDialogSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      tagId: tagId,
      title: '',
      color: '',
      position: position,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (status) {
      form.reset({
        id: status.id,
        tagId: status.tagId,
        title: status.title,
        color: status.color,
        position: status.position,
      })
    }
  }, [form, status])

  const onSubmit = async (data: DialogStatus) => {
    // console.log('🧧 onSubmit status: ', data)
    setIsLoading(true)
    if (!data) return

    if (status?.id) {
      useUpdateStatus.mutate(
        { id: status.id, title: data.title },
        {
          onSuccess: () => {
            toast.success('Status updated!', { autoClose: 500 })
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
      useAddStatus.mutate(
        {
          title: data.title,
          color: uniqolor(data.title).color,
          position: position,
          tagId: data.tagId,
        },
        {
          onSuccess: () => {
            toast.success('Status added!', { autoClose: 500 })
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
        <CardTitle>{status?.id ? 'Update' : 'Create'} a status</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="title">Status name</FieldLabel>
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
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Spinner />}
                  {status?.id ? 'Update' : 'Create'} Status
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddStatus
