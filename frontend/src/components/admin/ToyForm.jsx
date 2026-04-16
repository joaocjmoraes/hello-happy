import { Field } from './Field'
import { FormActions } from './FormActions'

export function ToyForm({ categorias, form, onCancel, onChange, onSubmit }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <Field
        disabled={Boolean(form.id)}
        label="Código"
        required
        value={form.codigo}
        onChange={(event) => onChange({ ...form, codigo: event.target.value })}
      />
      <Field
        label="Descrição"
        required
        value={form.descricao}
        onChange={(event) =>
          onChange({ ...form, descricao: event.target.value })
        }
      />
      <Field
        label="Marca"
        value={form.marca}
        onChange={(event) => onChange({ ...form, marca: event.target.value })}
      />
      <Field
        label="Valor"
        min="0.01"
        required
        step="0.01"
        type="number"
        value={form.valor}
        onChange={(event) => onChange({ ...form, valor: event.target.value })}
      />
      <label>
        <span>Categoria</span>
        <select
          required
          value={form.categoriaId}
          onChange={(event) =>
            onChange({ ...form, categoriaId: event.target.value })
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
          onChange({ ...form, imagemUrl: event.target.value })
        }
      />
      <label className="wide">
        <span>Detalhes</span>
        <textarea
          value={form.detalhes}
          onChange={(event) =>
            onChange({ ...form, detalhes: event.target.value })
          }
        />
      </label>
      <FormActions editing={Boolean(form.id)} onCancel={onCancel} />
    </form>
  )
}
