import { IonModal, IonButton, IonTitle, IonContent, IonAccordion, IonItem, IonLabel, IonAccordionGroup, IonCol, IonGrid, IonIcon, IonRow, IonCheckbox, IonCardSubtitle } from '@ionic/react';
import { arrowBack, filter, searchOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import modeOptionsList from './FilterOptions/modeOptions';
import genreOptionsList from './FilterOptions/genreOptions'
import { Club } from '../../models/club.model';
import './FilterModal.css';
import playersOptionsList from './FilterOptions/playersOptions';

interface Props {
    funcs: ObjectFunction;
    clubes: Club[];
}
  
interface ObjectFunction {
filter: Function;
resetDataClubes: Function;
}

const FilterModal: React.FC<Props> = ( props: Props ) => {    
    // Props
    const { clubes, funcs } = props;

    // Variables
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null); 
    const [reset, setReset] = useState<boolean>(false);  
    
    const [filters, setFilters] = useState<any>({
        club: [],
        genre: [],
        mode: [],
        players: []         
    }); 

    // Opciones

    const [ modeOptions, setModeOptions ] = useState(modeOptionsList);
    const [ genreOptions, setGenreOptions ] = useState(genreOptionsList);
    const [ playersOptions, setPlayersOptions ] = useState(playersOptionsList);      
   
    // Funciones 
    const handleChange = (e : any) => { 

        if(filters[e.target.name].includes(e.target.value)) {
            console.log('True: si lo incluye')
            const newArray = filters[e.target.name].filter( ( elem: any ) => elem != e.target.value );
            filters[e.target.name] = newArray;
            console.log(filters)
        } else {
            console.log('False: no lo incluye')
            filters[e.target.name].push(e.target.value); 
            console.log('handlechange else')
        }
        console.log(filters)
    };

    const resetFilters = () => {
        const emptyObj = {
            club: [],
            genre: [],
            mode: [],
            players: [] 
        };
        setFilters(emptyObj);
    };

    const handleClickOptions = (item: any, list: any) => {
        console.log(item)
        if(item.checked) {
            item.checked = false;
        } else {
            item.checked = true;
        }

        console.log("despues", item)
        for (let i = 0; i < list.length; i++) {
            if(list[i]?.name === item.name) {
                list[i] = item;
            }            
        }

        console.log(modeOptions);
    }

    const handleClickClub = (item: Club) => {
        if(item.checked) {
            item.checked = false;
        } else {
            item.checked = true;
        }

        for (let i = 0; i < clubes.length; i++) {
            if(clubes[i].name === item.name) {
                clubes[i] = item;
            }
        }        
    };

    const cancel = () => {
        modal.current?.dismiss(input.current?.value, 'cancel');
    };

    const confirm = () => {
        console.log("filtersenviados", filters)
        const emptyFilter = funcs.filter(filters);
        funcs.resetDataClubes(clubes);
        setModeOptions(modeOptions);
        //setFilters(emptyFilter);
        //setReset(!reset);
        modal.current?.dismiss(input.current?.value, 'confirm');
    };

    // Cuando carga el componente
    useEffect(() => {

    }, [reset]);

  return (    
        <IonModal ref={modal} trigger="open-filter">
            <IonContent>
                <IonGrid style={{'padding':'0'}}>
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
                                <IonIcon className='create-circle-icon' icon={searchOutline} size='sm'/>
                            </div>
                        </IonCol>
                    </IonRow>                
                    <IonRow>
                        <IonTitle style={{'fontSize':'24px','padding':'16px'}}>Filtrar por</IonTitle>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{'display':'flex','flexDirection':'column','justifyContent':'center'}}>
                            <IonAccordionGroup>
                                <IonAccordion value="first">
                                    <IonItem slot="header" color="light">
                                        <IonLabel style={{'height':'30px','display':'flex','alignItems':'center'}}>Club</IonLabel>
                                    </IonItem>
                                    {
                                        clubes && clubes.map((item, index) => {
                                            return (
                                                <div className="ion-padding" slot="content" style={{'display':'flex'}} key={index}>
                                                    <IonCheckbox 
                                                        checked={item.checked}
                                                        slot="end" 
                                                        color="primary" 
                                                        name='club' 
                                                        value={item.name} 
                                                        onClick={() => handleClickClub(item)}
                                                        onIonChange={ e => handleChange(e) }/>
                                                    <IonCardSubtitle style={{'fontSize':'17px','marginLeft':'10px'}}>{item.name}</IonCardSubtitle>
                                                </div>
                                            )
                                        })
                                    }
                                </IonAccordion>
                                
                                <IonAccordion value="second">
                                    <IonItem slot="header" color="light">
                                        <IonLabel style={{'height':'30px','display':'flex','alignItems':'center'}}>Modo</IonLabel>
                                    </IonItem>
                                    {
                                        modeOptions.map((item,index) => {
                                            return (
                                                <div className="ion-padding" slot="content" style={{'display':'flex'}} key={index}>
                                                    <IonCheckbox 
                                                        checked={item?.checked}
                                                        slot="end" 
                                                        color="primary" 
                                                        name='mode' 
                                                        value={item?.name}
                                                        onClick={() => handleClickOptions(item, modeOptions)}
                                                        onIonChange={ e => handleChange(e) }/>
                                                    <IonCardSubtitle style={{'fontSize':'17px','marginLeft':'10px'}}>{item?.name}</IonCardSubtitle>
                                                </div>
                                            )
                                        })
                                    }                                   
                                </IonAccordion>

                                <IonAccordion value="third">
                                    <IonItem slot="header" color="light">
                                        <IonLabel style={{'height':'30px','display':'flex','alignItems':'center'}}>Genero</IonLabel>
                                    </IonItem>
                                    {
                                        genreOptions.map((item,index) => {
                                            return (
                                                <div className="ion-padding" slot="content" style={{'display':'flex'}} key={index}>
                                                    <IonCheckbox 
                                                        checked={item?.checked}
                                                        slot="end" 
                                                        color="primary" 
                                                        name='genre' 
                                                        value={item.name}
                                                        onClick={() => handleClickOptions(item, genreOptions)}
                                                        onIonChange={ e => handleChange(e) }/>
                                                    <IonCardSubtitle style={{'fontSize':'17px','marginLeft':'10px'}}>{item.name}</IonCardSubtitle>
                                                </div>
                                            )
                                        })
                                    }
                                </IonAccordion>

                                <IonAccordion value="fourth">
                                    <IonItem slot="header" color="light">
                                        <IonLabel style={{'height':'30px','display':'flex','alignItems':'center'}}>Jugadores</IonLabel>
                                    </IonItem>
                                    {
                                        playersOptions.map((item, index) => {
                                            return(
                                                <div className="ion-padding" slot="content" style={{'display':'flex'}} key={index}>
                                                    <IonCheckbox 
                                                        checked={item?.checked}
                                                        slot="end" 
                                                        color="primary" 
                                                        name='players' 
                                                        value={item.name}
                                                        onClick={() => handleClickOptions(item, genreOptions)}
                                                        onIonChange={ e => handleChange(e) }/>
                                                    <IonCardSubtitle style={{'fontSize':'17px','marginLeft':'10px'}}>{item.name}</IonCardSubtitle>
                                                </div>
                                            )
                                        })
                                    }
                                </IonAccordion>
                            </IonAccordionGroup>
                        </IonCol>
                    </IonRow>
                    <IonRow style={{'height':'6em','marginTop':'2em'}}>
                        <IonCol style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                            <IonButton onClick={confirm}>
                                Aplicar
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>   
            </IonContent>
        </IonModal>
  );
};

export default FilterModal;