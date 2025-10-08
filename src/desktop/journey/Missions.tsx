import * as React from 'react'

import type { Journey } from '@/hooks/useData'

type Mission = Journey[number]['missions'][number]

export default function Missions({ missions }: { missions: Mission[] }) {
  const [selectedMissionIndex] = React.useState<number>(0)
  const selectedMission = missions[selectedMissionIndex]

  return (
    <div className="flex h-full w-full flex-col pl-8">
      {selectedMission && (
        <>
          <h2 className="heading-h2 mb-2 w-fit border-b border-gray-700">
            {selectedMission.title}
          </h2>
          <div className="mt-6 grid w-[50%] grid-cols-[max-content_auto_1fr] gap-x-4 gap-y-4 pl-8">
            <h4 className="heading-h4 text-gray-400">Problème</h4>
            <span className="text-gray-400">-</span>
            <p className="paragraph-normal">{selectedMission.problem}</p>

            <h4 className="heading-h4 text-gray-400">Solution</h4>
            <span className="text-gray-400">-</span>
            <p className="paragraph-normal">{selectedMission.solution}</p>

            <h4 className="heading-h4 text-gray-400">Résultat</h4>
            <span className="text-gray-400">-</span>
            <p className="paragraph-normal">{selectedMission.result}</p>
          </div>
        </>
      )}
    </div>
  )
}
