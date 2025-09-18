import type { ReactNode } from 'react'
import Sidebar from './components/Sidebar'

interface DesktopLayoutProps {
  navBar: ReactNode
  children: ReactNode
}

export default function DesktopLayout({
  navBar,
  children,
}: DesktopLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar>{navBar}</Sidebar>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
