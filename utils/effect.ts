import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

interface EffectConfig {
  duration?: number
  direction?: 'left' | 'right'
  repeat?: number // 可選：可為 -1 或正整數
  ease?: string // 可選：GSAP 支援的 easing 名稱
}

export const fadeIn = {
  name: 'fadeIn',
  effect: (targets: gsap.TweenTarget, config: EffectConfig) => {
    gsap.set(targets, { opacity: 0, y: '20%' })

    return gsap.to(targets, { duration: 0.3, opacity: 1, y: '0%' })
  },
  default: { duration: 0.5 },
  extendTimeLine: true,
}

export const fadeOut = {
  name: 'fadeOut',
  effect: (targets: gsap.TweenTarget, config: EffectConfig) => {
    return gsap.to(targets, { duration: 0.3, opacity: 0 })
  },
  default: { duration: 0.5 },
  extendTimeLine: true,
}

export const aosFadeIn = {
  name: 'aosFadeIn',
  effect: (_: gsap.TweenTarget, config: EffectConfig) => {
    gsap.set('[data-fade="in"]', { opacity: 0 })
    const elements = document.querySelectorAll('[data-fade="in"]')
    const filterElements = Array.from(elements).filter((el) => !el.classList.contains('no-animation'))

    return ScrollTrigger.batch(filterElements, {
      start: 'center 80%',
      end: 'center 20%',
      onEnter: (el) => {
        gsap.to(el, { opacity: 1 })
      },
      onEnterBack: (el) => {
        gsap.to(el, { opacity: 1 })
      },
      onLeave: (el) => {
        gsap.to(el, { opacity: 0 })
      },
      onLeaveBack: (el) => {
        gsap.to(el, { opacity: 0 })
      },
    })
  },
  default: { duration: 0.5 },
  extendTimeLine: true,
}

export const marquee = {
  name: 'marquee',
  extendTimeline: true,
  defaults: {
    duration: 10,
    repeat: -1,
    ease: 'none',
    direction: 'left',
  },
  effect: (targets: gsap.TweenTarget, config: EffectConfig) => {
    gsap.set(targets, { x: '0%' })

    return gsap.to(targets, {
      duration: config.duration,
      x: (): string => {
        if (config.direction === 'left') {
          return '-100%'
        }

        if (config.direction === 'right') {
          return '100%'
        }
        return '-100%'
      },
      repeat: config.repeat,
      ease: config.ease,
    })
  },
}
