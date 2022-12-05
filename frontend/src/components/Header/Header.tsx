import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import { notifications } from 'ionicons/icons';
import './Header.css';

const Header: React.FC = () => {
  return (
        <IonHeader className='header-box'>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonMenuButton className='header-icon'/>
                </IonButtons>  
                <IonButtons slot='end'>
                    <IonIcon className='header-icon-bell' icon={notifications} />
                </IonButtons>                               
            </IonToolbar>
        </IonHeader>
  );
};

export default Header;