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
  const inClasses = 'opacity-100 translate-y-0 transition-all duration-1000'
  const outClasses = 'opacity-0 translate-y-4'
  return (
    maxIndex > 1 && (
      <div
        ref={missionRef}
        className={`sticky top-2 z-50 mb-5 flex w-full flex-col items-center ${isVisible ? inClasses : outClasses}`}
      >
        <div className="flex w-full flex-row justify-center">
          <div className="flex w-fit flex-row justify-center rounded-tl-sm rounded-tr-2xl rounded-br-sm rounded-bl-2xl bg-slate-200 px-4 py-2">
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
