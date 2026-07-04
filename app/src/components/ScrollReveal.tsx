'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-reveal-bound])').forEach((el) => {
        el.setAttribute('data-reveal-bound', '1')
        io.observe(el)
      })
    }

    scan()
    const mut = new MutationObserver(scan)
    mut.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mut.disconnect() }
  }, [])

  return null
}
