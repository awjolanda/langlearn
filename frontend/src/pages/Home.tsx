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
import { useEffect, useState } from 'react'

const Home: React.FC = () => {

    const [message, setMessage] = useState("wird geladen...");
    const [courses, setCourses] = useState(["wird geladen..."]);
  
    useEffect(() => {
      fetch("http://localhost:3001/api/home").then(
        response => response.json()
      ).then(
        data => {
          setMessage(data.message)
          setCourses(data.courses)
        }
      )
    }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer />
        {courses.map((courses, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>{courses}</IonCardTitle>
              <IonCardSubtitle></IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        ))}
        <div>{message}</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;