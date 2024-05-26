import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <div className="grid-rows-6 grid h-full max-h-[860px] grid-cols-9 gap-6">
      <Skeleton className="col-span-6 row-span-6 h-[800px]" />
      <Skeleton className="col-span-3 row-span-3" />
      <Skeleton className="col-span-3 row-span-3" />
    </div>
  )
}
