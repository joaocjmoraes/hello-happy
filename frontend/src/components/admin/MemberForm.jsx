import { Field } from './Field'
import { FormActions } from './FormActions'

export function MemberForm({ form, onCancel, onChange, onSubmit }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <Field
        label="Nome"
        required
        value={form.nome}
        onChange={(event) => onChange({ ...form, nome: event.target.value })}
      />
      <Field
        label="RA"
        required
        value={form.ra}
        onChange={(event) => onChange({ ...form, ra: event.target.value })}
      />
      <Field
        label="Foto URL"
        value={form.fotoUrl}
        onChange={(event) => onChange({ ...form, fotoUrl: event.target.value })}
      />
      <FormActions editing={Boolean(form.id)} onCancel={onCancel} />
    </form>
  )
}
