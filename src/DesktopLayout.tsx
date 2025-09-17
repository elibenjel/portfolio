import type { ReactNode } from 'react'

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
      <div className="w-1/4 p-4 border-r border-gray-800">{navBar}</div>
      <div className="w-3/4 p-8 overflow-y-auto">{children}</div>
    </div>
  )
}
