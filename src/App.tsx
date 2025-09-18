import DesktopLayout from './DesktopLayout'
import NavBar from './components/NavBar'
import Journey from './components/Journey'
import { colors } from './theme/colors'
import { mergeClassNames } from './utils/styling'

function App() {
  return (
    <div
      className={mergeClassNames(
        colors.background.primary,
        colors.text.primary,
        'h-screen',
      )}
    >
      <DesktopLayout navBar={<NavBar />}>
        <Journey />
      </DesktopLayout>
    </div>
  )
}

export default App
