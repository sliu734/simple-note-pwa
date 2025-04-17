
// Simple Notes App
import { useState, useEffect } from 'react';
import './App.css';
import InstallButton from './InstallButton';

const API_BASE = import.meta.env.VITE_API_URL;

function App() {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);

  // load data（GET）
  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Failed to load notes:', err));
  }, []);

  // add note（POST）
  const handleAddNote = () => {
    if (input.trim() === '') return;

    const newNote = {
      id: Date.now().toString(),  // time string as id
      text: input,
      completed: false
    };

    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(data => {
        setNotes([...notes, data]);
        setInput('');
      })
      .catch(err => console.error('Failed to add note:', err));
  };

  // delete note（DELETE）
  const handleDelete = (id) => {
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)))
      .catch(err => console.error('Failed to delete note:', err));
  };

  // toggle note completion
  const handleToggleComplete = (id) => {
    const updatedNote = notes.find(note => note.id === id);
    if (!updatedNote) return;
  
    const toggledNote = { ...updatedNote, completed: !updatedNote.completed };
  
    fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: toggledNote.completed })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update');
        setNotes(notes.map(n => n.id === id ? toggledNote : n));
      })
      .catch(err => console.error('Failed to toggle complete:', err));
  };

  return (
    <div className="app">
      <h1>📝 Simple Notes</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>

      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className={note.completed ? 'completed' : ''}>
            <span>{note.text}</span>
            <div className="actions">
              <button onClick={() => handleToggleComplete(note.id)}>✔️</button>
              <button onClick={() => handleDelete(note.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <InstallButton />
    </div>
  );
}



export default App;
