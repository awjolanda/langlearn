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
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [courses, setCourses] = useState(["wird geladen..."]);

  useEffect(() => {
    fetch("http://localhost:3001/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const deleteCourse = (id: string) => {
    fetch (`http://localhost:3001/api/courses/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      return fetch('http://localhost:3001/api/courses');
    })
    .then(response => response.json())
    .then(data => setCourses(data))
    .catch((error) => {
      console.error('Fehler:', error);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>langlearn</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer />
        {courses.map((course, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>({course.ID}) {course.name}</IonCardTitle>
              <IonCardSubtitle>{course.description}</IonCardSubtitle>
              <button onClick={() => deleteCourse(course.ID)}>Löschen</button>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
