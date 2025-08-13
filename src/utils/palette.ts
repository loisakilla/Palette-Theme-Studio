import quantize from 'quantize'

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
  )
}

export async function extractPalette(
  file: File,
  colorCount = 6,
): Promise<string[]> {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.src = url
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return []
  ctx.drawImage(img, 0, 0)
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels: number[][] = []
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a > 0) pixels.push([r, g, b])
  }
  const cmap = quantize(pixels, colorCount)
  if (!cmap) return []
  return cmap.palette().map(([r, g, b]) => rgbToHex(r, g, b))
}

export function buildCssVariables(colors: string[]): string {
  const lines = colors.map((c, i) => `  --color-${i + 1}: ${c};`)
  return `:root {\n${lines.join('\n')}\n}`
}

export function buildJson(colors: string[]): string {
  const obj = colors.reduce<Record<string, string>>((acc, c, i) => {
    acc[`color-${i + 1}`] = c
    return acc
  }, {})
  return JSON.stringify(obj, null, 2)
}

