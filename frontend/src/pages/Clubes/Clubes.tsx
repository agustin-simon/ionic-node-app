import {
  IonPage,
  IonContent,
  IonTitle,
  IonSearchbar,
  IonLabel,
  IonItem,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonList,
  IonSlide,
} from "@ionic/react";
import { optionsOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ClubCard from "../../components/ClubCard/ClubCard";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/authContext";
import { Club } from "../../models/club.model";
import clubService from "../../services/club.service";
import "./Clubes.css";

const Clubes: React.FC = () => {
  const [clubes, setClubes] = useState<Club[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuth();
  const history = useHistory();

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    if (!user) {
      history.push("/home");
    }

    const fetchClubes = async () => {
      const clubes = await clubService.getAll();
      return clubes;
    };

    fetchClubes()
      .then((res) => setClubes(res))
      .catch((err) => console.log(err));
  }, []);

  //Club
  const club = {
    _id: 2,
    name: "string",
    address: "Alsina 300",
    type: "F5",
    hour: "15hs",
    description: "Lorem ipsum dolor sit amet.",
    checked: false,
  };

  return (
    <IonPage
      className="fullscreen"
      style={user ? { display: "block" } : { display: "none" }}
    >
      <Header />
      <IonSlide>
        <IonContent className="fullscreen">
          <IonGrid>
            <IonRow>
              <IonCol className="col-search">
                <IonSearchbar
                  className="base-search-bar"
                  placeholder="Buscar..."
                  onIonChange={handleSearchChange}
                ></IonSearchbar>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonTitle className="ion-text-left tittle-secondary">
                  {clubes?.length} resultados
                </IonTitle>
                <IonList className="club-list" lines="none">
                  {clubes &&
                    clubes
                      .filter((club) => {
                        if (searchValue === "") {
                          return club;
                        } else if (
                          club.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return club;
                        }
                      })
                      .map((item, index) => {
                        return (
                          <IonItem className="club-list-item" key={index}>
                            <ClubCard club={item} />
                          </IonItem>
                        );
                      })}

                  <IonItem className="club-list-item">
                    <ClubCard club={club} />
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSlide>
    </IonPage>
  );
};

export default Clubes;
