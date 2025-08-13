import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ImageUploader from './components/ImageUploader'
import PalettePreview from './components/PalettePreview'
import TokenExport from './components/TokenExport'
import LandingPage from './components/LandingPage'

export default function App() {
  const [started, setStarted] = useState(false)
  const [initialFile, setInitialFile] = useState<File | null>(null)

  return (
    <>

      <CustomCursor />
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

