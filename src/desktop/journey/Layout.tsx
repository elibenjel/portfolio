import Materials from './Materials'
import Missions from './Missions'
import Skills from './Skills'
import Timeline from './Timeline'

export default function Layout() {
  return (
    <div className="align-center flex-1 justify-center p-8">
      <Timeline />
      <Missions />
      <Skills />
      <Materials />
    </div>
  )
}
