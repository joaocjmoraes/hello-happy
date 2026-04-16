async function request(path, options = {}) {
  const headers = options.body
    ? { 'Content-Type': 'application/json', ...options.headers }
    : options.headers

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  if (!response.ok) {
    const message =
      data.mensagem ??
      data.erro ??
      Object.values(data.campos ?? {}).join(', ') ??
      'Nao foi possivel concluir a operacao.'

    throw new Error(message)
  }

  return data
}

function jsonBody(payload) {
  return JSON.stringify(payload)
}

export function listarBrinquedos() {
  return request('/brinquedos')
}

export function listarDestaques() {
  return request('/brinquedos/destaques')
}

export function buscarBrinquedos(termo) {
  return request(`/brinquedos/busca?q=${encodeURIComponent(termo)}`)
}

export function listarBrinquedosPorCategoria(categoriaId) {
  return request(`/brinquedos/categoria/${categoriaId}`)
}

export function buscarBrinquedo(id) {
  return request(`/brinquedos/${id}`)
}

export function criarBrinquedo(brinquedo) {
  return request('/brinquedos', {
    method: 'POST',
    body: jsonBody(brinquedo),
  })
}

export function atualizarBrinquedo(id, brinquedo) {
  return request(`/brinquedos/${id}`, {
    method: 'PUT',
    body: jsonBody(brinquedo),
  })
}

export function excluirBrinquedo(id) {
  return request(`/brinquedos/${id}`, {
    method: 'DELETE',
  })
}

export function listarCategorias() {
  return request('/categorias')
}

export function criarCategoria(categoria) {
  return request('/categorias', {
    method: 'POST',
    body: jsonBody(categoria),
  })
}

export function atualizarCategoria(id, categoria) {
  return request(`/categorias/${id}`, {
    method: 'PUT',
    body: jsonBody(categoria),
  })
}

export function excluirCategoria(id) {
  return request(`/categorias/${id}`, {
    method: 'DELETE',
  })
}

export function listarEquipe() {
  return request('/equipe')
}

export function criarMembro(membro) {
  return request('/equipe', {
    method: 'POST',
    body: jsonBody(membro),
  })
}

export function atualizarMembro(id, membro) {
  return request(`/equipe/${id}`, {
    method: 'PUT',
    body: jsonBody(membro),
  })
}

export function excluirMembro(id) {
  return request(`/equipe/${id}`, {
    method: 'DELETE',
  })
}
