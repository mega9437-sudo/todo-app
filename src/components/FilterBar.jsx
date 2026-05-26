export default function FilterBar({
  filter, onFilter,
  search, onSearch,
  sort, onSort,
  completedCount, onClearCompleted,
  stats,
}) {
  const counts = {
    all: stats?.total ?? 0,
    active: stats?.active ?? 0,
    completed: stats?.completed ?? 0,
  }

  return (
    <div className="filter-bar">
      <div className="filter-top">
        <div className="filter-tabs">
          {[['all', '전체'], ['active', '진행중'], ['completed', '완료']].map(([key, label]) => (
            <button
              key={key}
              className={`f-tab${filter === key ? ' active' : ''}`}
              onClick={() => onFilter(key)}
            >
              {label}
              <span className="f-count">{counts[key]}</span>
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button className="clear-btn" onClick={onClearCompleted}>
            완료 삭제
          </button>
        )}
      </div>
      <div className="filter-bottom">
        <input
          className="search-input"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="검색..."
        />
        <select className="sort-select" value={sort} onChange={e => onSort(e.target.value)}>
          <option value="newest">최신순</option>
          <option value="priority">우선순위순</option>
          <option value="due">마감일순</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  )
}
