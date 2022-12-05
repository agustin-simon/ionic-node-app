import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonCard, IonToast } from '@ionic/react';
import { informationCircle, star } from 'ionicons/icons';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';
import userService from '../../services/user.service'
import './SendEmail.css';

const SendEmail: React.FC = () => {
  
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setErrorMessage('');
    setEmail(e.target.value);
  }; 
  
  const handleSubmit = () => {

    const sendResetPasswordEmail = async () => {
        await userService.sendResetUserPassword(email);  
    }

    const setToastTime = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);        
    }    

    if(email != '') {
        setLoading(true);
        setTimeout(() => {
            sendResetPasswordEmail()
                .then(res => {
                    setLoading(false);
                    setToastTime();
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message);
                    setError(true);
                    setLoading(false);
                });
        }, 2000); 
    }
  }

  return (
    <IonPage className='fullscreen'>
        <IonContent className='home-content fullscreen' color='featured'>
            <IonGrid fixed={true} className='fullscreen'>
                <IonRow className='home-row-logo'>
                    <IonCol className='home-col-logo'>
                        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                    </IonCol>
                </IonRow>
                <IonTitle className='ion-text-center' style={{'fontSize':'18px'}}>
                    
                </IonTitle>
                <IonCard style={{'padding':'10px','textAlign':'center', 'boxShadow':'none'}}>
                    Introduce tu correo electrónico y te enviaremos un enlace para que vuelvas a entrar en tu cuenta.
                </IonCard>
                <IonRow className='home-row-form'>
                    <IonCol className='home-col-form'>  
                        {
                            loading ?   <div style={{'display':'flex','flexDirection':'column','justifyContent':'center','alignItems':'center'}}>
                                            <IonTitle>Processing data...</IonTitle>
                                            <Loading name=''/>
                                        </div>
                                    : <IonItem className='home-item' color='darkgreen'>                            
                                            <IonLabel color={errorMessage != '' ? 'danger' : 'light'} position="floating">                                
                                                Email
                                            </IonLabel>
                                            <IonInput
                                                    color={errorMessage != '' ? 'danger' : 'light'}
                                                    type='text' 
                                                    name='email' 
                                                    onIonChange={ e => handleChange(e) }>
                                            </IonInput>
                                        </IonItem>
                        }
                        {
                            errorMessage != '' && !loading ? <div style={{'fontWeight':'bold','fontSize':'13px','backgroundColor':'#367836','width':'100%','height':'2em','marginTop':'6px','borderRadius':'4px','color':'#eb445a','display':'flex', 'alignItems':'center','padding':'14px'}}>
                                                    {errorMessage}
                                                 </div>
                                               : ''
                        }
                        <IonButton 
                                type='submit' 
                                className='home-btn-form' 
                                expand="block" 
                                color='light'
                                onClick={handleSubmit}>
                                    Enviar email
                        </IonButton>
                    </IonCol>
                </IonRow>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="The email has been sent successfully"                    
                    position="bottom"
                />
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default SendEmail;