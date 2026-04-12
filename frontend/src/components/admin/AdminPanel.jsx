export function AdminPanel({ children, title }) {
  return (
    <article className="admin-panel">
      <h2>{title}</h2>
      {children}
    </article>
  )
}
