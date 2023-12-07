const express = require("express");
const mysql = require("mysql");
const CourseService = require("./services/courseService.js");
const CourseRepository = require("./repositories/courseRepository.js");
const cors = require('cors')

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:5173', // oder '*' für alle Ursprünge
  optionsSuccessStatus: 200 // einige ältere Browser (IE11, verschiedene SmartTVs) benötigen dies
};

app.use(cors());

app.use(express.json());

// Datenbankverbindung
const db = mysql.createConnection({
  host: "localhost",
  user: "langlearn_access",
  password: "sml12345",
  database: "langlearndb",
});

const courseRepository = new CourseRepository(db);
const courseService = new CourseService(courseRepository);

app.get("/api/courses", (req, res) => {
  courseService.getAllCourses()
    .then(courses => res.status(200).send(courses))
    .catch(err => {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    });
});

// Methode zum Anzeigen eines einzelnen Kurses (GET)
app.get("/api/courses/:id", (req, res) => {
  courseService.getCourseById(req.params.id)
    .then(course => res.status(200).send(course))
    .catch(err => {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    });
});

// Methode zum Erstellen eines neuen Kurses. (POST)
app.post("/api/courses", (req, res) => {
  courseService.createCourse(req.body)
    .then(course => res.status(201).send(course))
    .catch(err => {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    });
});

// Methode zum Aktualisieren eines Kurses. (PUT)
app.put("/api/courses/:id", (req, res) => {
  courseService.updateCourse(req.params.id, req.body)
    .then(course => res.status(200).send(course))
    .catch(err => {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    });
});

// Methode zum Löschen eines Kurses. (DELETE)
app.delete("/api/courses/:id", (req, res) => {
  courseService.deleteCourse(req.params.id)
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.error(err);
      res.status(500).send("Es gab ein Problem beim Bearbeiten Ihrer Abfrage.");
    });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
