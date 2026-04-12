const imageColors = [
  ['10b981', 'ffffff'],
  ['f97316', 'ffffff'],
  ['facc15', '252525'],
  ['38bdf8', '252525'],
  ['ef4444', 'ffffff'],
  ['14b8a6', 'ffffff'],
]

export const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function imageFromText(text, index, size = '640x420') {
  const [background, foreground] = imageColors[index % imageColors.length]
  const label = encodeURIComponent(text || 'Hello Happy')

  return `https://placehold.co/${size}/${background}/${foreground}?text=${label}`
}

export function productImage(brinquedo, index) {
  if (brinquedo.imagemUrl?.startsWith('http')) {
    return brinquedo.imagemUrl
  }

  return imageFromText(brinquedo.descricao, index)
}
