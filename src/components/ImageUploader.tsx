import {type ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import type {AppDispatch} from '../store'
import { setColors } from '../features/paletteSlice'
import { extractPalette } from '../utils/palette'

export default function ImageUploader() {
  const dispatch = useDispatch<AppDispatch>()

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return
      const colors = await extractPalette(file)
      dispatch(setColors(colors))
    },
    [dispatch],
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    void handleFile(file)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  )
}

