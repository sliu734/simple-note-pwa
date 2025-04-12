
// Simple Notes App
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('simple-notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleAddNote = () => {
    if (input.trim() === '') return;
    const newNote = {
      id: Date.now(),
      text: input,
      completed: false
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setInput('');
    localStorage.setItem('simple-notes', JSON.stringify(updatedNotes));
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('simple-notes', JSON.stringify(updatedNotes));
  };

  const handleToggleComplete = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('simple-notes', JSON.stringify(updatedNotes));
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
    </div>
  );
}

export default App;
