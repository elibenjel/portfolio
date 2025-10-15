import * as React from 'react'

import { mergeClassNames, tw } from '@/utils/styling'

import icons from './icons'

export function Icon({
  name,
  size = 24,
  color = 'black',
  shadow = false,
  disabled = false,
  onPress,
  style,
}: {
  name: keyof typeof icons
  size?: number
  color?: string
  shadow?: boolean
  disabled?: boolean
  onPress?: () => void
  style?: React.CSSProperties
}) {
  const IconComponent = icons[name]
  const [isClicked, setIsClicked] = React.useState(false)
  const handleClick = onPress
    ? () => {
        onPress()
        setIsClicked(true)
        setTimeout(() => {
          setIsClicked(false)
        }, 200)
      }
    : undefined

  const buttonClasses = {
    base: tw`relative scale-100 origin-center transition-all duration-200 ease-in-out`,
    interactable: onPress ? tw`cursor-pointer opacity-80` : '',
    hovered: onPress && !isClicked && tw`hover:scale-105 hover:opacity-100`,
    clicked: onPress && isClicked && tw`scale-110 opacity-100`,
    disabled: onPress && tw`opacity-50 cursor-not-allowed`,
  }

  const filterId = shadow ? 'icon-shadow' : undefined
  return (
    <button
      className={mergeClassNames(
        buttonClasses.base,
        !disabled && buttonClasses.interactable,
        !disabled && buttonClasses.hovered,
        !disabled && isClicked && buttonClasses.clicked,
        disabled && buttonClasses.disabled
      )}
      style={{
        ...style,
        width: size,
        height: size,
        color,
      }}
      onClick={handleClick}
    >
      {filterId ? (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="2"
                dy="2"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.8"
              />
            </filter>
          </defs>
        </svg>
      ) : null}
      <IconComponent filter={filterId && !disabled ? `url(#${filterId})` : undefined} />
    </button>
  )
}
