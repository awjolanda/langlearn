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
    if (err) {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    }
    res.status(200).send(results);
  });
});

// Methode zum Anzeigen eines einzelnen Kurses (GET)
app.get("/api/courses/:id", (req, res) => {
  let sql = "SELECT * FROM courses WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    }
    res.status(200).send(results);
  });
});

app.post("/api/courses", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO courses SET ?";

  db.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    } else {
      let insertedId = result.insertId;
      db.query(
        "SELECT * FROM courses WHERE id = ?",
        insertedId,
        (err, rows) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Es gab ein Problem beim Abrufen des eingefügten Kurses.");
          } else {
            res.status(201).send(rows[0]);
          }
        }
      );
    }
  });
});

// TODO: PUT-Methode zum Aktulisieren von Datensätzen in der Datenbank. DELETE-Methode zum Löschen von Datensätzen in der Datenbank.

// Methode zum Aktualisieren eines Kurses. (PUT)
app.put("/api/courses/:id", (req, res) => {
  let data = req.body;
  let sql = "UPDATE courses SET ? WHERE id = ?";

  db.query(sql, [data, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    } else {
      let id = req.params.id;
      db.query("SELECT * FROM courses WHERE id = ?", id, (err, rows) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("Es gab ein Problem beim Abrufen des aktualisierten Kurses.");
        } else {
          res.status(201).send(rows[0]);
        }
      });
    }
  });
});

// Mehtode zum Löschen eines Kurses. (DELETE)
app.delete("/api/courses/:id", (req, res) => {
  let sql = "DELETE FROM courses WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    }
    res
      .status(200)
      .send(`Der Kurs mit der ID ${req.params.id} wurde erfolgreich gelöscht!`);
  });
});

//Methode um den Port des Servers freizugeben.
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
