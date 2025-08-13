import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Background from './Background'

interface LandingPageProps {
  onStart: (file: File) => void
}

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage({ onStart }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=600%',
        scrub: 1,
        pin: true,
        snap: 1 / 6,
      },
    })
    tl.to(el, { yPercent: -100 }) // 1 фича вниз
      .to(el, { xPercent: -100 }) // первая вправо
      .to(el, { xPercent: -200 }) // вторая вправо
      .to(el, { yPercent: -200 }) // вниз
      .to(el, { xPercent: -100 }) // влево
      .to(el, { yPercent: -300 }) // вниз
      .to(el, { xPercent: -200 }) // вправо к зоне дропа
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (file) onStart(file)
    },
    [onStart],
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const features = [
    { text: 'Drag & Drop изображений для извлечения палитры', top: 0, left: 0 },
    { text: 'Генерация дизайн-токенов и автоматические оттенки', top: 100, left: 0 },
    { text: 'Проверка контрастности и подсказки коррекции', top: 100, left: 100 },
    { text: 'Превью UI-компонентов в светлой и тёмной теме', top: 100, left: 200 },
    { text: 'Экспорт в CSS variables, Tailwind config и JSON', top: 200, left: 200 },
    { text: 'Сохранение и загрузка пресетов', top: 200, left: 100 },
  ]

  return (
    <>
      <Background />
      <div ref={containerRef} className="landing-container">
        <div className="landing-sections">
          {features.map(({ text, top, left }) => (
            <section
              key={text}
              className="panel"
              style={{ top: `${top}vh`, left: `${left}vw` }}
            >
              <div>{text}</div>
            </section>
          ))}
          <section
            className="panel"
            style={{ top: '300vh', left: '200vw' }}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <div>Перенесите изображение сюда</div>
          </section>
        </div>
      </div>
    </>
  )
}
