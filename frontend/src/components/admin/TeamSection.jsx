import { AdminPanel } from './AdminPanel'
import { MemberForm } from './MemberForm'
import { MemberList } from './MemberList'

export function TeamSection({
  membros,
  memberForm,
  onCancelMember,
  onEditMember,
  onMemberFormChange,
  onRemoveMember,
  onSaveMember,
}) {
  return (
    <section aria-label="Equipe">
      <AdminPanel title="Equipe">
        <MemberForm
          form={memberForm}
          onCancel={onCancelMember}
          onChange={onMemberFormChange}
          onSubmit={onSaveMember}
        />
        <MemberList
          items={membros}
          onEdit={onEditMember}
          onRemove={(item) => onRemoveMember(item.id)}
        />
      </AdminPanel>
    </section>
  )
}
