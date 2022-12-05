import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useAuth } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

import "./Register.css";

const Register: React.FC = () => {
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Hooks
  const { signUp } = useAuth();
  const history = useHistory();

  const handleChange = (e: any) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await signUp(dataUser);
    history.push("/home");
  };

  return (
    <IonPage className="fullscreen">
      <IonContent className="home-content fullscreen" color="featured">
        <IonGrid fixed={true} className="fullscreen">
          <IonRow className="home-row-logo">
            <IonCol className="home-col-logo">
              <img src={logoImg} />
            </IonCol>
          </IonRow>
          <IonTitle className="ion-text-center" style={{ fontSize: "22px" }}>
            Registrarse
          </IonTitle>
          <IonRow className="home-row-form">
            <IonCol className="home-col-form">
              <IonItem className="home-item" color="darkgreen">
                <IonLabel color="light" position="floating">
                  Username
                </IonLabel>
                <IonInput
                  type="text"
                  name="username"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>
              <IonItem className="home-item" color="darkgreen">
                <IonLabel color="light" position="floating">
                  Email
                </IonLabel>
                <IonInput
                  type="text"
                  name="email"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>
              <IonItem className="home-item" color="darkgreen">
                <IonLabel color="light" position="floating">
                  Password
                </IonLabel>
                <IonInput
                  type="password"
                  name="password"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>
              <IonButton
                type="submit"
                className="home-btn-form"
                expand="block"
                color="light"
                onClick={() => handleSubmit()}
              >
                Registrarse
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
