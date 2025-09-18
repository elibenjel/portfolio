import { typography } from '../theme/typography'
import { colors } from '../theme/colors'
import journeyData from '../../data/journey.yaml'

export default function Journey() {
  return (
    <section className="space-y-12">
      {journeyData.map((period) => (
        <div key={period.period}>
          <h2 className={`${typography.heading.h2} border-b ${colors.border.primary} pb-2`}>
            {period.period} - <span className="text-gray-400">{period.dates}</span>
          </h2>
          <div className="mt-8 space-y-8">
            {period.missions.map((mission) => (
              <div key={mission.title} className={`p-8 rounded-lg ${colors.background.secondary}`}>
                <h3 className={typography.heading.h3}>{mission.title}</h3>
                <div className="mt-4 space-y-4 text-gray-400">
                  <p><span className="font-bold text-white">Problem:</span> {mission.problem}</p>
                  <p><span className="font-bold text-white">Solution:</span> {mission.solution}</p>
                  <p><span className="font-bold text-white">Result:</span> {mission.result}</p>
                </div>
                <div className="mt-6">
                  <h4 className={`${typography.heading.h3} text-lg`}>Skills</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mission.technical_skills?.map((skill) => (
                      <span key={skill} className={`px-2 py-1 text-sm rounded-full ${colors.background.primary}`}>
                        {skill}
                      </span>
                    ))}
                    {mission.soft_skills?.map((skill) => (
                      <span key={skill} className={`px-2 py-1 text-sm rounded-full ${colors.background.primary}`}>
                        {skill}
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
