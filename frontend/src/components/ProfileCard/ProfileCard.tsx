import { IonButton, IonCard, IonCardContent, IonIcon, IonTitle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './ProfileCard.css';

interface Props {
    user: any
    deletePlayer: Function
}

const ProfileCard: React.FC<Props> = (props :Props) => {    

  const { user, deletePlayer } = props;

  return (    
        <IonCard style={{'boxShadow':'0 0.2px 1px gray','width':'100%','borderRadius':'5px','padding':'0px','backgroundColor':'white'}}>
            <IonCardContent style={{'display':'flex'}}>
                <div className='card-profile-img'>
                    
                </div>
                <IonTitle style={{'fontSize':'16px','display':'flex','justifyContent':'center','alignItems':'center'}}>{user.username}</IonTitle>
                <div style={{'width':'20%','display':'flex','justifyContent':'center','alignItems':'center'}}>
                    <IonButton shape="round" style={{'width':'3em','padding':'0'}} color='danger' onClick={ () => deletePlayer(user.id) }>
                        <IonIcon icon={closeOutline} size='large'/>
                    </IonButton>
                </div>
            </IonCardContent>
        </IonCard>
  );
};

export default ProfileCard;