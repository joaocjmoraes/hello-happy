import { Field } from './Field'
import { FormActions } from './FormActions'

export function CategoryForm({ form, onCancel, onChange, onSubmit }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <Field
        label="Nome"
        required
        value={form.nome}
        onChange={(event) => onChange({ ...form, nome: event.target.value })}
      />
      <Field
        label="Imagem URL"
        value={form.imagemUrl}
        onChange={(event) =>
          onChange({ ...form, imagemUrl: event.target.value })
        }
      />
      <FormActions editing={Boolean(form.id)} onCancel={onCancel} />
    </form>
  )
}
