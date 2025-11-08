// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'movies.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Read & write helpers
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}
function writeData(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
}

// POST: add new movie
app.post('/api/movies', (req, res) => {
  const { id, title, image, year, genre, quality, description, link480, link720, link1080 } = req.body;

  if (!id || !title) {
    return res.status(400).json({ error: 'id and title required' });
  }

  const movies = readData();

  // check duplicate ID
  const exists = movies.find(m => m.id === id);
  if (exists) {
    return res.status(400).json({ error: 'Movie with same ID already exists!' });
  }

  const movie = { id, title, image, year, genre, quality, description, link480, link720, link1080 };
  movies.unshift(movie);
  writeData(movies);

  res.json({ success: true, movie });
});

// GET all movies
app.get('/api/movies', (req, res) => {
  res.json(readData());
});

// GET movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movies = readData();
  const m = movies.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json(m);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
