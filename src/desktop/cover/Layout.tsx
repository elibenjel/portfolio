import * as React from 'react'

export default function Layout({ visible, onPress }: { visible: boolean; onPress: () => void }) {
  const leftDoorClass = !visible
    ? 'delay-1500 rotate-y-60 skew-y-10 origin-left -translate-y-10'
    : ''
  const rightDoorClass = !visible
    ? 'delay-1500 rotate-y-60 -skew-y-10 origin-right -translate-y-10'
    : ''

  const borderTransitionClass = !visible ? 'transition-all duration-2000 ease-in-out h-full' : ''

  const outScaleTransitionClass = !visible
    ? 'delay-1500 scale-200 origin-center transition-all duration-2000 ease-in-out opacity-0'
    : ''

  const containerClass = visible
    ? 'opacity-100 pointer-events-auto'
    : 'delay-1500 opacity-0 transition-all duration-2000 ease-in-out pointer-events-none'

  return (
    <div
      className={`animate-fade-up group absolute inset-0 cursor-pointer items-center justify-center ${containerClass} overflow-hidden`}
      onClick={() => onPress()}
    >
      <div className={`absolute inset-0 ${outScaleTransitionClass}`}>
        <div
          className={`absolute left-0 h-full w-[50%] transition-all duration-2000 ease-in-out ${leftDoorClass} overflow-hidden`}
        >
          <div
            className={`absolute top-[50%] right-0 h-0 w-[1px] -translate-y-1/2 bg-gray-700 ${borderTransitionClass}`}
          />
          <h1 className="heading-h1 absolute top-[50%] right-0 translate-x-1/2 -translate-y-1/2 opacity-80 group-hover:opacity-100">
            PORTFOLIO
          </h1>
        </div>
        <div
          className={`absolute right-0 h-full w-[50%] transition-all duration-2000 ease-in-out ${rightDoorClass} overflow-hidden`}
        >
          <div
            className={`absolute top-[50%] left-0 h-0 w-[1px] -translate-y-1/2 bg-gray-700 ${borderTransitionClass}`}
          />
          <h1 className="heading-h1 absolute top-[50%] left-0 -translate-x-1/2 -translate-y-1/2 opacity-80 group-hover:opacity-100">
            PORTFOLIO
          </h1>
        </div>
      </div>
    </div>
  )
}
