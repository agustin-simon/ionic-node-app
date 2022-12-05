import { IonPage, IonSlide, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonTitle, IonList, IonItem, IonCardSubtitle, IonChip, IonCheckbox, IonInput, IonRadio, IonToggle, IonButton, IonCard } from '@ionic/react';
import { accessibilityOutline, addOutline, calendarOutline, person, timeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useAuth } from '../../context/authContext';
import matchService from '../../services/match.service';
import { Match } from '../../models/match.model';
import './OneMatch.css';
import userService from '../../services/user.service';
import { User } from '../../models/user.model';
import Banner from '../../components/Banner/Banner';

const OneMatch: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match>();
  const [activeUser , setActiveUser] = useState<User>();
  const [usersMatch, setUsersMatch] = useState([]);

  const [error, setError] = useState<string>('')

  const [date, setDate] = useState<Date>();
  const [loaded, setLoaded] = useState<boolean>(false); 

  const { user } = useAuth();
  const history = useHistory();

  const addPlayer = () => {     

        // Utiliza el servicio match para agregar un usuario al array
        const fetchAddPlayer = async () => {
            return await matchService.addPlayerToMatch(id, user.data);
        }

        // Busca usuario ya existente en el array del match
        const userFound = usersMatch.find( elem => elem['id'] === activeUser?._id);

        // Si el usuario no existe dentro del array
        if(!userFound) {
            // comprueba que el usuario que quiere agregarse no sea el creador del match
            if(activeUser?._id != match?.user ) {
                // y si existe el match, y hay espacios para agregar uno mas, lo agrega
                if(match?.players && usersMatch.length < match.players ) {
                    fetchAddPlayer().then( res => console.log(res) ).catch( err => console.log(err) );
                    setLoaded(false);
                } else {
                    setError( 'No hay mas lugar' );
                }
            } 
        }
               
  }

  const deletePlayer = ( idUser: any ) => {        
        // Utiliza el servicio de user para borrar un usuario del match
        const fetchDeletePlayer = async () => {
            return await userService.deleteUserByMatch(id, idUser, user.data);
        }
        fetchDeletePlayer().catch(err => console.log(err));    
  }

  useEffect(() => {  
    // Comprueba que el usuario este logeado y activo
    if(!user) {
        // de no ser asi, te envia hacia la home
        history.push('/home')
    }  
    // Utiliza el servicio user para obtener un user mediante el token activo
    const fetchUserLogged = async () => {
        const userLogged = await userService.getUserWithToken(user.data);
        return userLogged;
    }
    // Utiliza el servico match para obtener el match mediante el id
    const fetchMatch = async () => {
        const matchFind = await matchService.getMatchById(id);
        return matchFind;
    }
    // Utiliza el servicio user para obtener todos los usuarios del match
    const fetchUsersByMatch = async () => {
        const usersFind = await userService.getUsersByMatch(id, user.data);
        return usersFind;
    }

    if(!loaded) {

        fetchUserLogged().then( res => {
            setActiveUser(res);
        }).catch(err => console.log(err));

        fetchMatch().then(res => {
            setMatch(res);
            setLoaded(true);
        }).catch(err => console.log(err));
    }

    if(loaded && match) {        
        fetchMatch().then(res => {
            setMatch(res);
            setLoaded(true);
        }).catch(err => console.log(err));

        setDate( new Date(match?.date) );
        fetchUsersByMatch().then( res => setUsersMatch(res) ).catch( err => console.log(err) );
        setLoaded(true);
    }    
 
  }, [loaded, id]);

  return (
    <IonPage className='fullscreen' style={ user ? {'display':''} : {'display':'none'} }>  
        <Header/>
            <IonContent className='fullscreen'>
                <IonGrid style={{'padding':'0'}}>

                    <Banner height='3' size='30' icon={person}/>  

                    <IonRow>
                        <IonCol style={{'display':'flex','justifyContent':'center'}}>
                            <IonTitle className='ion-text-center'>{match?.club}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>                        
                        <IonCol style={{'display':'flex','justifyContent':'center'}}>
                            <Link to={`/profile/${match?.user}`}>
                                <div style={{'borderRadius':'100%','height':'7em','width':'7em', 'backgroundColor':'black',
                                'backgroundImage':"url('https://images.unsplash.com/profile-fb-1527368999-01bec71421e9.jpg?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128')"}}>

                                </div>
                            </Link>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{'display':'flex','justifyContent':'center','padding':'15px'}}>
                            <IonItem>
                                <IonCardSubtitle>
                                    <IonIcon icon={timeOutline} />
                                    {date?.getHours() + "hs"}
                                </IonCardSubtitle>
                            </IonItem>
                        </IonCol>
                        <IonCol style={{'display':'flex','justifyContent':'center', 'padding':'25px'}}>
                            <IonItem>
                                    <IonIcon icon={accessibilityOutline} />
                                    {match?.players}
                            </IonItem>
                        </IonCol> 
                        <IonCol style={{'display':'flex','justifyContent':'center','padding':'15px'}}>
                            <IonItem>
                                <IonCardSubtitle>
                                    <IonIcon icon={calendarOutline} />
                                    {date?.getDate() + "/" + date?.getMonth()}
                                </IonCardSubtitle>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{'display':'flex','justifyContent':'center', 'padding':'15px'}}>
                            <IonChip color="darkgreen" style={{'marginLeft':'5px'}}>
                                <IonLabel>{match?.mode}</IonLabel>
                            </IonChip>
                            <IonChip color="darkgreen" style={{'marginLeft':'5px'}}>
                                <IonLabel>Amistoso</IonLabel>
                            </IonChip>  
                            <IonChip color="darkgreen" style={{'marginLeft':'5px'}}>
                                <IonLabel>{match?.genre}</IonLabel>
                            </IonChip> 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonTitle className='ion-text-center'>Lugares</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{'display':'flex','justifyContent':'center'}}>
                            <IonList className='match-list' 
                            style={{'width':'90%','minHeight':'4em', 'display':'flex','flexDirection':'column','alignItems':'center','overflowY':'scroll'}}>
                                    {   
                                        usersMatch && usersMatch.map((item,index) => {
                                            return (
                                                <IonItem style={{'width':'100%','padding':'0'}} lines='none' key={index}>
                                                    <ProfileCard user={item} deletePlayer={deletePlayer}/>
                                                </IonItem>  
                                            )  
                                        })
                                    }                                    
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{'display':'flex','justifyContent':'center'}}>
                            {
                                    usersMatch && match?.players &&
                                        usersMatch.length < match.players ? <IonButton color="darkgreen" onClick={addPlayer}>
                                                                                    <IonIcon icon={addOutline} />
                                                                                    Jugar
                                                                            </IonButton> 
                                                                        : 'No hay mas lugares'
                            }  
                        </IonCol>
                    </IonRow>
                </IonGrid>                         
            </IonContent> 
    </IonPage>
  );
};

export default OneMatch;