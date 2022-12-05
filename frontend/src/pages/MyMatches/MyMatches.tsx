
import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonList, IonPage, IonRow, IonTitle } from '@ionic/react';
import { footballOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import MatchCard from '../../components/MatchCard/MatchCard';
import { useAuth } from '../../context/authContext';
import { Match } from '../../models/match.model';
import { User } from '../../models/user.model';
import matchService from '../../services/match.service';
import userService from '../../services/user.service';
import './MyMatches.css';

const MyMatches: React.FC = () => {
  const [myMatches, setMyMatches] = useState<Match[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();

  const { user } = useAuth(); 
  const history = useHistory(); 

  const completeMatch = async ( id: any ) => {
    console.log("editmatch")
  } 
  
  // Funciones para enviar como props
  const functionsProps = {
    deleteMatch: async ( id: any ) => {     
        await matchService.deleteMatch(id, user.data)
            .then(res => console.log(res)).catch(err=>console.log(err)); 
        setLoaded(true);    
    },
    editMatch:  async ( ) => {
        console.log("editmatch")
    } 
  };

  useEffect(() => {
    if(!user) {
        history.push('/home');
    }

    const fetchDataUser = async () => {
        const dataUser = await userService.getUserWithToken(user.data);         
        return dataUser;
    } 

    const fetchDataMatches = async () => {  
        if(userData) {
            const dataMatches = await matchService.getMatchesByUser(userData.username,user.data);
            setLoaded(true);
            return dataMatches;
        }  
    }     

    if(!userData) {
        fetchDataUser()
            .then( res => {
                setUserData(res);  
                setLoaded(true);                      
            })
            .catch(err => console.log(err));
    }

    if(loaded) {
        fetchDataMatches()
            .then( res => {
                console.log("entro")
                setMyMatches(res); 
                setLoaded(false);               
            })
            .catch(err => console.log("Error", err));
    }
    console.log(loaded)
  }, [loaded]);

  return (
        <IonPage style={ user ? {'display':''} : {'display':'none'} }>  
            <Header/>
                <IonContent>
                    <IonGrid className='create-grid'>

                        <Banner height='3' size='30' icon={footballOutline}/>

                        <IonRow>
                            <IonCol>
                                <IonTitle className='ion-text-center'>Mis partidos</IonTitle>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonTitle className='ion-text-left tittle-secondary'>{myMatches?.length + " resultados"}</IonTitle>
                                <IonList className='club-list' lines='none'>
                                    {
                                        myMatches && myMatches.sort((a,b) => {
                                            const date1 = new Date(a.date);
                                            const date2 = new Date(b.date);
                                            return date1.valueOf()  - date2.valueOf() ;
                                        }).map((item, index) => {
                                            return (
                                                <IonItem className='club-list-item' key={index}>
                                                    <MatchCard funcs={functionsProps} match={item} admin={true}/>
                                                </IonItem>
                                            )
                                        })
                                    }
                                </IonList>                            
                            </IonCol>
                        </IonRow>
                    </IonGrid>    
                </IonContent>
        </IonPage>
  );
};

export default MyMatches;