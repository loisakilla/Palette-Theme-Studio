import ImageUploader from './components/ImageUploader'
import PalettePreview from './components/PalettePreview'
import TokenExport from './components/TokenExport'

export default function App() {
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Palette Theme Studio</h1>
      <ImageUploader />
      <PalettePreview />
      <TokenExport />
    </div>
  )
}

