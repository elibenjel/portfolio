import type { Journey } from '@/hooks/useData'

type Mission = Journey[number]['missions'][number]

export default function Missions({ missions }: { missions: Mission[] }) {
  return missions.map(mission => (
    <div key={mission.title}>
      <h2>{mission.title}</h2>
      <p>{mission.problem}</p>
      <p>{mission.solution}</p>
      <p>{mission.result}</p>
    </div>
  ))
}
