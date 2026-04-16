export const emptyToyForm = {
  id: '',
  codigo: '',
  descricao: '',
  detalhes: '',
  marca: '',
  imagemUrl: '',
  valor: '',
  categoriaId: '',
}

export const emptyCategoryForm = {
  id: '',
  nome: '',
  imagemUrl: '',
}

export function toyPayload(form) {
  return {
    codigo: form.codigo.trim(),
    descricao: form.descricao.trim(),
    detalhes: form.detalhes.trim(),
    marca: form.marca.trim(),
    imagemUrl: form.imagemUrl.trim(),
    valor: Number(form.valor),
    categoria: {
      id: Number(form.categoriaId),
    },
  }
}

export function toyToForm(brinquedo) {
  return {
    id: brinquedo.id,
    codigo: brinquedo.codigo ?? '',
    descricao: brinquedo.descricao ?? '',
    detalhes: brinquedo.detalhes ?? '',
    marca: brinquedo.marca ?? '',
    imagemUrl: brinquedo.imagemUrl ?? '',
    valor: String(brinquedo.valor ?? ''),
    categoriaId: String(brinquedo.categoria?.id ?? ''),
  }
}

export function categoryToForm(categoria) {
  return {
    id: categoria.id,
    nome: categoria.nome ?? '',
    imagemUrl: categoria.imagemUrl ?? '',
  }
}

export const emptyMemberForm = {
  id: '',
  nome: '',
  ra: '',
  fotoUrl: '',
}

export function memberPayload(form) {
  return {
    nome: form.nome.trim(),
    ra: form.ra.trim(),
    fotoUrl: form.fotoUrl.trim(),
  }
}

export function memberToForm(membro) {
  return {
    id: membro.id,
    nome: membro.nome ?? '',
    ra: membro.ra ?? '',
    fotoUrl: membro.fotoUrl ?? '',
  }
}
