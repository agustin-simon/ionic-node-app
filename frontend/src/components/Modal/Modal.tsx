import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonDatetime } from '@ionic/react';
import { useRef } from 'react';
import './Modal.css';

interface Props {
    funcDate: (e: any) => void,
}

const Modal: React.FC<Props> = ( props: Props ) => {    

    const { funcDate } = props;
    const elemDate = useRef<HTMLIonDatetimeElement>(null);

    const modalElem = useRef<HTMLIonModalElement>(null);
    const inputElem = useRef<HTMLIonInputElement>(null);    

    function confirm( elem: any ) {
        funcDate(elem.current.value);
        modalElem.current?.dismiss(inputElem.current?.value, 'confirm');
    }    

  return (    
        <IonModal ref={modalElem} trigger="open-calendar">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => modalElem.current?.dismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className='ion-text-center'>Hora</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm(elemDate)}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonDatetime locale="es-ES" display-format="DD/MM/YYYY" ref={elemDate}>
                        <span slot="time-label">Tiempo</span>
                    </IonDatetime>
                </IonItem>
            </IonContent>
        </IonModal>
  );
};

export default Modal;