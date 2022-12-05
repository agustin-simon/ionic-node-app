import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { logoGoogle } from "ionicons/icons";
import { useAuth } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import logoImg from "../../assets/images/logo.png";
import "./Home.css";

const Home: React.FC = () => {
  // Variables
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  // Context / History hooks
  const { login, user } = useAuth();
  const history = useHistory();

  // Funciones
  const handleChange = (e: any) => {
    setErrorMessage("");
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
    console.log(dataUser);
  };

  const handleSubmit = () => {
    const fetchUserLogin = async () => {
      await login(dataUser);
    };

    fetchUserLogin()
      .then((res) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          history.push("/matches");
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });

    console.log("user", user);
  };

  // UseEffect hook
  useEffect(() => {
    // Reiniciar pagina al cambiar el mensaje de error.
  }, [errorMessage]);

  return (
    <IonPage className="fullscreen">
      <IonContent className="home-content fullscreen" color="featured">
        <IonGrid
          fixed={true}
          className="fullscreen"
          style={loading ? { display: "none" } : { display: "" }}
        >
          <IonRow className="home-row-logo">
            <IonCol className="home-col-logo">
              <img src={logoImg} />
            </IonCol>
          </IonRow>

          <IonRow className="home-row-form">
            <IonCol className="home-col-form" style={{ textAlign: "center" }}>
              <IonItem className="home-item" color="darkgreen">
                <IonLabel
                  color={errorMessage != "" ? "danger" : "light"}
                  position="floating"
                >
                  Email
                </IonLabel>
                <IonInput
                  color={errorMessage != "" ? "danger" : "light"}
                  type="text"
                  name="email"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>
              <IonItem className="home-item" color="darkgreen">
                <IonLabel
                  color={errorMessage != "" ? "danger" : "light"}
                  position="floating"
                >
                  Password
                </IonLabel>
                <IonInput
                  color={errorMessage != "" ? "danger" : "light"}
                  type="password"
                  name="password"
                  onIonChange={(e) => handleChange(e)}
                ></IonInput>
              </IonItem>

              {errorMessage != "" ? (
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    backgroundColor: "#367836",
                    width: "100%",
                    height: "2em",
                    marginTop: "6px",
                    borderRadius: "4px",
                    color: "#eb445a",
                    display: "flex",
                    alignItems: "center",
                    padding: "14px",
                  }}
                >
                  {errorMessage}
                </div>
              ) : (
                ""
              )}

              <IonButton
                type="submit"
                className="home-btn-form"
                expand="block"
                color="light"
                onClick={() => handleSubmit()}
              >
                Login
              </IonButton>
              <IonRouterLink
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
                color="light"
                href="/send-email-password"
              >
                ¿Olvidaste tu contraseña?
              </IonRouterLink>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center col-footer">
              <IonLabel className="ion-padding-top">
                ¿No tenés cuenta todavia?
              </IonLabel>
              <IonRouterLink href="/register">
                <IonButton
                  type="submit"
                  className="home-register-btn"
                  expand="block"
                  color="light"
                >
                  Registrarse
                </IonButton>
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loading name={user?.username} />
          </div>
        ) : (
          ""
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
