import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { DetailModal } from './components/catalog/DetailModal'
import { Storefront } from './components/catalog/Storefront'
import { Hero } from './components/layout/Hero'
import { MainNav } from './components/layout/MainNav'
import { Notice } from './components/shared/Notice'
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
import {
  categoryToForm,
  emptyCategoryForm,
  emptyToyForm,
  toyPayload,
  toyToForm,
} from './utils/forms'

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

 

  async function atualizarTudo() {
    await carregarBase()
    await carregarBrinquedos()
  }

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

  function limparBusca() {
    setBusca('')
    setBuscaAtiva('')
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
      <MainNav activeSection={secao} onSectionChange={setSecao} />

      <Hero />

      <Notice danger={status === 'erro'} message={mensagem} />

      {secao === 'loja' && (
        <Storefront
          busca={busca}
          buscaAtiva={buscaAtiva}
          brinquedos={brinquedos}
          categoriaSelecionada={categoriaSelecionada}
          categorias={categorias}
          destaques={destaques}
          onBuscaChange={setBusca}
          onClearSearch={limparBusca}
          onOpenDetail={abrirDetalhe}
          onSearchSubmit={enviarBusca}
          onSelectCategory={selecionarCategoria}
          status={status}
        />
      )}

      {secao === 'admin' && (
        <AdminDashboard
          brinquedos={brinquedos}
          categorias={categorias}
          categoryForm={categoryForm}
          onCancelCategory={() => setCategoryForm(emptyCategoryForm)}
          onCancelToy={() => setToyForm(emptyToyForm)}
          onCategoryFormChange={setCategoryForm}
          onEditCategory={(categoria) =>
            setCategoryForm(categoryToForm(categoria))
          }
          onEditToy={(brinquedo) => setToyForm(toyToForm(brinquedo))}
          onRemoveCategory={removerCategoria}
          onRemoveToy={removerBrinquedo}
          onSaveCategory={salvarCategoria}
          onSaveToy={salvarBrinquedo}
          onToyFormChange={setToyForm}
          toyForm={toyForm}
        />
      )}

      <DetailModal brinquedo={detalhe} onClose={() => setDetalhe(null)} />
    </main>
  )
}

export default App
