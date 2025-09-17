import { typography } from '../theme/typography'

export default function NavBar() {
  return (
    <nav className="flex flex-col space-y-4">
      <button className={typography.link.normal}>About</button>
      <button className={typography.link.normal}>Journey</button>
      <button className={typography.link.normal}>Contact</button>
    </nav>
  )
}
