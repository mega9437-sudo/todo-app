import { useState, useEffect } from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'

const STORAGE_KEY = 'claude-todos'
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(load)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('dark-mode', String(darkMode))
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  function addTodo(text, priority, dueDate) {
    const now = new Date().toISOString()
    setTodos(prev => [{
      id: uid(),
      text: text.trim(),
      completed: false,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdAt: now,
    }, ...prev])
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function updateTodo(id, updates) {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const visible = todos
    .filter(t => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })
    .filter(t =>
      !search || t.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case 'priority': return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        case 'due':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'name': return a.text.localeCompare(b.text)
        default: return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  return (
    <div className="app">
      <Header
        darkMode={darkMode}
        onToggle={() => setDarkMode(d => !d)}
        stats={stats}
      />
      <main className="main">
        <AddTodo onAdd={addTodo} />
        <FilterBar
          filter={filter}
          onFilter={setFilter}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          completedCount={stats.completed}
          onClearCompleted={clearCompleted}
          stats={stats}
        />
        <TodoList
          todos={visible}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          filter={filter}
          search={search}
        />
      </main>
    </div>
  )
}
