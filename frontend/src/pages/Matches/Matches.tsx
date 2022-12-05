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
  IonButton,
  IonChip,
} from "@ionic/react";
import { addOutline, optionsOutline, refreshOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header/Header";
import MatchCard from "../../components/MatchCard/MatchCard";
import matchService from "../../services/match.service";
import { useAuth } from "../../context/authContext";
import { Match } from "../../models/match.model";
import CreateMatchModal from "../../components/CreateMatchModal/CreateMatchModal";
import FilterModal from "../../components/FilterModal/FilterModal";
import clubService from "../../services/club.service";
import { Club } from "../../models/club.model";
import filterSearch from "../../hooks/setFilterSearch";
import "./Matches.css";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

interface MatchesProps {
  render: Function;
}

const Matches: React.FC<MatchesProps> = (props: MatchesProps) => {
  const { render } = props;
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [dataClubes, setDataClubes] = useState<Club[]>([]);
  const [restartData, setRestartData] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const history = useHistory();
  const [resetCount, setResetCount] = useState<number>(0);
  const [filtersSearch, setFiltersSearch] = useState({
    club: [],
    genre: [],
    mode: [],
    players: [],
  });

  // Funciones
  const checkFalseAll = (data: Club[]) => {
    let newData: Club[] = [];
    data.forEach((elem) => {
      let newElem = elem;
      newElem.checked = false;
      newData.push(newElem);
    });
    return newData;
  };

  // Funciones para enviar como props en MatchCard
  const functionsProps = {
    deleteMatch: async (id: any) => {
      console.log("a");
    },
    editMatch: async () => {
      console.log("b");
    },
  };

  // Funciones para enviar como props en Filter Modal
  const functionsFilterProps = {
    filter: (obj: any) => {
      setFiltersSearch(obj);
      setRestartData(!restartData);
      const emptyObj = {
        club: [],
        genre: [],
        mode: [],
        players: [],
      };
      return emptyObj;
    },
    resetDataClubes: (clubes: Club[]) => {
      console.log("reset");
      setDataClubes(clubes);
    },
  };

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const handleRestartData = () => {
    render();

    if (restartData) {
      setRestartData(false);
    } else {
      setRestartData(true);
    }
  };

  const restartFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const emptyObj = {
      club: [],
      genre: [],
      mode: [],
      players: [],
    };
    setResetCount(0);
    setFiltersSearch(emptyObj);
    handleRestartData();
  };

  useEffect(() => {
    // if(!user) {
    //     history.push('/home')
    // }
    setResetCount(resetCount + 1);
    console.log(resetCount);
    const fetchMatches = async () => {
      const matches = await matchService.getAll();
      return matches;
    };

    const fetchClubes = async () => {
      const clubes = await clubService.getAll();
      return clubes;
    };

    fetchClubes()
      .then((res) => {
        if (resetCount === 0) {
          const data = checkFalseAll(res);
          setDataClubes(data);
        }
      })
      .catch((err) => console.log(err));

    fetchMatches()
      .then((res) => {
        setAllMatches(res);
      })
      .catch((err) => console.log(err));
  }, [restartData]);

  return (
    <IonPage
      className="fullscreen"
      style={user ? { display: "" } : { display: "none" }}
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
                  onIonChange={(e) => handleSearchChange(e)}
                ></IonSearchbar>
                <IonLabel className="search-label">
                  <div>
                    <IonButton
                      id="open-filter"
                      expand="block"
                      className="btn-filter-modal"
                      style={{ background: "none" }}
                    >
                      <IonIcon
                        icon={optionsOutline}
                        style={{ fontSize: "23px" }}
                      />
                    </IonButton>
                  </div>
                  <FilterModal
                    clubes={dataClubes}
                    funcs={functionsFilterProps}
                  />
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="col-search">
                <IonLabel>
                  <IonButton id="open-create-match" expand="block">
                    Crear partido
                    <IonIcon icon={addOutline} />
                  </IonButton>
                  <CreateMatchModal
                    clubes={dataClubes}
                    restart={handleRestartData}
                  />
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {
                  <>
                    {filtersSearch.club.map((club, index) => {
                      return (
                        <IonChip key={index} color="darkgreen">
                          {club}
                        </IonChip>
                      );
                    })}

                    {filtersSearch.genre.map((club, index) => {
                      return (
                        <IonChip key={index} color="primary">
                          {club}
                        </IonChip>
                      );
                    })}

                    {filtersSearch.mode.map((club, index) => {
                      return (
                        <IonChip key={index} color="secondary">
                          {club}
                        </IonChip>
                      );
                    })}

                    {filtersSearch.players.map((club, index) => {
                      return (
                        <IonChip key={index} color="secondary">
                          {club}
                        </IonChip>
                      );
                    })}
                  </>
                }
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div style={{ display: "flex" }}>
                  <IonTitle className="ion-text-left tittle-secondary">
                    {allMatches.length + " resultados"}
                  </IonTitle>
                  <IonButton
                    className="btn-reset-rounded"
                    onClick={restartFilters}
                  >
                    <IonIcon icon={refreshOutline} className="icon-btn-reset" />
                  </IonButton>
                </div>
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Loading name="" />
                  </div>
                ) : (
                  ""
                )}
                <IonList
                  className="club-list"
                  lines="none"
                  style={loading ? { display: "none" } : { display: "" }}
                >
                  {allMatches &&
                    allMatches
                      .filter((match) => {
                        if (
                          filtersSearch.club.length === 0 &&
                          filtersSearch.genre.length === 0 &&
                          filtersSearch.mode.length === 0 &&
                          filtersSearch.players.length === 0
                        ) {
                          if (searchValue === "") {
                            return match;
                          } else if (
                            match.club
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                          ) {
                            return match;
                          }
                        } else if (filterSearch(match, filtersSearch)) {
                          return match;
                        }
                      })
                      .sort((a, b) => {
                        const date1 = new Date(a.date);
                        const date2 = new Date(b.date);
                        return date1.valueOf() - date2.valueOf();
                      })
                      .map((item) => {
                        return (
                          <IonItem>
                            <MatchCard
                              key={item._id}
                              funcs={functionsProps}
                              match={item}
                              admin={false}
                            />
                          </IonItem>
                        );
                      })}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSlide>
    </IonPage>
  );
};

export default Matches;
