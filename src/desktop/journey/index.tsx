import * as React from 'react'

import Timeline from '@/components/Timeline'
import useData from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'
import type { TimelinePeriod } from '@/types'

import Achievements from './Achievements'
import Mission from './Mission'
import MissionSelect from './MissionSelect'
import Skills from './Skills'

const localizations = {
  fr: {
    technicalSkills: 'Compétences techniques',
    softSkills: 'Compétences humaines',
    achievements: 'Réalisations',
  },
  en: {
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
    achievements: 'Achievements',
  },
}

export default function Layout() {
  const { journey } = useData()
  const { language } = useLocalization()
  const [selectedPeriodId, setSelectedPeriodId] = React.useState<string>(journey[0].id)
  const [selectedMissionIndex, setSelectedMissionIndex] = React.useState<number>(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const timelinePeriods = React.useMemo(() => {
    return journey.map(period => {
      return {
        id: period.id,
        title: period.period,
        startDate: new Date(period.dates.start),
        endDate: period.dates.end ? new Date(period.dates.end) : null,
      }
    })
  }, [journey])
  const handlePeriodSelect = React.useCallback((period: TimelinePeriod) => {
    setSelectedPeriodId(period.id)
    setSelectedMissionIndex(0)
  }, [])

  React.useEffect(() => {
    setSelectedMissionIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [selectedPeriodId])
  const missions = journey.find(period => period.id === selectedPeriodId)?.missions ?? []
  const selectedMission = missions[selectedMissionIndex]
  const periodKey = selectedPeriodId
  const missionKey = `${selectedPeriodId}-${selectedMission.title}`
  return (
    <div className="animate-grow flex h-full min-h-0 w-full flex-1 flex-col items-center px-16 py-4">
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
                title={localizations[language].technicalSkills}
                skills={selectedMission.technicalSkills}
                key={missionKey + '-technicalSkills'}
              />
              <Skills
                title={localizations[language].softSkills}
                skills={selectedMission.softSkills}
                key={missionKey + '-softSkills'}
              />
              {(selectedMission.achievements.media.length > 0 ||
                selectedMission.achievements.hyperlinks.length > 0) && (
                <Achievements
                  title={localizations[language].achievements}
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
