import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonIcon, IonProgressBar } from '@ionic/react';
import { close } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Club } from '../../models/club.model';
import './MapModal.css';

interface Props {
    club: Club | undefined,
}

const MapModal: React.FC<Props> = ( props : Props ) => {    

    const { club } = props;
    const [loaded,setLoaded] = useState<Boolean>(false);
    const mapModal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const confirm = () => {
        setLoaded(false);
        mapModal.current?.dismiss(input.current?.value, 'confirm');
    } 

  return (    
        <IonModal ref={mapModal} trigger="open-map-modal" >
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='ion-text-center'>{club?.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                            <IonIcon icon={close} style={{'fontSize':'25px'}}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <iframe onLoad={() => setLoaded(true)} className={loaded ? 'iframe-modal' : 'iframe-modal-disabled'}
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=alsina%20y%20san%20martin%20tandil+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
                <div style={loaded ? {'display':'none'} : {'height':'100%','display':'flex','flexDirection':'column', 'justifyContent':'center'}}>
                    <div style={{'padding':'10px'}}>
                        <IonProgressBar className={loaded ? 'txt-loaded-disabled' : 'txt-loaded'} type="indeterminate"></IonProgressBar>
                        <IonTitle style={{'textAlign':'center','marginTop':'2em'}} className={loaded ? 'txt-loaded-disabled' : 'txt-loaded'}>Loading...</IonTitle> 
                    </div>
                </div>  
            </IonContent>
        </IonModal>
  );
};

export default MapModal;