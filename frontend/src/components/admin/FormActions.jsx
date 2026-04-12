export function FormActions({ editing, onCancel }) {
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
