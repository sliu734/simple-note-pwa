// simple express server for notes app
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'notes.json');

app.use(cors());
app.use(express.json());

function readNotes() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const newNote = req.body; // id, text, completed
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter(note => note.id !== req.params.id);
  writeNotes(notes);
  res.status(204).end();
});

app.get('/', (req, res) => {
  res.send('👋 Hello, CS732er!');
});

app.patch('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const { id } = req.params;
  const { completed } = req.body;

  const note = notes.find(note => note.id === id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.completed = completed;
  writeNotes(notes);
  res.json(note);
});

app.listen(PORT, () => console.log(`✅ Express API running at http://localhost:${PORT}`));
