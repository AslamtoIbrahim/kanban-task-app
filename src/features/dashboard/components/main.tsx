import { animate, cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import TaskContainer from './task-container'
import FormAddTask from './form-add-task'
import NavStatus from './nav-status'
import ButtonAddTask from './ui/button-add-task'
import MobileStatusContainer from './mobile-status-container'

function Main({
  className,
  ...props
}: React.ComponentProps<'div'> & { className?: string }) {
  const [isDialogActive, setIstask] = useState(false)
  const onClickShowDialogAddTask = () => {
    console.log('istask', isDialogActive)
    setIstask((pr) => !pr)
  }
  return (
    <div
      className={cn('@container/main relative h-full', className)}
      {...props}
    >
      <div className="hidden @min-[10rem]/main:block ">
        <NavStatus />
        <TaskContainer />
        <MobileStatusContainer />
        <ButtonAddTask onClick={onClickShowDialogAddTask} />
        {isDialogActive && (
          <div onClick={() => setIstask(false)} className="fixed bg-foreground/35 inset-0" />
        )}
        {/* <DialogAddTask
          className={cn('', animate(isDialogActive))}
        /> */}
        <FormAddTask
          className={cn('', animate(isDialogActive))}
        />
      </div>
    </div>
  )
}

export default Main
