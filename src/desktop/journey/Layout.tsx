import Materials from './Materials'
import Missions from './Missions'
import Skills from './Skills'
import Timeline from './Timeline'

export default function Layout() {
  return (
    <div className="flex w-full flex-1 flex-col items-center p-8">
      <Timeline />
      <Missions />
      <Skills />
      <Materials />
    </div>
  )
}
