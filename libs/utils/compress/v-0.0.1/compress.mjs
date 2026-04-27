import Pica from 'https://cdn.jsdelivr.net/npm/pica@9/+esm'

const pica = new Pica()

export async function compressImage(file, { maxBytes = 250_000, maxDim = 1536 } = {}) {
  const img = await createImageBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  await pica.resize(img, canvas)

  for (const q of [0.85, 0.75, 0.65, 0.55, 0.5]) {
    const blob = await pica.toBlob(canvas, 'image/jpeg', q)
    if (blob.size <= maxBytes) return blob
  }
  return pica.toBlob(canvas, 'image/jpeg', 0.5)
}
