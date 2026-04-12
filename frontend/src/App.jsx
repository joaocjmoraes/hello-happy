import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  atualizarBrinquedo,
  atualizarCategoria,
  buscarBrinquedo,
  buscarBrinquedos,
  criarBrinquedo,
  criarCategoria,
  excluirBrinquedo,
  excluirCategoria,
  listarBrinquedos,
  listarBrinquedosPorCategoria,
  listarCategorias,
  listarDestaques,
} from './services/api'

const emptyToyForm = {
  id: '',
  codigo: '',
  descricao: '',
  detalhes: '',
  marca: '',
  imagemUrl: '',
  valor: '',
  categoriaId: '',
}

const emptyCategoryForm = {
  id: '',
  nome: '',
  imagemUrl: '',
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const imageColors = [
  ['10b981', 'ffffff'],
  ['f97316', 'ffffff'],
  ['facc15', '252525'],
  ['38bdf8', '252525'],
  ['ef4444', 'ffffff'],
  ['14b8a6', 'ffffff'],
]

function imageFromText(text, index, size = '640x420') {
  const [background, foreground] = imageColors[index % imageColors.length]
  const label = encodeURIComponent(text || 'Hello Happy')

  return `https://placehold.co/${size}/${background}/${foreground}?text=${label}`
}

function productImage(brinquedo, index) {
  if (brinquedo.imagemUrl?.startsWith('http')) {
    return brinquedo.imagemUrl
  }

  return imageFromText(brinquedo.descricao, index)
}

function toyPayload(form) {
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

function toyToForm(brinquedo) {
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

function categoryToForm(categoria) {
  return {
    id: categoria.id,
    nome: categoria.nome ?? '',
    imagemUrl: categoria.imagemUrl ?? '',
  }
}

function App() {
  const [secao, setSecao] = useState('loja')
  const [brinquedos, setBrinquedos] = useState([])
  const [destaques, setDestaques] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas')
  const [busca, setBusca] = useState('')
  const [buscaAtiva, setBuscaAtiva] = useState('')
  const [detalhe, setDetalhe] = useState(null)
  const [status, setStatus] = useState('carregando')
  const [mensagem, setMensagem] = useState('')
  const [toyForm, setToyForm] = useState(emptyToyForm)
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm)

  const carregarBase = useCallback(async () => {
    try {
      const [categoriasData, destaquesData] = await Promise.all([
        listarCategorias(),
        listarDestaques(),
      ])

      setCategorias(categoriasData)
      setDestaques(destaquesData)
      setStatus('pronto')
    } catch (error) {
      setMensagem(error.message)
      setStatus('erro')
    }
  }, [])

  const carregarBrinquedos = useCallback(async () => {
    try {
      let data

      if (buscaAtiva.trim()) {
        data = await buscarBrinquedos(buscaAtiva.trim())
      } else if (categoriaSelecionada !== 'todas') {
        data = await listarBrinquedosPorCategoria(categoriaSelecionada)
      } else {
        data = await listarBrinquedos()
      }

      setBrinquedos(data)
      setStatus('pronto')
    } catch (error) {
      setMensagem(error.message)
      setStatus('erro')
    }
  }, [buscaAtiva, categoriaSelecionada])

  async function atualizarTudo() {
    await carregarBase()
    await carregarBrinquedos()
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void carregarBase()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [carregarBase])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void carregarBrinquedos()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [carregarBrinquedos])

  const totalCatalogo = useMemo(
    () => new Set([...brinquedos, ...destaques].map((item) => item.id)).size,
    [brinquedos, destaques],
  )

  function selecionarCategoria(categoriaId) {
    setStatus('carregando')
    setMensagem('')
    setBusca('')
    setBuscaAtiva('')
    setCategoriaSelecionada(categoriaId)
  }

  function enviarBusca(event) {
    event.preventDefault()
    setStatus('carregando')
    setMensagem('')
    setCategoriaSelecionada('todas')
    setBuscaAtiva(busca)
  }

  async function abrirDetalhe(brinquedo) {
    try {
      setDetalhe(await buscarBrinquedo(brinquedo.id))
    } catch (error) {
      setMensagem(error.message)
    }
  }

  async function salvarBrinquedo(event) {
    event.preventDefault()

    try {
      if (toyForm.id) {
        await atualizarBrinquedo(toyForm.id, toyPayload(toyForm))
        setMensagem('Brinquedo atualizado.')
      } else {
        await criarBrinquedo(toyPayload(toyForm))
        setMensagem('Brinquedo cadastrado.')
      }

      setToyForm(emptyToyForm)
      await atualizarTudo()
    } catch (error) {
      setMensagem(error.message)
    }
  }

  async function removerBrinquedo(id) {
    try {
      await excluirBrinquedo(id)
      setMensagem('Brinquedo removido.')
      await atualizarTudo()
    } catch (error) {
      setMensagem(error.message)
    }
  }

  async function salvarCategoria(event) {
    event.preventDefault()

    try {
      if (categoryForm.id) {
        await atualizarCategoria(categoryForm.id, {
          nome: categoryForm.nome.trim(),
          imagemUrl: categoryForm.imagemUrl.trim(),
        })
        setMensagem('Categoria atualizada.')
      } else {
        await criarCategoria({
          nome: categoryForm.nome.trim(),
          imagemUrl: categoryForm.imagemUrl.trim(),
        })
        setMensagem('Categoria cadastrada.')
      }

      setCategoryForm(emptyCategoryForm)
      await atualizarTudo()
    } catch (error) {
      setMensagem(error.message)
    }
  }

  async function removerCategoria(id) {
    try {
      await excluirCategoria(id)
      setMensagem('Categoria removida.')
      await atualizarTudo()
    } catch (error) {
      setMensagem(error.message)
    }
  }

  return (
    <main className="app-shell">
      <nav className="nav-bar" aria-label="Principal">
        <strong>Hello Happy</strong>
        <div>
          {['loja', 'admin'].map((item) => (
            <button
              className={secao === item ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setSecao(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <header className="hero-band">
        <div>
         
          <h1>Brinquedos coloridos, busca rapida e painel de cadastro.</h1>
         
        </div>

        <aside className="stats-panel">
          <span>{totalCatalogo}</span>
          <p>itens carregados</p>
          <small>{categorias.length} categorias ativas</small>
        </aside>
      </header>

      {mensagem && (
        <p className={status === 'erro' ? 'notice danger' : 'notice'}>
          {mensagem}
        </p>
      )}

      {secao === 'loja' && (
        <>
          <section className="toolbar" aria-label="Busca e categorias">
            <form className="search-form" onSubmit={enviarBusca}>
              <input
                aria-label="Buscar brinquedo"
                placeholder="Buscar por nome ou marca"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
              />
              <button type="submit">Buscar</button>
              {buscaAtiva && (
                <button
                  className="ghost"
                  type="button"
                  onClick={() => {
                    setBusca('')
                    setBuscaAtiva('')
                  }}
                >
                  Limpar
                </button>
              )}
            </form>

            <div className="filter-row">
              <button
                className={categoriaSelecionada === 'todas' ? 'active' : ''}
                type="button"
                onClick={() => selecionarCategoria('todas')}
              >
                Todos
              </button>
              {categorias.map((categoria) => (
                <button
                  className={
                    categoriaSelecionada === String(categoria.id)
                      ? 'active'
                      : ''
                  }
                  key={categoria.id}
                  type="button"
                  onClick={() => selecionarCategoria(String(categoria.id))}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <p>Destaques</p>
              <h2>Novidades no catalogo</h2>
            </div>
            <div className="highlight-strip">
              {destaques.map((brinquedo, index) => (
                <button
                  className="highlight-card"
                  key={brinquedo.id}
                  type="button"
                  onClick={() => abrirDetalhe(brinquedo)}
                >
                  <img alt="" src={productImage(brinquedo, index)} />
                  <span>{brinquedo.descricao}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <p>Vitrine</p>
              <h2>{buscaAtiva ? `Busca por "${buscaAtiva}"` : 'Brinquedos'}</h2>
            </div>

            {status === 'carregando' && (
              <p className="notice">Carregando dados...</p>
            )}

            <div className="product-grid">
              {brinquedos.map((brinquedo, index) => (
                <article className="product-card" key={brinquedo.id}>
                  <img
                    alt=""
                    height="420"
                    src={productImage(brinquedo, index)}
                    width="640"
                  />
                  <div>
                    <p>{brinquedo.categoria?.nome}</p>
                    <h3>{brinquedo.descricao}</h3>
                    <span>{brinquedo.marca || 'Marca nao informada'}</span>
                    <strong>{currency.format(Number(brinquedo.valor))}</strong>
                    <button type="button" onClick={() => abrirDetalhe(brinquedo)}>
                      Ver detalhes
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {secao === 'admin' && (
        <section className="admin-grid" aria-label="Administracao">
          <AdminPanel title="Brinquedos">
            <ToyForm
              categorias={categorias}
              form={toyForm}
              setForm={setToyForm}
              onSubmit={salvarBrinquedo}
              onCancel={() => setToyForm(emptyToyForm)}
            />
            <ItemList
              items={brinquedos}
              label={(item) => `${item.codigo} - ${item.descricao}`}
              onEdit={(item) => setToyForm(toyToForm(item))}
              onRemove={(item) => removerBrinquedo(item.id)}
            />
          </AdminPanel>

          <AdminPanel title="Categorias">
            <CategoryForm
              form={categoryForm}
              setForm={setCategoryForm}
              onSubmit={salvarCategoria}
              onCancel={() => setCategoryForm(emptyCategoryForm)}
            />
            <ItemList
              items={categorias}
              label={(item) => item.nome}
              onEdit={(item) => setCategoryForm(categoryToForm(item))}
              onRemove={(item) => removerCategoria(item.id)}
            />
          </AdminPanel>
        </section>
      )}

      {detalhe && (
        <div className="modal-backdrop" role="presentation">
          <article className="detail-modal" role="dialog" aria-modal="true">
            <button
              className="close-button"
              type="button"
              onClick={() => setDetalhe(null)}
            >
              Fechar
            </button>
            <img alt="" src={productImage(detalhe, detalhe.id)} />
            <div>
              <p>{detalhe.categoria?.nome}</p>
              <h2>{detalhe.descricao}</h2>
              <span>{detalhe.codigo}</span>
              <p>{detalhe.detalhes}</p>
              <strong>{currency.format(Number(detalhe.valor))}</strong>
            </div>
          </article>
        </div>
      )}
    </main>
  )
}

function AdminPanel({ children, title }) {
  return (
    <article className="admin-panel">
      <h2>{title}</h2>
      {children}
    </article>
  )
}

function Field({ label, ...props }) {
  return (
    <label>
      <span>{label}</span>
      <input {...props} />
    </label>
  )
}

function ToyForm({ categorias, form, onCancel, onSubmit, setForm }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <Field
        disabled={Boolean(form.id)}
        label="Codigo"
        required
        value={form.codigo}
        onChange={(event) => setForm({ ...form, codigo: event.target.value })}
      />
      <Field
        label="Descricao"
        required
        value={form.descricao}
        onChange={(event) =>
          setForm({ ...form, descricao: event.target.value })
        }
      />
      <Field
        label="Marca"
        value={form.marca}
        onChange={(event) => setForm({ ...form, marca: event.target.value })}
      />
      <Field
        label="Valor"
        min="0.01"
        required
        step="0.01"
        type="number"
        value={form.valor}
        onChange={(event) => setForm({ ...form, valor: event.target.value })}
      />
      <label>
        <span>Categoria</span>
        <select
          required
          value={form.categoriaId}
          onChange={(event) =>
            setForm({ ...form, categoriaId: event.target.value })
          }
        >
          <option value="">Selecione</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </label>
      <Field
        label="Imagem URL"
        value={form.imagemUrl}
        onChange={(event) =>
          setForm({ ...form, imagemUrl: event.target.value })
        }
      />
      <label className="wide">
        <span>Detalhes</span>
        <textarea
          value={form.detalhes}
          onChange={(event) =>
            setForm({ ...form, detalhes: event.target.value })
          }
        />
      </label>
      <FormActions editing={Boolean(form.id)} onCancel={onCancel} />
    </form>
  )
}

function CategoryForm({ form, onCancel, onSubmit, setForm }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <Field
        label="Nome"
        required
        value={form.nome}
        onChange={(event) => setForm({ ...form, nome: event.target.value })}
      />
      <Field
        label="Imagem URL"
        value={form.imagemUrl}
        onChange={(event) =>
          setForm({ ...form, imagemUrl: event.target.value })
        }
      />
      <FormActions editing={Boolean(form.id)} onCancel={onCancel} />
    </form>
  )
}

function FormActions({ editing, onCancel }) {
  return (
    <div className="form-actions">
      <button type="submit">{editing ? 'Salvar' : 'Cadastrar'}</button>
      {editing && (
        <button className="ghost" type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </div>
  )
}

function ItemList({ items, label, onEdit, onRemove }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <div className="item-row" key={item.id}>
          <span>{label(item)}</span>
          <div>
            <button type="button" onClick={() => onEdit(item)}>
              Editar
            </button>
            <button className="danger-button" type="button" onClick={() => onRemove(item)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
