declare module 'quantize' {
  export default function quantize(
    pixels: number[][],
    colorCount: number,
  ): { palette(): [number, number, number][] } | undefined
}
