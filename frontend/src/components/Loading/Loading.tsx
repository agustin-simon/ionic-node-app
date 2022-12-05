import { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonProgressBar, IonRouterLink, IonRow, IonTitle } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { useAuth } from '../../context/authContext';
import { useHistory } from 'react-router-dom';
import './Loading.css';

interface Props {
    name: string,
}

const Loading: React.FC<Props> = (props: Props) => {

  const { name } = props;  

  return (         
        <>                
            {
                name != ''  ? <h2 style={{'fontSize':'28px','fontFamily':'Roboto-Italic'}}>Bienvenido {name}</h2>
                            : ''
            }
            <IonProgressBar style={{'marginTop':'20px','width':'85%','textAlign':'center'}} type="indeterminate"></IonProgressBar>
        </> 
  );
};

export default Loading;