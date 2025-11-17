import { cn } from '@/shared/lib/utils';
import { ChevronDown } from 'lucide-react';
import { BsCircleFill } from 'react-icons/bs';
import type { Status } from '../../utils/types';

function StatusButton({
  status,
  className,
  ...props
}: React.ComponentProps<'button'> & { className?: string; status: Status }) {
  return (
    <button
      className={cn(
        'flex w-64 items-center justify-between px-2 pb-2',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <BsCircleFill style={{ color: status.color }} />
        <p className="text-start w-38 truncate">{status.title}</p>
      </div>
      <ChevronDown className="text-foreground/50 size-4" />
    </button>
  )
}

export default StatusButton
