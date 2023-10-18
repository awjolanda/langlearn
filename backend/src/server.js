const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

//Datenbankverbindung
const db = mysql.createConnection({
  host: 'localhost',
  user: 'langlearn_access',
  password: 'sml12345',
  database: 'langlearndb'
})

//Fehlerbehandlung
db.connect((err) => {
  if (err) throw err;
  console.log('Die Verbindung zur Datenbank wurde erfolgreich hergestellt.')
});

//Methode zum Anzeigen aller Kürse.
app.get('/courses', (req, res) => {
  let sql = 'SELECT name FROM courses';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(results);
  });
});

//Methode zum Erstellen eines Kurses.
app.post('/courses', (req, res) => {
  let data = req.body;
  let sql = 'INSERT INTO courses SET ?';

  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send('Daten erfolgreich hinzugefügt.')
  });
});

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