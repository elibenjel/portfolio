import * as React from 'react'

import Timeline from '@/components/Timeline'
import { useData } from '@/hooks/useData'

import Materials from './Materials'
import Missions from './Missions'
import Skills from './Skills'

export default function Layout() {
  const { journey } = useData()
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | null>(null)
  const missions = journey.find(period => period.period === selectedPeriod)?.missions ?? []
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center px-16 py-8">
      <div className="w-[75%] self-start">
        <Timeline
          periods={journey.map(period => {
            return {
              id: period.period,
              title: period.period,
              startDate: new Date(period.dates.start),
              endDate: period.dates.end ? new Date(period.dates.end) : null,
            }
          })}
          onPeriodSelect={period => setSelectedPeriod(period.title)}
        />
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <Missions missions={missions} />
      </div>
      <Skills />
      <Materials />
    </div>
  )
}
