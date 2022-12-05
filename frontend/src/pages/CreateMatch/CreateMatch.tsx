import { IonPage, IonContent, IonGrid, IonCol, IonRow, IonTitle, IonIcon, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { calendarOutline, footballOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import clubes from '../../data/clubes';
import Header from '../../components/Header/Header';
import { Club } from '../../models/club.model';
import Modal from '../../components/Modal/Modal';
import { useHistory } from 'react-router-dom';
import  matchService  from '../../services/match.service';
import { useAuth } from '../../context/authContext';
import './CreateMatch.css';
import userService from '../../services/user.service';
import clubService from '../../services/club.service';

const CreateMatch: React.FC = () => {
  const actualDate = new Date();
  const history = useHistory();
  const [date, setDate] = useState<Date>(actualDate);
  const [dataClubes, setDataClubes] = useState<Club[]>();
  const [selected, setSelected] = useState<string>('biff');
  const [data, setData] = useState({
        user: 'Gaston',
        img: '',
        date: '',
        club: '',
        mode: '',
        players: '',
        vacants: [],
        genre: '',
  });

  const { user } = useAuth();

  const getDate = ( dateValue: any ) => {
    const tempDate = new Date(dateValue);
    setData({
        ...data,
        date: dateValue
    })
    setDate(tempDate);
  }

  const handleChange = (e: any) => {
    setSelected(e.target.value);
    setData({
        ...data,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const promise = await matchService.createMatch(data, user.data); 
    const userData = await userService.getUserWithToken(user.data);
    userData.matches.push(promise._id);
    
    await userService.updateUser(user.data, userData.matches);
    history.push('/matches');
  }

  useEffect(() => {
    if(!user) {
        history.push('/home')
    }

    const fetchClubes = async () => {
        const clubes = await clubService.getAll();
        return clubes;
    }

    fetchClubes().then(res => setDataClubes(res)).catch(err => console.log(err));
  });

  return (
    <IonPage style={ user ? {'display':''} : {'display':'none'} }>  
        <Header/>
            <IonContent>
                <form onSubmit={ e => handleSubmit(e)}>
                    <IonGrid className='create-grid'>
                        <IonRow>
                            <IonCol className='create-banner-col'>
                                
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='create-circle-box'>
                                <div className='create-circle'>
                                    <IonIcon className='create-circle-icon' icon={footballOutline} />
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol size='9'>
                                <IonTitle>Clubes</IonTitle>
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                 <IonItem className='create-item-list'>
                                    <IonList className='create-list-clubes'>
                                        <IonRadioGroup value={selected} onIonChange={ e => handleChange(e) } name='club'>                                  

                                            {
                                                dataClubes && dataClubes.map((item,index) => {
                                                    return (
                                                        <IonItem key={index}>
                                                            <IonLabel>{item.name}</IonLabel>
                                                            <IonRadio slot="start" value={item.name} />
                                                        </IonItem>
                                                    )
                                                })
                                            }

                                        </IonRadioGroup>
                                    </IonList> 
                                 </IonItem>
                            </IonCol>
                        </IonRow>                   

                        <IonRow>
                            <IonCol className='create-col-select'>
                                <IonLabel>Modo</IonLabel>
                                <IonItem>
                                    <IonSelect placeholder="F6" name='mode' onIonChange={e => handleChange(e)}>
                                        <IonSelectOption value="F11">F11</IonSelectOption>
                                        <IonSelectOption value="F8">F8</IonSelectOption>
                                        <IonSelectOption value="F7">F7</IonSelectOption>
                                        <IonSelectOption value="F6">F6</IonSelectOption>
                                        <IonSelectOption value="F5">F5</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol className='create-col-select'>
                                <IonLabel>Género</IonLabel>
                                <IonItem>                                
                                    <IonSelect placeholder="Genero" name='genre' onIonChange={e => handleChange(e)}>
                                        <IonSelectOption value="Hombre">Hombres</IonSelectOption>
                                        <IonSelectOption value="Mujeres">Mujeres</IonSelectOption>
                                        <IonSelectOption value="Mixto">Mixto</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        </IonRow>                       

                        <IonRow className='create-row-selects'>
                            <IonCol className='create-col-select'>
                                <IonLabel>Jugadores</IonLabel>
                                <IonItem>
                                    <IonSelect placeholder="1" name='players' onIonChange={e => handleChange(e)}>
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                        <IonSelectOption value="4">4</IonSelectOption>
                                        <IonSelectOption value="5">5</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        </IonRow> 

                        <IonRow className='create-row-selects'>
                            <IonItem>
                                <IonCol className='create-col-btn' size='2'>
                                    <IonLabel>
                                        <IonButton id="open-modal" expand="block">
                                            <IonIcon icon={calendarOutline} />
                                        </IonButton>
                                        <Modal funcDate={getDate} />
                                    </IonLabel>                                
                                </IonCol>
                                <IonCol className='create-col-hour' size='3'>
                                    <IonTitle>
                                        {date && date.getHours()}:
                                        {date && date.getMinutes()}
                                    </IonTitle>                              
                                </IonCol>
                                <IonCol className='create-col-date'>
                                    <IonTitle>
                                        {date.getDate()} / {date && date.getMonth()+1} / {date && date.getFullYear()} /
                                    </IonTitle>                              
                                </IonCol>
                            </IonItem>
                        </IonRow> 

                        <IonRow className='create-row-selects'>
                            <IonCol className='create-col-date'>
                                <IonButton type='submit'>
                                    <IonIcon slot="start" icon={footballOutline} />
                                    Crear partido
                                </IonButton>
                            </IonCol>
                        </IonRow>

                        
                    </IonGrid>
                </form>
            </IonContent>
    </IonPage>
  );
};

export default CreateMatch;