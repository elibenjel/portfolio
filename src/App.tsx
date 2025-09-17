import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
import { useIsMobile } from './hooks/useIsMobile'

export default function App() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileLayout />
  }

  return <DesktopLayout />
}
