import useIsVisible from '@/hooks/useIsVisible'

export default function Gauge({ percentage, color }: { percentage: number; color: string }) {
  const { ref: gaugeRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)

  return (
    <div
      ref={gaugeRef}
      className="relative flex h-1 w-full overflow-hidden rounded-full bg-gray-700"
    >
      <div
        className="h-full transition-all duration-800"
        style={{ width: `${isVisible ? percentage * 100 : 0}%`, backgroundColor: color }}
      />
    </div>
  )
}
