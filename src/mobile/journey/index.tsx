import useData from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

import Missions from './Missions'

const localizations = {
  fr: {
    title: 'Mon Parcours',
    current: 'en cours',
  },
  en: {
    title: 'My Journey',
    current: 'current',
  },
}

export default function JourneyLayout() {
  const { journey } = useData()
  const { language } = useLocalization()
  return (
    <div className="flex w-full flex-col items-center gap-y-16">
      <div className="flex w-full flex-col items-center gap-y-8">
        <div className="flex w-full flex-row items-center gap-x-4">
          <div className="h-[1px] flex-1 bg-gray-700" />
          <h2 className="heading-h2 text-center">{localizations[language].title}</h2>
          <div className="h-[1px] flex-1 bg-gray-700" />
        </div>
        <div className="flex w-full flex-col items-center gap-y-4">
          {journey.map(period => (
            <div
              data-section
              key={period.period}
              className="flex w-full flex-col items-center py-4"
            >
              <h3 className="heading-h3 text-center">{period.period}</h3>
              <h4 className="heading-h4 text-center text-gray-400">
                {new Date(period.dates.start).toLocaleDateString(language, {
                  year: 'numeric',
                  month: 'long',
                })}
                {' - '}
                {period.dates.end
                  ? new Date(period.dates.end).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'long',
                    })
                  : localizations[language].current}
              </h4>
              <Missions missions={period.missions} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
