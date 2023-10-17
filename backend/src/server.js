const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({message: "Test!",  courses: ["Englisch", "ᚢᚱᚷᛖᚱᛗᚨᚾᛁᛊᚲ", "Latinisch", "PWGmc"]})
});

// Middleware, um JSON zu parsen
app.use(express.json());

// GET-Anfrage
app.get('/', (req, res) => {
  res.send('GET-Anfrage erhalten!');
});

// POST-Anfrage
app.post('/', (req, res) => {
  console.log(req.body); // Deine gesendeten Daten
  res.send('POST-Anfrage erhalten!');
});

// PUT-Anfrage
app.put('/', (req, res) => {
  console.log(req.body); // Deine gesendeten Daten
  res.send('PUT-Anfrage erhalten!');
});

// DELETE-Anfrage
app.delete('/', (req, res) => {
  res.send('DELETE-Anfrage erhalten!');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});