import { useState } from 'react'

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority, dueDate || null)
    setText('')
    setDueDate('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <div className="add-row">
        <input
          className="add-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="할 일을 입력하세요..."
          autoFocus
        />
        <button className="add-btn" type="submit" disabled={!text.trim()}>
          추가
        </button>
      </div>
      <div className="add-meta">
        <div className="priority-group">
          {['high', 'medium', 'low'].map(p => (
            <button
              key={p}
              type="button"
              className={`p-btn${priority === p ? ` active-${p}` : ''}`}
              onClick={() => setPriority(p)}
            >
              {p === 'high' ? '높음' : p === 'medium' ? '보통' : '낮음'}
            </button>
          ))}
        </div>
        <input
          type="date"
          className="due-input"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
    </form>
  )
}
