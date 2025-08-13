import { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import PalettePreview from './components/PalettePreview'
import TokenExport from './components/TokenExport'
import LandingPage from './components/LandingPage'

export default function App() {
  const [started, setStarted] = useState(false)

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Palette Theme Studio</h1>
      <ImageUploader />
      <PalettePreview />
      <TokenExport />
    </div>
  )
}

