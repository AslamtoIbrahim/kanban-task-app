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
import React from 'react'
import { useForm } from 'react-hook-form'
import { StatusDialogSchema, type DialogStatus } from '../utils/types'

function FormAddStatus({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const form = useForm({
    resolver: zodResolver(StatusDialogSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      title: '',
      color: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: DialogStatus) => {
    console.log('🧧 tag: ', data)
  }
  return (
    <Card
      className={cn(
        'fixed top-[50%] left-[50%] h-fit w-70 -translate-[50%] ',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>Create a status</CardTitle>
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
                <Button type="submit">Create Status</Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddStatus
