const sections = ['loja', 'admin']

export function MainNav({ activeSection, onSectionChange }) {
  return (
    <nav className="nav-bar" aria-label="Principal">
      <strong>Hello Happy</strong>
      <div>
        {sections.map((section) => (
          <button
            className={activeSection === section ? 'active' : ''}
            key={section}
            type="button"
            onClick={() => onSectionChange(section)}
          >
            {section}
          </button>
        ))}
      </div>
    </nav>
  )
}
