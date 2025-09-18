import { typography } from '../theme/typography'

export default function NavBar() {
  return (
    <nav className="flex flex-col space-y-4">
      <h1 className={`${typography.heading.h1} text-left`}>Jack</h1>
      <div className="flex flex-col space-y-2 items-start">
        <button className={typography.link.normal}>About</button>
        <button className={typography.link.normal}>My Skills</button>
        <button className={typography.link.normal}>Work</button>
        <button className={typography.link.normal}>Contact</button>
        <button className={typography.link.normal}>Blog</button>
      </div>
    </nav>
  )
}
