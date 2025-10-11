import IndexSelect from '@/components/IndexSelect'
import useIsVisible from '@/hooks/useIsVisible'
import { colors } from '@/utils/styling'

export default function MissionSelect({
  maxIndex,
  index,
  onIndexSelected,
}: {
  maxIndex: number
  index: number
  onIndexSelected: (index: number) => void
}) {
  const { ref: missionRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  return (
    maxIndex > 1 && (
      <div
        ref={missionRef}
        className={`sticky top-2 z-50 mb-5 flex w-full flex-col items-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      >
        <div className="flex w-full flex-row justify-center">
          <div className="relative flex w-fit flex-row items-center justify-center overflow-hidden rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl px-4 py-2">
            <div className="absolute inset-0 bg-slate-200 blur-lg" />
            <IndexSelect
              maxIndex={maxIndex}
              index={index}
              onIndexSelected={onIndexSelected}
              color={colors.background.primary}
            />
          </div>
        </div>
      </div>
    )
  )
}
