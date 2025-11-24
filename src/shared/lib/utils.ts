import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const BASE_API_URL = 'https://kanban-task-backend.vercel.app'
// export const BASE_API_URL = 'http://localhost:3005'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function animate(isAtive: boolean) {
  return `transition-all  duration-300 ease-in-out transition-discrete ${isAtive ? 'visible scale-100 opacity-100' : 'invisible scale-75 opacity-0 pointer-events-none'}`
}

export function twfl(str: string) {
  const words = str.split(' ')
  const f = words[0]?.charAt(0) || ''
  const s = words[1]?.charAt(0) || ''
  return (f + s).toUpperCase()
}
