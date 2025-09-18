import Materials from './Materials'
import Missions from './Missions'
import Skills from './Skills'
import Timeline from './Timeline'

export default function Layout() {
  return (
    <div className="flex-1 p-8 align-center justify-center">
      <Timeline />
      <Missions />
      <Skills />
      <Materials />
    </div>
  )
}
