import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const BASE_API_URL = 'https://kanban-task-backend.vercel.app'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function twfl(str: string) {
  const words = str.split(' ')
  const f = words[0]?.charAt(0) || ''
  const s = words[1]?.charAt(0) || ''
  return (f + s).toUpperCase()
}
