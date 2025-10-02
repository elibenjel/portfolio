import { useData } from '@/hooks/useData'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'

export default function Journey() {
  const { journey } = useData()
  return (
    <section className="space-y-12">
      {journey.map(({ period, dates, missions }) => (
        <div key={period}>
          <h2 className={`${typography.heading.h2} border-b ${colors.border.primary} pb-2`}>
            {period} -{' '}
            <span className="text-gray-400">
              {new Date(dates.start).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
              })}
              {' - '}
              {dates.end
                ? new Date(dates.end).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                  })
                : 'en cours'}
            </span>
          </h2>
          <div className="mt-8 space-y-8">
            {missions.map(mission => (
              <div key={mission.title} className={`rounded-lg p-8 ${colors.background.secondary}`}>
                <h3 className={typography.heading.h3}>{mission.title}</h3>
                <div className="mt-4 space-y-4 text-gray-400">
                  <p>
                    <span className="font-bold text-white">Problem:</span> {mission.problem}
                  </p>
                  <p>
                    <span className="font-bold text-white">Solution:</span> {mission.solution}
                  </p>
                  <p>
                    <span className="font-bold text-white">Result:</span> {mission.result}
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className={`${typography.heading.h3} text-lg`}>Skills</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mission.technicalSkills?.map(({ label, value }) => (
                      <span
                        key={label}
                        className={`rounded-full px-2 py-1 text-sm ${colors.background.primary}`}
                      >
                        {label + ' ' + value}
                      </span>
                    ))}
                    {mission.softSkills?.map(({ label, value }) => (
                      <span
                        key={label}
                        className={`rounded-full px-2 py-1 text-sm ${colors.background.primary}`}
                      >
                        {label + ' ' + value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
