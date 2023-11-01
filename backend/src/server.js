const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

// Datenbankverbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "langlearn_access",
  password: "sml12345",
  database: "langlearndb",
});

// Fehlerbehandlung
db.connect((err) => {
  if (err) throw err;
  console.log("Die Verbindung zur Datenbank wurde erfolgreich hergestellt.");
});

// Methode zum Anzeigen aller Kürse. (GET)
app.get("/api/courses", (req, res) => {
  let sql = "SELECT * FROM courses";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Methode zum Anzeigen eines einzelnen Kurses (GET)
app.get("/api/courses/:id", (req, res) => {
  let sql = "SELECT * FROM courses WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.err(err);
      res.status(404).send("Der Angefordete Kurs wurde leider nicht gefunden.");
    } else {
      res.status(200);
    };
    res.send(results);
  });
});

// Methode zum Erstellen eines Kurses. (POST)
app.post("/api/courses", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO courses SET ?";

  db.query(sql, data, (err, result) => {
    if (err) {
      console.err(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    } else {
      res.status(201).send("Der Kurs wurde erfolgerich erstellt.");
    };    res.send("Die Daten wurden erfolgreich hinzugefügt.");
  });
});

// ZU TUN: PUT-Methode zum Aktulisieren von Datensätzen in der Datenbank. DELETE-Methode zum Löschen von Datensätzen in der Datenbank.

// Methode zum Aktualisieren eines Kurses. (PUT)
app.put("/api/courses/:id", (req, res) => {
  let data = req.body;
  let sql = "UPDATE courses SET ? WHERE id = ?";

  db.query(sql, [data, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(
      `Der Kurs mit der ID ${req.params.id} wurde erfolgreich aktualisiert.`
    );
  });
});

// Mehtode zum Löschen eines Kurses. (DELETE)
app.delete("/api/courses/:id", (req, res) => {
  let sql = "DELETE FROM courses WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(
      `Der Kurs mit der ID ${req.params.id} wurde erfolgreich gelöscht!`
    );
  });
});

//Methode um den Port des Servers freizugeben.
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
