import { FileWarning } from "lucide-react"

function NotFound() {
  return (
    <div className='flex items-center justify-center text-red-500 h-screen gap-4'>
      <FileWarning />
      Oops something went wrong
    </div>
  )
}

export default NotFound
