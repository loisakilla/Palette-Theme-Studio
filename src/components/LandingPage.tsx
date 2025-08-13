import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LandingPageProps {
  onStart: () => void
}

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage({ onStart }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(
      containerRef.current?.querySelectorAll('.panel') ?? [],
    )
    if (sections.length === 0) return
    const totalWidth = window.innerWidth * (sections.length - 1)
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => '+=' + totalWidth,
      },
    })
  }, [])

  const features = [
    'Drag & Drop изображений для извлечения палитры',
    'Генерация дизайн-токенов и автоматические оттенки',
    'Проверка контрастности и подсказки коррекции',
    'Превью UI-компонентов в светлой и тёмной теме',
    'Экспорт в CSS variables, Tailwind config и JSON',
    'Сохранение и загрузка пресетов',
  ]

  return (
    <div ref={containerRef} className="landing-container">
      <div className="landing-sections">
        {features.map((f) => (
          <section key={f} className="panel">
            <div>{f}</div>
          </section>
        ))}
        <section className="panel">
          <button onClick={onStart}>Приступить к работе</button>
        </section>
      </div>
    </div>
  )
}
