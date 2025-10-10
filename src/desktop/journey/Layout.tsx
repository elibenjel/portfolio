import * as React from 'react'

import Timeline from '@/components/Timeline'
import { useData } from '@/hooks/useData'

import Achievements from './Achievements'
import Mission from './Mission'
import MissionSelect from './MissionSelect'
import Skills from './Skills'

export default function Layout() {
  const { journey } = useData()
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | null>(null)
  const [selectedMissionIndex, setSelectedMissionIndex] = React.useState<number>(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setSelectedMissionIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedPeriod])
  const missions = journey.find(period => period.period === selectedPeriod)?.missions ?? []
  const selectedMission = missions[selectedMissionIndex]
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center px-16 py-4">
      <div className="flex min-h-0 w-full max-w-[1000px] flex-col items-center">
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
        <div
          ref={scrollContainerRef}
          className="scrollbar-styled flex w-full max-w-[80%] flex-1 flex-col gap-y-8 overflow-y-auto px-8"
        >
          {selectedMission && (
            <>
              <div className="flex w-full flex-col items-center">
                <MissionSelect
                  key={selectedPeriod}
                  maxIndex={missions.length}
                  index={selectedMissionIndex}
                  onIndexSelected={setSelectedMissionIndex}
                />
                <Mission mission={selectedMission} />
              </div>
              <Skills title="Compétences techniques" skills={selectedMission.technicalSkills} />
              <Skills title="Compétences humaines" skills={selectedMission.softSkills} />
              {(selectedMission.achievements.media.length > 0 ||
                selectedMission.achievements.hyperlinks.length > 0) && (
                <Achievements
                  title="Réalisations"
                  media={selectedMission.achievements.media}
                  hyperlinks={selectedMission.achievements.hyperlinks}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
