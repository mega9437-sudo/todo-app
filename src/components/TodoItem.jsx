import { useState } from 'react'

function formatDue(dateStr) {
  if (!dateStr) return null
  const due = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = (due - today) / (1000 * 60 * 60 * 24)
  if (diff < 0) return { label: `${dateStr} (지남)`, cls: 'overdue' }
  if (diff === 0) return { label: '오늘 마감', cls: 'due-today' }
  if (diff === 1) return { label: '내일 마감', cls: '' }
  return { label: `${dateStr} 마감`, cls: '' }
}

const PRIORITY_LABEL = { high: '높음', medium: '보통', low: '낮음' }

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDue, setEditDue] = useState(todo.dueDate || '')

  function saveEdit() {
    if (!editText.trim()) return
    onUpdate(todo.id, { text: editText.trim(), priority: editPriority, dueDate: editDue || null })
    setEditing(false)
  }

  function cancelEdit() {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setEditDue(todo.dueDate || '')
    setEditing(false)
  }

  const due = formatDue(todo.dueDate)

  return (
    <div
      className={`todo-item${todo.completed ? ' done' : ''}`}
      data-p={todo.priority}
    >
      <input
        type="checkbox"
        className="todo-check"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editing ? (
        <div className="edit-form">
          <input
            className="edit-input"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
            autoFocus
          />
          <div className="edit-meta">
            <div className="priority-group">
              {['high', 'medium', 'low'].map(p => (
                <button
                  key={p}
                  type="button"
                  className={`p-btn${editPriority === p ? ` active-${p}` : ''}`}
                  onClick={() => setEditPriority(p)}
                >
                  {PRIORITY_LABEL[p]}
                </button>
              ))}
            </div>
            <input
              type="date"
              className="due-input"
              value={editDue}
              onChange={e => setEditDue(e.target.value)}
            />
          </div>
          <div className="edit-actions">
            <button className="save-btn" onClick={saveEdit}>저장</button>
            <button className="cancel-btn" onClick={cancelEdit}>취소</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <span className="todo-text">{todo.text}</span>
          <div className="todo-badges">
            <span className="p-badge" data-p={todo.priority}>{PRIORITY_LABEL[todo.priority]}</span>
            {due && <span className={`due-badge ${due.cls}`}>{due.label}</span>}
          </div>
        </div>
      )}
      {!editing && (
        <div className="todo-actions">
          <button className="act-btn" onClick={() => setEditing(true)} title="수정">✏️</button>
          <button className="act-btn del" onClick={() => onDelete(todo.id)} title="삭제">🗑️</button>
        </div>
      )}
    </div>
  )
}
