import { useState } from 'react'
import AnimatedCursor from 'react-animated-cursor'
import ImageUploader from './components/ImageUploader'
import PalettePreview from './components/PalettePreview'
import TokenExport from './components/TokenExport'
import LandingPage from './components/LandingPage'

export default function App() {
  const [started, setStarted] = useState(false)
  const [initialFile, setInitialFile] = useState<File | null>(null)

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        outerStyle={{ border: '2px dotted #fff' }}
        innerScale={0.7}
        outerScale={2}
      />
      {!started ? (
        <LandingPage
          onStart={(file) => {
            setInitialFile(file)
            setStarted(true)
          }}
        />
      ) : (
        <div style={{ padding: '1rem' }}>
          <h1>Palette Theme Studio</h1>
          <ImageUploader initialFile={initialFile} />
          <PalettePreview />
          <TokenExport />
        </div>
      )}
    </>
  )
}

