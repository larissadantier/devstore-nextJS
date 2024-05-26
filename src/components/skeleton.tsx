import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(['rouded-md animate-pulse bg-zinc-50/10', className])}
      {...props}
    />
  )
}
