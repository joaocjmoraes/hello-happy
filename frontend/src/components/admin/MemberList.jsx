export function MemberList({ items, onEdit, onRemove }) {
  return (
    <div className="member-grid">
      {items.map((item) => (
        <div className="member-card" key={item.id}>
          {item.fotoUrl ? (
            <img alt={item.nome} src={item.fotoUrl} />
          ) : (
            <div className="member-card-placeholder">
              {item.nome.charAt(0)}
            </div>
          )}
          <div>
            <h3>{item.nome}</h3>
            <span>RA: {item.ra}</span>
            <div className="member-card-actions">
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
        </div>
      ))}
    </div>
  )
}
