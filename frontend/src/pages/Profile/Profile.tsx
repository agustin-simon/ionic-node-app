import {
  IonPage,
  IonContent,
  IonTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonSlide,
  IonCardSubtitle,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonInput,
} from "@ionic/react";
import {
  footballOutline,
  shield,
  thumbsDownOutline,
  thumbsUpOutline,
  createOutline,
  checkmarkOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Match } from "../../models/match.model";
import { useAuth } from "../../context/authContext";
import { useHistory, useParams } from "react-router";
import { User } from "../../models/user.model";
import userService from "../../services/user.service";
import matchService from "../../services/match.service";
import "./Profile.css";

interface ProfileProps {
  render: boolean;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const { render } = props;
  const [data, setData] = useState<Match[]>([]);
  const [userMatches, setUserMatches] = useState<Match[]>([]);
  const [userData, setUserData] = useState<User>();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const history = useHistory();

  const pushData = (num: number) => {
    if (data.length + num <= userMatches.length) {
      // 0 + 3 <= 4
      const max = data.length + num;
      const min = max - num;
      const newData = [];
      for (let i = min; i < max; i++) {
        newData.push(userMatches[i]);
      }
      setData([...data, ...newData]);
    }
    if (data.length + num <= userMatches.length) {
      // 0 + 3 <= 4
      const max = data.length + num;
      const min = max - num;
      const newData = [];
      for (let i = min; i < max; i++) {
        newData.push(userMatches[i]);
      }
      setData([...data, ...newData]);
    } else if (data.length + num > userMatches.length) {
      // 20 > 17
      const val = userMatches.length - data.length;
      const max = data.length + val;
      const min = max - val;
      const newData = [];
      for (let i = min; i < max; i++) {
        newData.push(userMatches[i]);
      }
      setData([...data, ...newData]);
    }
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData(3);
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === userMatches.length) {
        setInfiniteDisabled(true);
      }
    }, 500);
  };

  useEffect(() => {
    // if (!user) {
    //   history.push("/home");
    // }

    const fetchDataUser = async () => {
      const dataUser = await userService.getUserWithToken(user.data);
      return dataUser;
    };

    const fetchDataMatches = async () => {
      if (userData) {
        console.log("fetchDataMATCHES");
        const dataMatches = await matchService.getMatchesByUser(
          userData.username,
          user.data
        );
        return dataMatches;
      }
    };

    if (id) {
      console.log("existente");
    } else {
      console.log("inexistente");
    }

    // Get user logeado
    if (!userData) {
      console.log("ProfileUser", user);
      fetchDataUser()
        .then((res) => {
          setUserData(res);
        })
        .catch((err) => console.log("Error", err));
    }

    // Get matches del user logeado
    if (userData) {
      console.log("inside if");
      fetchDataMatches()
        .then((res) => {
          console.log("funciona", res);
          setUserMatches(res);
          setUserData(userData);
          setLoaded(true);
        })
        .catch((err) => console.log(err));
    }

    if (userMatches.length > 0) {
      pushData(3);
    }
    console.log("userData", userData);
    console.log("render", render);
  }, [userData, loaded, render]);

  return (
    //style={user ? { display: "" } : { display: "none" }}
    <IonPage>
      <Header />
      <IonSlide>
        <IonContent>
          <IonGrid className="profile-grid">
            <IonRow className="profile-row-background">
              <IonCol></IonCol>
            </IonRow>
            <IonRow className="profile-row-box">
              <IonCol className="profile-col-image">
                <div className="profile-image-box">
                  <img
                    className="profile-img"
                    src="https://images.unsplash.com/profile-fb-1527368999-01bec71421e9.jpg?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128"
                  />
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol></IonCol>
              <IonCol className="profile-info-col" size="6">
                <IonTitle className="profile-title">
                  {userData?.username || "UserExample02"}
                </IonTitle>
                {edit ? (
                  <IonItem>
                    <IonInput className="profile-edit-input">
                      {userData?.email}
                    </IonInput>
                  </IonItem>
                ) : (
                  <IonItem>
                    <IonInput className="profile-edit-input" readonly>
                      {userData?.email || "example@gmail.com"}
                    </IonInput>
                  </IonItem>
                )}
              </IonCol>
              <IonCol className="profile-edit-icon-box">
                <div className="edit-btn-container">
                  {edit ? (
                    <IonIcon
                      className="profile-edit-icon"
                      icon={checkmarkOutline}
                      onClick={() => setEdit(!edit)}
                    />
                  ) : (
                    <IonIcon
                      className="profile-edit-icon"
                      icon={createOutline}
                      onClick={() => setEdit(!edit)}
                    />
                  )}
                </div>
              </IonCol>
            </IonRow>
            <IonRow className="profile-margin-separate">
              <IonCol></IonCol>
              <IonCol className="profile-stats-box">
                <IonTitle>
                  {userData?.matches.length || 5}
                  <IonIcon icon={footballOutline} />
                </IonTitle>
              </IonCol>
              <IonCol className="profile-stats-box">
                <IonTitle>
                  {userData?.likes || 2}
                  <IonIcon icon={thumbsUpOutline} />
                </IonTitle>
              </IonCol>
              <IonCol className="profile-stats-box">
                <IonTitle>
                  {userData?.dislikes || 0}
                  <IonIcon icon={thumbsDownOutline} />
                </IonTitle>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>

            <IonRow className="profile-margin-separate">
              <IonTitle className="profile-title-secondary">Historial</IonTitle>
            </IonRow>

            <IonRow>
              <IonCol className="profile-list-col">
                <IonList className="profile-list">
                  {data &&
                    data.map((item, index) => {
                      return (
                        <IonItem className="profile-list-item" key={index}>
                          <div className="profile-list-item-left">
                            <IonIcon
                              className="profile-list-item-icon"
                              size="large"
                              icon={shield}
                            />
                          </div>
                          <div className="profile-list-item-center">
                            <IonTitle>{item.club}</IonTitle>
                            <IonCardSubtitle>{item.date}</IonCardSubtitle>
                          </div>
                          <div className="profile-list-item-right">
                            {item.mode}
                          </div>
                        </IonItem>
                      );
                    })}
                  <IonItem className="profile-list-item">
                    <div className="profile-list-item-left">
                      <IonIcon
                        className="profile-list-item-icon"
                        size="large"
                        icon={shield}
                      />
                    </div>
                    <div className="profile-list-item-center">
                      <IonTitle>{"Boca Juniors"}</IonTitle>
                      <IonCardSubtitle>{"11/12/21"}</IonCardSubtitle>
                    </div>
                    <div className="profile-list-item-right">{"F5"}</div>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="12px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonSlide>
    </IonPage>
  );
};

export default Profile;
