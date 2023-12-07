class CourseRepository {
  constructor(db) {
    this.db = db;
  }

  getAllCourses() {
    let sql = "SELECT * FROM courses";
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  getCourseById(id) {
    let sql = "SELECT * FROM courses WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.query(sql, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  createCourse(courseData) {
    let sql = "INSERT INTO courses SET ?";
    return new Promise((resolve, reject) => {
      this.db.query(sql, courseData, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  }

  updateCourse(id, courseData) {
    let sql = "UPDATE courses SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.query(sql, [courseData, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  }

  deleteCourse(id) {
    let sql = "DELETE FROM courses WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.db.query(sql, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  }
}

module.exports = CourseRepository;
