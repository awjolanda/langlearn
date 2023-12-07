class CourseService {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }

  getAllCourses() {
    return this.courseRepository.getAllCourses()
      .then(courses => {
        if (courses.length > 0) {
          return courses;
        } else {
          throw new Error('Keine Kurse gefunden.');
        }
      });
  }

  getCourseById(id) {
    return this.courseRepository.getCourseById(id)
      .then(course => {
        if (course.length > 0) {
          return course[0];
        } else {
          throw new Error(`Kein Kurs mit der ID ${id} gefunden.`);
        }
      });
  }

  createCourse(courseData) {
    return this.courseRepository.createCourse(courseData)
      .then(insertedId => this.getCourseById(insertedId));
  }

  updateCourse(id, courseData) {
    return this.courseRepository.updateCourse(id, courseData)
      .then(affectedRows => {
        if (affectedRows > 0) {
          return this.getCourseById(id);
        } else {
          throw new Error('Kein Kurs mit dieser ID gefunden.');
        }
      });
  }

  deleteCourse(id) {
    return this.courseRepository.deleteCourse(id)
      .then(affectedRows => {
        if (affectedRows > 0) {
          return { message: `Der Kurs mit der ID ${id} wurde erfolgreich gelöscht!` };
        } else {
          throw new Error('Kein Kurs mit dieser ID gefunden.');
        }
      });
  }
}

module.exports = CourseService;
