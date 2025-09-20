export function animateValue({
  from,
  to,
  duration,
  easing,
  onUpdate,
}: {
  from: number
  to: number
  duration: number
  easing: (t: number) => number
  onUpdate: (value: number) => void
}) {
  let start: number | null = null
  function step(timestamp: number) {
    if (!start) start = timestamp
    const t = Math.min((timestamp - start) / duration, 1)
    const eased = easing(t)
    onUpdate(from + (to - from) * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const easeInCubic = (t: number) => {
  return t * t * t
}

const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3)
}

export const Easing = {
  Cubic: {
    In: easeInCubic,
    Out: easeOutCubic,
    InOut: easeInOutCubic,
  },
}
