import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import type { Status } from '../../utils/types'

type SelectStatusProp = {
  statuses: Status[]
  selectStatus: (status: Status) => void
  value: string
}

export function SelectStatus({
  statuses,
  selectStatus,
  value,
}: SelectStatusProp) {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        const selected = statuses.find((s) => s.title === val)
        if (selected) selectStatus(selected)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-64">
          <SelectLabel>statues</SelectLabel>
          {statuses.map((s) => (
            <SelectItem
              key={s.title}
              className="truncate"
              value={s.title}
            >
              {s.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
