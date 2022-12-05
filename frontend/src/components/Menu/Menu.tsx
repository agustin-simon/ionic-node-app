import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import menuItems from './MenuItems';
import './Menu.css';

const Menu: React.FC = () => {

  const { logout } = useAuth(); 
  const menu = useRef<HTMLIonMenuElement>(null);
  const history = useHistory();

  const handleLogOut = () => {
    closeMenu('');
    window.history.replaceState({}, document.title);    
    logout();
  }  

  const closeMenu = (e: any) => {
    menu.current?.close();
    if(e.to === '/profile') {
        history.push({ pathname: "/empty" });
        history.replace({ pathname: "/profile" });
    }
  }

  return (
        <IonMenu ref={menu} className='menu-container' side="start" contentId="contentApp" swipeGesture={false}>
            <IonHeader>
                <IonToolbar className='menu-toolbar'>
                    <IonTitle>
                        App Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='menu-content'>              
                <IonList>
                    {
                        menuItems && menuItems.map((item,index) => {
                            return(
                                <Link className='link-form' to={item.to} key={index} onClick={()=> closeMenu(item)}>
                                    <IonItem className='club-list-item'>
                                        <IonIcon className='menu-icon' icon={item.icon} />
                                        {item.text}
                                    </IonItem> 
                                </Link>
                            )
                        })
                    }
                    <Link className='link-form' to='/home' onClick={handleLogOut}>
                        <IonItem>
                            <IonIcon className='menu-icon' icon={exitOutline} />                      
                            Salir
                        </IonItem>
                    </Link>
                </IonList>
            </IonContent>
        </IonMenu>
  );
};

export default Menu;