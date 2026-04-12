export function Notice({ danger = false, message }) {
  if (!message) {
    return null
  }

  return <p className={danger ? 'notice danger' : 'notice'}>{message}</p>
}
