import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import type { RootState } from '../store'

export default function PalettePreview() {
  const colors = useSelector((state: RootState) => state.palette.colors)

  const copy = useCallback((c: string) => {
    void navigator.clipboard.writeText(c)
  }, [])

  if (colors.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      {colors.map((c) => (
        <div
          key={c}
          onClick={() => copy(c)}
          style={{ cursor: 'pointer', textAlign: 'center' }}
        >
          <div
            style={{
              background: c,
              width: '60px',
              height: '60px',
              border: '1px solid #ccc',
              marginBottom: '0.25rem',
            }}
            title={c}
          />
          <span style={{ fontSize: '0.75rem' }}>{c}</span>
        </div>
      ))}
    </div>
  )
}

