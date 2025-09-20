import type { ReactNode } from 'react'

import GithubIcon from '@/components/icons/GithubIcon'
import LinkIcon from '@/components/icons/LinkIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'

interface SidebarProps {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="flex w-72 flex-col space-y-8 border-r border-gray-800 p-8">
      <div className="flex-grow">{children}</div>
      <div className="flex space-x-4">
        <a href="#" aria-label="LinkedIn">
          <LinkedinIcon className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
        <a href="#" aria-label="GitHub">
          <GithubIcon className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
        <a href="#" aria-label="Personal Website">
          <LinkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
      </div>
    </aside>
  )
}
