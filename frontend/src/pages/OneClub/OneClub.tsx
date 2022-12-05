import { IonPage,IonContent, IonTitle, IonCol, IonGrid, IonRow, IonIcon, IonChip, IonLabel, IonText, IonButton } from '@ionic/react';
import { locationOutline, shield, timeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import MapModal from '../../components/MapModal/MapModal';
import { useAuth } from '../../context/authContext';
import { Club } from '../../models/club.model';
import clubService from '../../services/club.service';
import './OneClub.css';

const OneClub: React.FC = () => {
    
  const { id } = useParams<{ id: string }>();
  const [clubData, setClubData] = useState<Club>();
  
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    // Comprueba que el usuario este logeado y activo
    if(!user) {
        // de no ser asi, te envia hacia la home
        history.push('/home')
    }

    const fetchClub = async () => {
        const club = await clubService.getClubById(id);
        return club;
    }

    fetchClub().then(res => setClubData(res)).catch(err => console.log(err));
  },[]);

  return (
    <IonPage>  
        <Header/>
        <IonContent>
            <IonGrid className='create-grid'>
                
                <Banner height='3' icon={shield} size='32' />

                <IonRow>
                    <IonCol>
                        <IonTitle className='ion-text-center' style={{'fontSize':'25px'}}>{clubData?.name}</IonTitle>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol style={{'display':'flex','justifyContent':'center','padding':'0','marginTop':'1.5em'}}>
                        <div className="club-image">

                        </div>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonTitle className='ion-text-center' style={{'fontSize':'18px','marginTop':'2em','marginBot':'2em'}}>Información</IonTitle>
                </IonRow>

                <IonRow>
                    <IonCol style={{'display':'flex','justifyContent':'center','marginTop':'15px'}}>
                        <IonChip color="darkgreen">
                            <IonLabel style={{'display':'flex','justifyContent':'center','color':'black'}}>
                                <IonIcon icon={timeOutline}/>
                                {clubData?.address}
                            </IonLabel>
                        </IonChip>  
                    </IonCol>
                    <IonCol style={{'display':'flex','justifyContent':'center','marginTop':'15px'}}>
                        <IonChip color="darkgreen">
                            <IonLabel style={{'display':'flex','justifyContent':'center','color':'black','fontSize':'15px'}}>
                                <IonIcon icon={locationOutline}/>
                                {clubData?.hour}
                            </IonLabel>
                        </IonChip>                            
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol style={{'padding':'14px','display':'flex','justifyContent':'center','alignCenter':'center','minHeight':'6em','marginTop':'1.5em'}}>
                        <IonText className='ion-text-center' style={{'padding':'2px'}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </IonText>
                    </IonCol>
                </IonRow>  

                <IonRow>
                    <IonCol>
                        <IonLabel style={{'display':'flex','justifyContent':'center','fontFamily':'Roboto-Thin'}}>
                            <IonButton id="open-map-modal" expand="block" style={{'width':'80%'}}>
                                <IonIcon icon={locationOutline} />
                                Ver Mapa
                            </IonButton>
                            <MapModal club={clubData}/>
                        </IonLabel> 
                    </IonCol>
                </IonRow>
            </IonGrid>    
        </IonContent>
    </IonPage>
  );
};

export default OneClub;