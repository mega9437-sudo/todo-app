export default function Header({ darkMode, onToggle, stats }) {
  const pct = stats.total > 0 ? Math.round(stats.completed / stats.total * 100) : 0

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-title">
          <h1>Todos</h1>
          <span className="header-subtitle">Stay organized, get things done</span>
        </div>
        <button
          className="theme-toggle"
          onClick={onToggle}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="header-stats">
        <div className="stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>
      {stats.total > 0 && (
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-pct">{pct}%</span>
        </div>
      )}
    </header>
  )
}
