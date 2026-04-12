export function ItemList({ items, label, onEdit, onRemove }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <div className="item-row" key={item.id}>
          <span>{label(item)}</span>
          <div>
            <button type="button" onClick={() => onEdit(item)}>
              Editar
            </button>
            <button
              className="danger-button"
              type="button"
              onClick={() => onRemove(item)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
