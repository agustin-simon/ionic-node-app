import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { footballOutline, calendarOutline, arrowBack } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Club } from '../../models/club.model';
import matchService from '../../services/match.service';
import userService from '../../services/user.service';
import Modal from '../Modal/Modal';
import './CreateMatchModal.css';

interface Props {
    restart : Function,
    clubes: Club[]
}

const CreateMatchModal: React.FC<Props> = (props: Props) => {
    
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null); 
  const { clubes, restart } = props;
  
  const actualDate = new Date();
  const [date, setDate] = useState<Date>(actualDate);;
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

  const confirm = async () => {
    const promise = await matchService.createMatch(data, user.data); 
    const userData = await userService.getUserWithToken(user.data);
    userData.matches.push(promise._id);
    
    await userService.updateUser(user.data, userData.matches);
    restart();
    modal.current?.dismiss(input.current?.value, 'confirm');
  }
  
  const { user } = useAuth();

  const getDate = ( dateValue: any ) => {
    const tempDate = new Date(dateValue);
    setData({
        ...data,
        date: dateValue
    })
    setDate(tempDate);
  }

  const cancel = () => {
    modal.current?.dismiss(input.current?.value, 'cancel');
  }

  const handleChange = (e: any) => {
    setSelected(e.target.value);
    setData({
        ...data,
        [e.target.name] : e.target.value
    })
  }

  return (
        <IonModal ref={modal} trigger="open-create-match">
            <IonContent>
                <IonGrid className='create-grid'>
                    <IonRow>
                        <IonCol className='create-banner-col' style={{'display':'flex','alignItems':'center'}}>
                            <IonButton className='btn-back' onClick={cancel}>
                                <IonIcon style={{'fontSize':'1.5em','color':'white'}} icon={arrowBack} size='large'/>
                            </IonButton>
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
                                            clubes.map((item,index) => {
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
                                    <IonButton id="open-calendar" expand="block">
                                        <IonIcon icon={calendarOutline} />
                                    </IonButton>
                                </IonLabel>                                
                                <Modal funcDate={getDate} />
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
                            <IonButton type='submit' onClick={confirm}>
                                <IonIcon slot="start" icon={footballOutline}/>
                                Crear partido
                            </IonButton>
                        </IonCol>
                    </IonRow>                            
                </IonGrid>
            </IonContent>
        </IonModal>
  );
};

export default CreateMatchModal;
