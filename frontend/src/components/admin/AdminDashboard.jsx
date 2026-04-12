import { AdminPanel } from './AdminPanel'
import { CategoryForm } from './CategoryForm'
import { ItemList } from './ItemList'
import { ToyForm } from './ToyForm'

export function AdminDashboard({
  brinquedos,
  categorias,
  categoryForm,
  onCancelCategory,
  onCancelToy,
  onCategoryFormChange,
  onEditCategory,
  onEditToy,
  onRemoveCategory,
  onRemoveToy,
  onSaveCategory,
  onSaveToy,
  onToyFormChange,
  toyForm,
}) {
  return (
    <section className="admin-grid" aria-label="Administracao">
      <AdminPanel title="Brinquedos">
        <ToyForm
          categorias={categorias}
          form={toyForm}
          onCancel={onCancelToy}
          onChange={onToyFormChange}
          onSubmit={onSaveToy}
        />
        <ItemList
          items={brinquedos}
          label={(item) => `${item.codigo} - ${item.descricao}`}
          onEdit={onEditToy}
          onRemove={(item) => onRemoveToy(item.id)}
        />
      </AdminPanel>

      <AdminPanel title="Categorias">
        <CategoryForm
          form={categoryForm}
          onCancel={onCancelCategory}
          onChange={onCategoryFormChange}
          onSubmit={onSaveCategory}
        />
        <ItemList
          items={categorias}
          label={(item) => item.nome}
          onEdit={onEditCategory}
          onRemove={(item) => onRemoveCategory(item.id)}
        />
      </AdminPanel>
    </section>
  )
}
