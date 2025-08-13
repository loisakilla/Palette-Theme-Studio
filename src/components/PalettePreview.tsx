import { useSelector } from 'react-redux'
import type {RootState} from '../store'

export default function PalettePreview() {
  const colors = useSelector((state: RootState) => state.palette.colors)

  if (colors.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      {colors.map((c) => (
        <div
          key={c}
          style={{
            background: c,
            width: '40px',
            height: '40px',
            border: '1px solid #ccc',
          }}
          title={c}
        />
      ))}
    </div>
  )
}

