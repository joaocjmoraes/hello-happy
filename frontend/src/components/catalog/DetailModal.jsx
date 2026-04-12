import { currency, productImage } from '../../utils/catalog'

export function DetailModal({ brinquedo, onClose }) {
  if (!brinquedo) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <article className="detail-modal" role="dialog" aria-modal="true">
        <button className="close-button" type="button" onClick={onClose}>
          Fechar
        </button>
        <img alt="" src={productImage(brinquedo, brinquedo.id)} />
        <div>
          <p>{brinquedo.categoria?.nome}</p>
          <h2>{brinquedo.descricao}</h2>
          <span>{brinquedo.codigo}</span>
          <p>{brinquedo.detalhes}</p>
          <strong>{currency.format(Number(brinquedo.valor))}</strong>
        </div>
      </article>
    </div>
  )
}
