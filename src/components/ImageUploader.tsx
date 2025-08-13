import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { setColors } from '../features/paletteSlice'
import { extractPalette } from '../utils/palette'

interface ImageUploaderProps {
  initialFile?: File | null
}

export default function ImageUploader({ initialFile }: ImageUploaderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return
      if (preview) URL.revokeObjectURL(preview)
      const url = URL.createObjectURL(file)
      setPreview(url)
      const colors = await extractPalette(file)
      dispatch(setColors(colors))
    },
    [dispatch, preview],
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    void handleFile(file)
  }

  useEffect(() => {
    if (initialFile) {
      void handleFile(initialFile)
    }
  }, [initialFile, handleFile])

  return (
    <div>
      <input type="file" accept="image/*" onChange={onChange} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ maxWidth: '300px', marginTop: '1rem', display: 'block' }}
        />
      )}
    </div>
  )
}

