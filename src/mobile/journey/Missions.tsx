import * as React from 'react'

import { Dialog } from '@/components/Dialog'
import IndexSelect from '@/components/IndexSelect'
import BrainIcon from '@/components/icons/BrainIcon'
import StarIcon from '@/components/icons/StarIcon'
import Achievements from '@/desktop/journey/Achievements'
import Skills from '@/desktop/journey/Skills'
import type { Journey } from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

type Mission = Journey[number]['missions'][number]

const localizations = {
  fr: {
    problem: 'Problème',
    solution: 'Solution',
    result: 'Résultat',
    skills: 'Compétences',
    achievements: 'Réalisations',
    technicalSkills: 'Compétences techniques',
    softSkills: 'Compétences humaines',
  },
  en: {
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
    skills: 'Skills',
    achievements: 'Achievements',
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
  },
}

export default function Missions({ missions }: { missions: Mission[] }) {
  const { language } = useLocalization()
  const [selectedMissionIndex, setSelectedMissionIndex] = React.useState<number>(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const missionsRef = React.useRef<(HTMLDivElement | null)[]>([])
  const [visibleDialog, setVisibleDialog] = React.useState<{
    mission: string
    type: 'skills' | 'achievements'
  } | null>(null)

  function scrollSectionIntoViewXOnly(section: HTMLElement, container: HTMLElement) {
    const containerRect = container.getBoundingClientRect()
    const sectionRect = section.getBoundingClientRect()

    const deltaX = sectionRect.left - containerRect.left

    container.scrollTo({
      left: container.scrollLeft + deltaX,
      behavior: 'smooth',
    })
  }

  const handleMissionSelect = React.useCallback((index: number) => {
    setSelectedMissionIndex(index)
    if (missionsRef.current[index] && scrollContainerRef.current) {
      scrollSectionIntoViewXOnly(missionsRef.current[index], scrollContainerRef.current)
    }
  }, [])
  return (
    <div className="relative flex w-full flex-col items-center gap-y-4">
      {missions.length > 1 && (
        <div className="bg-primary sticky top-4 z-50 mt-4 flex flex-row items-center justify-center rounded-full px-2 opacity-50">
          <IndexSelect
            index={selectedMissionIndex}
            onIndexSelected={handleMissionSelect}
            maxIndex={missions.length}
          />
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="scrollbar-none mt-4 flex w-full min-w-0 flex-row items-center gap-x-4 overflow-x-hidden rounded-md bg-gray-200"
      >
        {missions.map((mission, index) => (
          <div
            key={mission.title}
            ref={el => {
              missionsRef.current[index] = el
            }}
            className="flex h-full min-w-full flex-col items-center gap-y-4 px-8 py-4"
          >
            <h3 className="heading-h3 scale-90 text-center text-gray-800">{mission.title}</h3>
            <div className="h-[1px] w-full bg-gray-400" />
            <div className="flex h-full w-full flex-col items-center">
              <div className="grid grid-cols-[max-content_auto_1fr] gap-x-4 gap-y-4">
                <h4 className="text-gray-600">{localizations[language].problem}</h4>
                <span className="text-gray-600">-</span>
                <p className="paragraph-normal text-gray-800">{mission.problem}</p>

                <h4 className="text-gray-600">{localizations[language].solution}</h4>
                <span className="text-gray-600">-</span>
                <p className="paragraph-normal text-gray-800">{mission.solution}</p>

                <h4 className="text-gray-600">{localizations[language].result}</h4>
                <span className="text-gray-600">-</span>
                <p className="paragraph-normal text-gray-800">{mission.result}</p>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-4">
              {(mission.technicalSkills.length > 0 || mission.softSkills.length > 0) && (
                <button
                  onClick={() => setVisibleDialog({ mission: mission.title, type: 'skills' })}
                  className="paragraph-normal bg-primary flex cursor-pointer flex-row items-center justify-center gap-x-2 rounded-full px-4 py-2 text-gray-200"
                >
                  <div className="h-6 w-6 text-white">
                    <BrainIcon />
                  </div>
                  {localizations[language].skills}
                </button>
              )}
              {(mission.achievements.media.length > 0 ||
                mission.achievements.hyperlinks.length > 0) && (
                <button
                  onClick={() => setVisibleDialog({ mission: mission.title, type: 'achievements' })}
                  className="paragraph-normal bg-primary flex cursor-pointer flex-row items-center justify-center gap-x-2 rounded-full px-4 py-2 text-gray-200"
                >
                  <div className="h-6 w-6 text-white">
                    <StarIcon />
                  </div>
                  {localizations[language].achievements}
                </button>
              )}
            </div>
            <Dialog
              visible={visibleDialog?.type === 'skills' && visibleDialog.mission === mission.title}
              onDismiss={() => setVisibleDialog(null)}
            >
              <div className="scrollbar-styled flex h-[80vh] w-[80vw] flex-col items-center gap-y-8 overflow-y-auto rounded-md border-2 border-gray-700 bg-gray-200 p-16">
                {mission.technicalSkills.length > 0 && (
                  <Skills
                    title={localizations[language].technicalSkills}
                    skills={mission.technicalSkills}
                  />
                )}
                {mission.softSkills.length > 0 && (
                  <Skills title={localizations[language].softSkills} skills={mission.softSkills} />
                )}
              </div>
            </Dialog>
            <Dialog
              visible={
                visibleDialog?.type === 'achievements' && visibleDialog.mission === mission.title
              }
              onDismiss={() => setVisibleDialog(null)}
            >
              <div className="scrollbar-styled flex h-[80vh] w-[80vw] flex-col items-center justify-center overflow-y-auto rounded-md border-2 border-gray-700 bg-gray-200 p-8 shadow-lg">
                <Achievements
                  title={localizations[language].achievements}
                  media={mission.achievements.media}
                  hyperlinks={mission.achievements.hyperlinks}
                />
              </div>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}
