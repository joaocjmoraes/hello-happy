import { currency, productImage } from '../../utils/catalog'

export function Storefront({
  busca,
  buscaAtiva,
  brinquedos,
  categoriaSelecionada,
  categorias,
  destaques,
  onBuscaChange,
  onClearSearch,
  onOpenDetail,
  onSearchSubmit,
  onSelectCategory,
  status,
}) {
  return (
    <>
      <section className="toolbar" aria-label="Busca e categorias">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            aria-label="Buscar brinquedo"
            placeholder="Buscar por nome ou marca"
            value={busca}
            onChange={(event) => onBuscaChange(event.target.value)}
          />
          <button type="submit">Buscar</button>
          {buscaAtiva && (
            <button className="ghost" type="button" onClick={onClearSearch}>
              Limpar
            </button>
          )}
        </form>

        <div className="filter-row">
          <button
            className={categoriaSelecionada === 'todas' ? 'active' : ''}
            type="button"
            onClick={() => onSelectCategory('todas')}
          >
            Todos
          </button>
          {categorias.map((categoria) => (
            <button
              className={
                categoriaSelecionada === String(categoria.id) ? 'active' : ''
              }
              key={categoria.id}
              type="button"
              onClick={() => onSelectCategory(String(categoria.id))}
            >
              {categoria.nome}
            </button>
          ))}
        </div>
      </section>

      <HighlightsSection destaques={destaques} onOpenDetail={onOpenDetail} />
      <ProductsSection
        buscaAtiva={buscaAtiva}
        brinquedos={brinquedos}
        onOpenDetail={onOpenDetail}
        status={status}
      />
    </>
  )
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

function HighlightsSection({ destaques, onOpenDetail }) {
  return (
    <section className="section-block">
      <SectionHeading eyebrow="Destaques" title="Novidades no catalogo" />
      <div className="highlight-strip">
        {destaques.map((brinquedo, index) => (
          <button
            className="highlight-card"
            key={brinquedo.id}
            type="button"
            onClick={() => onOpenDetail(brinquedo)}
          >
            <img alt="" src={productImage(brinquedo, index)} />
            <span>{brinquedo.descricao}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function ProductsSection({ buscaAtiva, brinquedos, onOpenDetail, status }) {
  const title = buscaAtiva ? `Busca por "${buscaAtiva}"` : 'Brinquedos'

  return (
    <section className="section-block">
      <SectionHeading eyebrow="Vitrine" title={title} />

      {status === 'carregando' && (
        <p className="notice">Carregando dados...</p>
      )}

      <div className="product-grid">
        {brinquedos.map((brinquedo, index) => (
          <ProductCard
            brinquedo={brinquedo}
            imageIndex={index}
            key={brinquedo.id}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ brinquedo, imageIndex, onOpenDetail }) {
  return (
    <article className="product-card">
      <img
        alt=""
        height="420"
        src={productImage(brinquedo, imageIndex)}
        width="640"
      />
      <div>
        <p>{brinquedo.categoria?.nome}</p>
        <h3>{brinquedo.descricao}</h3>
        <span>{brinquedo.marca || 'Marca nao informada'}</span>
        <strong>{currency.format(Number(brinquedo.valor))}</strong>
        <button type="button" onClick={() => onOpenDetail(brinquedo)}>
          Ver detalhes
        </button>
      </div>
    </article>
  )
}
