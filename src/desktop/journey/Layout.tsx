import * as React from 'react'

import Timeline from '@/components/Timeline'
import { useData } from '@/hooks/useData'
import type { TimelinePeriod } from '@/types'

import Achievements from './Achievements'
import Mission from './Mission'
import MissionSelect from './MissionSelect'
import Skills from './Skills'

export default function Layout() {
  const { journey } = useData()
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(journey[0].period)
  const [selectedMissionIndex, setSelectedMissionIndex] = React.useState<number>(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const timelinePeriods = React.useMemo(() => {
    return journey.map(period => {
      return {
        id: period.period,
        title: period.period,
        startDate: new Date(period.dates.start),
        endDate: period.dates.end ? new Date(period.dates.end) : null,
      }
    })
  }, [journey])
  const handlePeriodSelect = React.useCallback((period: TimelinePeriod) => {
    setSelectedPeriod(period.title)
    setSelectedMissionIndex(0)
  }, [])

  React.useEffect(() => {
    setSelectedMissionIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedPeriod])
  const missions = journey.find(period => period.period === selectedPeriod)?.missions ?? []
  const selectedMission = missions[selectedMissionIndex]
  const periodKey = selectedPeriod
  const missionKey = `${selectedPeriod}-${selectedMission.title}`
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center px-16 py-4">
      <div className="animate-fade flex min-h-0 w-full max-w-[1000px] flex-col items-center">
        <Timeline periods={timelinePeriods} onPeriodSelect={handlePeriodSelect} />
        <div
          ref={scrollContainerRef}
          className="scrollbar-styled flex w-full max-w-[80%] flex-1 flex-col gap-y-16 overflow-y-auto px-8"
        >
          {selectedMission && (
            <>
              <div className="flex w-full flex-col items-center">
                <MissionSelect
                  key={periodKey}
                  maxIndex={missions.length}
                  index={selectedMissionIndex}
                  onIndexSelected={setSelectedMissionIndex}
                />
                <Mission mission={selectedMission} key={missionKey} />
              </div>
              <Skills
                title="Compétences techniques"
                skills={selectedMission.technicalSkills}
                key={missionKey + '-technicalSkills'}
              />
              <Skills
                title="Compétences humaines"
                skills={selectedMission.softSkills}
                key={missionKey + '-softSkills'}
              />
              {(selectedMission.achievements.media.length > 0 ||
                selectedMission.achievements.hyperlinks.length > 0) && (
                <Achievements
                  title="Réalisations"
                  media={selectedMission.achievements.media}
                  hyperlinks={selectedMission.achievements.hyperlinks}
                  key={missionKey + '-achievements'}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
