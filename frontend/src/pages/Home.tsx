import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
import { BaseCourse, Course } from "@/types/general";
import { createCourse, deleteCourse, updateCourse } from "@/lib/api";
import {
  areStringsNullOrEmpty,
  isStringNullOrEmpty,
  updateArrayWithElement,
} from "@/lib/utils";

const Home: React.FC = () => {
  const [courses, setCourses] = useState([] as Course[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data as Course[]);
      });
  }, []);

  const createNameRef = useRef<HTMLInputElement>(null);
  const createDescriptionRef = useRef<HTMLInputElement>(null);

  const create = async () => {
    const name = createNameRef.current?.value;
    const description = createDescriptionRef.current?.value;

    if (isStringNullOrEmpty(name)) {
      alert("Field 'Kursname' must not be empty!");
      return;
    }

    const course = { name, description } as BaseCourse;

    setIsLoading(true);

    try {
      const response = (await createCourse(course)) as Course;
      setCourses([...courses, response]);
    } catch (error) {
      console.error("Failed to create: ", error);
      alert("Failed to create!");
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const update = async (id: Number) => {
    const nameElement = document.getElementById(
      `edited-course-name-${id}`
    ) as HTMLInputElement;
    const descriptionElement = document.getElementById(
      `edited-course-description-${id}`
    ) as HTMLInputElement;

    const name = nameElement.value;
    const description = descriptionElement.value;

    if (isStringNullOrEmpty(name)) {
      alert("Field 'Kursname' must not be empty!");
      return;
    }

    const course = { name, description } as BaseCourse;
    setIsLoading(true);

    try {
      const response = (await updateCourse(id, course)) as Course;
      setCourses(updateArrayWithElement(response, courses));
      nameElement.value = "";
      descriptionElement.value = "";
    } catch (error) {
      console.error("Failed to create: ", error);
      alert("Failed to create!");
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const remove = async (id: Number) => {
    if (!confirm("want to delete?")) return;

    setIsLoading(true);

    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Failed to delete: ", error);
      alert("Failed to delete!");
    }

    setIsLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>langlearn</IonTitle>
          <input
            disabled={isLoading}
            ref={createNameRef}
            type="text"
            placeholder="Kursname"
          />
          <input
            disabled={isLoading}
            ref={createDescriptionRef}
            type="text"
            placeholder="Beschreibung"
          />
          <button disabled={isLoading} onClick={create}>
            Kurs erstellen
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {courses.map((course, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>
                ({course.id.toString()}) {course.name}
              </IonCardTitle>
              <IonCardSubtitle>{course.description}</IonCardSubtitle>
              <button disabled={isLoading} onClick={() => remove(course.id)}>
                Löschen
              </button>
            </IonCardHeader>
            <IonCardContent>
              <input
                disabled={isLoading}
                id={`edited-course-name-${course.id}`}
                type="text"
                placeholder="Kursname"
              />
              <input
                disabled={isLoading}
                id={`edited-course-description-${course.id}`}
                type="text"
                placeholder="Beschreibung"
              />
              <button disabled={isLoading} onClick={() => update(course.id)}>
                Kurs aktialisieren
              </button>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
