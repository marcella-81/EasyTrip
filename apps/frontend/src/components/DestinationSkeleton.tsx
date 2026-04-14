import { Skeleton } from '@/components/ui/skeleton'

export function DestinationSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{ background: '#16181f', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" style={{ background: '#1e2029' }} />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40 rounded-lg" style={{ background: '#1e2029' }} />
          <Skeleton className="h-3 w-20 rounded-lg" style={{ background: '#1e2029' }} />
        </div>
      </div>
      <Skeleton className="h-px w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16 rounded" style={{ background: '#1e2029' }} />
            <Skeleton className="h-4 w-28 rounded" style={{ background: '#1e2029' }} />
          </div>
        ))}
      </div>
      <Skeleton className="h-16 w-full rounded-xl" style={{ background: '#1e2029' }} />
      <Skeleton className="h-16 w-full rounded-xl" style={{ background: '#1e2029' }} />
    </div>
  )
}
