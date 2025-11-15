import { cn, twfl } from '@/shared/lib/utils'

function UserAvatar({
  username,
  imgUrl,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  username: string
  imgUrl: string | null
  className?: string
}) {
  return (
    <div className={cn('size-6 anime', className)} {...props}>
      {imgUrl && (
        <picture>
          <img className="rounded-sm" src={imgUrl} alt="" />
        </picture>
      )}
      {!imgUrl && (
        <div className="size-6 text-xs rounded-sm bg-foreground/10 flex items-center justify-center text-foreground/50 font-bold cursor-default hover:bg-foreground/20 anime">
          {
            twfl(username) /* Function to get first two letters and convert to uppercase */
          }
        </div>
      )}
    </div>
  )
}

export default UserAvatar
