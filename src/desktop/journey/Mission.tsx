import type { Journey } from '@/hooks/useData'
import useIsVisible from '@/hooks/useIsVisible'

type Mission = Journey[number]['missions'][number]

export default function Mission({ mission }: { mission: Mission }) {
  const { ref: missionRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  return (
    <div
      ref={missionRef}
      className={`flex h-full w-full flex-col items-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {mission && (
        <>
          <h2 className="heading-h2 mb-8 w-full border-b border-gray-700 text-center">
            {mission.title}
          </h2>
          <div className="flex h-full w-full flex-col items-center">
            <div className="grid grid-cols-[max-content_auto_1fr] gap-x-4 gap-y-4">
              <h4 className="text-gray-400">Problème</h4>
              <span className="text-gray-400">-</span>
              <p className="paragraph-normal">{mission.problem}</p>

              <h4 className="text-gray-400">Solution</h4>
              <span className="text-gray-400">-</span>
              <p className="paragraph-normal">{mission.solution}</p>

              <h4 className="text-gray-400">Résultat</h4>
              <span className="text-gray-400">-</span>
              <p className="paragraph-normal">{mission.result}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
