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
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { useEffect, useRef, useState } from "react";

const Home: React.FC = () => {
  const [courses, setCourses] = useState(["wird geladen..."]);

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const createNameRef = useRef();
  const createDescriptionRef = useRef();
  const updateNameRef = useRef();
  const updateDescriptionRef = useRef();

  const createCourse = () => {
    const name = createNameRef.current.value;
    const description = createDescriptionRef.current.value;

    fetch("http://localhost:3001/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        return fetch("http://localhost:3001/api/courses");
      })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Fehler:", error);
      });
  };

  const updateCourse = (id: string) => {
    const name = updateNameRef.current.value;
    const description = updateDescriptionRef.current.value;

    fetch(`http://localhost:3001/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        return fetch("http://localhost:3001/api/courses");
      })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Fehler:", error);
      });
  };

  const deleteCourse = (id: string) => {
    fetch(`http://localhost:3001/api/courses/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        return fetch("http://localhost:3001/api/courses");
      })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Fehler:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>langlearn</IonTitle>
          <input ref={createNameRef} type="text" placeholder="Kursname" />
          <input
            ref={createDescriptionRef}
            type="text"
            placeholder="Beschreibung"
          />
          <button onClick={createCourse}>Kurs erstellen</button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer />
        {courses.map((course, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>
                ({course.ID}) {course.name}
              </IonCardTitle>
              <IonCardSubtitle>{course.description}</IonCardSubtitle>
              <button onClick={() => deleteCourse(course.ID)}>Löschen</button>
            </IonCardHeader>
            <IonCardContent>
              <input ref={updateNameRef} type="text" placeholder="Kursname" />
              <input
                ref={updateDescriptionRef}
                type="text"
                placeholder="Beschreibung"
              />
              <button onClick={updateCourse}>Kurs aktulaiseren</button>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
