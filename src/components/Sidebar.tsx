import type { ReactNode } from 'react'
import GithubIcon from './icons/GithubIcon'
import LinkedinIcon from './icons/LinkedinIcon'
import LinkIcon from './icons/LinkIcon'

interface SidebarProps {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-72 p-8 border-r border-gray-800 flex flex-col space-y-8">
      <div className="flex-grow">{children}</div>
      <div className="flex space-x-4">
        <a href="#" aria-label="LinkedIn">
          <LinkedinIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </a>
        <a href="#" aria-label="GitHub">
          <GithubIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </a>
        <a href="#" aria-label="Personal Website">
          <LinkIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </a>
      </div>
    </aside>
  )
}
