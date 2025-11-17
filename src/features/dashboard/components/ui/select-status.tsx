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
}

export function SelectStatus({ statuses, selectStatus }: SelectStatusProp) {
  return (
    <Select defaultValue={statuses[0].title}>
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
              onClick={() => selectStatus(s)}
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
