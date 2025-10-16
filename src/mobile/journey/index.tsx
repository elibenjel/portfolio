import useData from '@/hooks/useData'

import Missions from './Missions'

export default function JourneyLayout() {
  const { journey } = useData()
  return (
    <div className="flex w-full flex-col items-center gap-y-16">
      <div className="flex w-full flex-col items-center gap-y-8">
        <div className="flex w-full flex-row items-center gap-x-4">
          <div className="h-[1px] flex-1 bg-gray-700" />
          <h2 className="heading-h2 text-center">Mon parcours</h2>
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
                {new Date(period.dates.start).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                })}
                {' - '}
                {period.dates.end
                  ? new Date(period.dates.end).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                    })
                  : 'en cours'}
              </h4>
              <Missions missions={period.missions} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
