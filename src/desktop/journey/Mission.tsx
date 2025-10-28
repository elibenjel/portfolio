import type { Journey } from '@/hooks/useData'
import useIsVisible from '@/hooks/useIsVisible'
import useLocalization from '@/providers/localization/hook'

type Mission = Journey[number]['missions'][number]

const localizations = {
  fr: {
    context: 'Contexte',
    environment: 'Environnement',
    contributions: 'Contributions',
    problem: 'Problème',
    solution: 'Solution',
    result: 'Résultat',
  },
  en: {
    context: 'Context',
    environment: 'Environment',
    contributions: 'Contributions',
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
  },
}

export default function Mission({ mission }: { mission: Mission }) {
  const { ref: missionRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  const { language } = useLocalization()
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
              {mission.context && (
                <>
                  <h4 className="text-gray-400">{localizations[language].context}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.context}</p>
                </>
              )}

              {mission.environment && (
                <>
                  <h4 className="text-gray-400">{localizations[language].environment}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.environment}</p>
                </>
              )}

              {mission.contributions && (
                <>
                  <h4 className="text-gray-400">{localizations[language].contributions}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.contributions}</p>
                </>
              )}

              {mission.problem && (
                <>
                  <h4 className="text-gray-400">{localizations[language].problem}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.problem}</p>
                </>
              )}

              {mission.solution && (
                <>
                  <h4 className="text-gray-400">{localizations[language].solution}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.solution}</p>
                </>
              )}

              {mission.result && (
                <>
                  {' '}
                  <h4 className="text-gray-400">{localizations[language].result}</h4>
                  <span className="text-gray-400">-</span>
                  <p className="paragraph-normal">{mission.result}</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
