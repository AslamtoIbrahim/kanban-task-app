import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import ButtonIcon from './ui/button-icon'
import SubtaskInput from './ui/subtask-input'
import type { Subtask } from '../utils/types'
import { toast } from 'react-toastify'

function CardSubtask({
  onSubtasksChange,
  subtasks,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  className?: string
  subtasks: Subtask[]
  onSubtasksChange: (subtaks: Subtask[]) => void
}) {
  const [inputs, setInputs] = useState(subtasks)
  const [existMap, setExistMap] = useState<{[id: string]: boolean}>({})
  const onAddInputClick = () => {
    const newSubs = [...inputs, { id: crypto.randomUUID(), title: '' }]
    setInputs(newSubs)
    onSubtasksChange(newSubs)
  }
  const onRemoveInputClickHandler = (id: string) => {
    const flSubs = inputs.filter((n) => n.id !== id)
    setInputs(flSubs)
    onSubtasksChange(flSubs)
  }

  const onChangeSubHandler = (id: string, value: string) => {
    const exist = inputs.some((inp) => inp.title === value)
    
    setExistMap(prev => ({...prev, [id]: exist}))

    if (exist) {
      toast.warn("This title already exists!");
    }
     
    console.log('existmap: ', existMap)
    const updateInputs = inputs.map((inp) =>
      inp.id === id ? { ...inp, title: value } : inp
    )
    setInputs(updateInputs)
    onSubtasksChange(updateInputs)
  }

  
  return (
    <div className={cn('space-y-2', className)} {...props}>
      <Label className="ml-2">Subtasks</Label>

      <div className="max-h-28 space-y-2 overflow-auto">
        {inputs.map((n) => (
          <SubtaskInput
            exist={existMap}
            onChangeSub={onChangeSubHandler}
            subId={n.id}
            onRemoveInputClick={onRemoveInputClickHandler}
            key={n.id}
          />
        ))}
      </div>

      <ButtonIcon
        onClick={onAddInputClick}
        className="bg-foreground text-background flex w-full items-center justify-center rounded-md py-2 text-sm capitalize"
      >
        <Plus className="size-4" />
        add new subtask
      </ButtonIcon>
    </div>
  )
}

export default CardSubtask
