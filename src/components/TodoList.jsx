import TodoItem from './TodoItem'

const EMPTY = {
  all:       { icon: '📋', title: '할 일이 없어요', desc: '위에서 첫 번째 할 일을 추가해보세요!' },
  active:    { icon: '🎉', title: '모두 완료했어요!', desc: '진행 중인 할 일이 없습니다.' },
  completed: { icon: '🗂️', title: '완료된 항목 없음', desc: '완료한 할 일이 여기에 표시됩니다.' },
  search:    { icon: '🔍', title: '검색 결과 없음', desc: '다른 키워드로 검색해보세요.' },
}

export default function TodoList({ todos, onToggle, onDelete, onUpdate, filter, search }) {
  if (todos.length === 0) {
    const key = search ? 'search' : filter
    const e = EMPTY[key] || EMPTY.all
    return (
      <div className="empty-state">
        <span className="empty-icon">{e.icon}</span>
        <p className="empty-title">{e.title}</p>
        <p className="empty-desc">{e.desc}</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
