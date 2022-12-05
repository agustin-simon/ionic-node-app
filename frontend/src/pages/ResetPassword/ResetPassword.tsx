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
import { useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/user.service";
import logoImg from "../../assets/images/logo.png";

import "./ResetPassword.css";

const ResetPassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [data, setData] = useState({
    firstPassword: "",
    secondPassword: "",
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    const updateUserPassword = async (pass: any, id: any) => {
      await userService.updatePasswordUser(pass, id);
    };

    console.log(data.firstPassword);
    updateUserPassword(data.firstPassword, id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
          <IonTitle className="ion-text-center" style={{ fontSize: "24px" }}>
            Resetear contraseña
          </IonTitle>
          <IonRow className="home-row-form">
            <IonCol className="home-col-form">
              <IonItem className="home-item" color="darkgreen">
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  type="text"
                  name="firstPassword"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>

              <IonItem className="home-item" color="darkgreen">
                <IonLabel position="floating">Confirmar contraseña</IonLabel>
                <IonInput
                  type="text"
                  name="secondPassword"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>

              <IonButton
                type="submit"
                className="home-btn-form"
                expand="block"
                color="light"
                onClick={handleSubmit}
              >
                Resetear
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
