import { useSelector } from 'react-redux'
import type {RootState} from '../store'
import { buildCssVariables, buildJson } from '../utils/palette'

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function TokenExport() {
  const colors = useSelector((s: RootState) => s.palette.colors)
  if (colors.length === 0) return null

  const exportCss = () => {
    download('tokens.css', buildCssVariables(colors))
  }

  const exportJson = () => {
    download('tokens.json', buildJson(colors))
  }

  return (
    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
      <button onClick={exportCss}>Export CSS</button>
      <button onClick={exportJson}>Export JSON</button>
    </div>
  )
}

