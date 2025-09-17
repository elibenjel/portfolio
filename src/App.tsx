import DesktopLayout from './DesktopLayout'
import NavBar from './components/NavBar'
import { colors } from './theme/colors'
import { typography } from './theme/typography'
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
        <div className="space-y-8">
          <h1 className={typography.heading.h1}>Portfolio</h1>
          <p className={typography.paragraph.normal}>
            Welcome to my portfolio. This is a placeholder for the main content.
          </p>
        </div>
      </DesktopLayout>
    </div>
  )
}

export default App
