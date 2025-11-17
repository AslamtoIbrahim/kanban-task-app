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
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TagDialogSchema, type DialogTag } from '../../utils/types'
import { BsCircleFill } from 'react-icons/bs'
import uniqolor from 'uniqolor';


function FormAddTag({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const form = useForm({
    resolver: zodResolver(TagDialogSchema),
    defaultValues: {
      title: '',
      statuses: [
        { id: crypto.randomUUID(), title: 'Todo', color:  uniqolor('Todo').color},
        { id: crypto.randomUUID(), title: 'Doing', color: '#075985' },
      ],
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'statuses',
  })

  const onSubmit = async (data: DialogTag) => {
    console.log('🧧 tag: ', data)
    console.log('🥎 unique: ', data.statuses.filter(s => s.title.trim() !== ""))
  }
  return (
    <Card
      className={cn(
        'fixed top-[50%] left-[50%] h-fit w-70 md:w-auto  -translate-[50%]',
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>Create a tag</CardTitle>
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
                  key={sb.id}
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
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  title: '',
                  color: uniqolor(crypto.randomUUID()).color,
                })
              }
              className="bg-foreground w-full"
            >
              <Plus className="size-4" />
              Add Status
            </Button>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Tag</Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormAddTag
