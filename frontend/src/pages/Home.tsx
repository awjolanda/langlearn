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
              <IonCardTitle>{course.name}</IonCardTitle>
              <IonCardSubtitle>{course.description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
