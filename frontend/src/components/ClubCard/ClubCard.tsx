import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { calendarOutline, alarmOutline, shield } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Club } from '../../models/club.model';
import './ClubCard.css';

interface Props {
  club: Club
}

const ClubCard: React.FC<Props> = (props :Props) => {

  const { club } = props;
  return (
    <IonCard className='card-match'>  
    <IonCardContent className='card-cont' style={{'padding':'1px'}}>   
      <Link style={{ 'display': 'flex', 'textDecoration': 'none'}} to={`/club/${club._id}`}>        
          <div className='card-box-img'>       
              <div className='card-club-img'>
              
              </div>  
          </div>

          <div>
            <div style={{'display':'flex','width':'14em','justifyContent':'space-between'}}>
                <div className='card-box-content' style={{'marginLeft':'8px'}}>       
                    <IonCardTitle className='card-box-data-match-title'>{club.name}</IonCardTitle>
                    <IonCardSubtitle className='card-box-data-match-subtitle'>
                      <IonIcon className='card-box-icon' icon={alarmOutline} />
                        {club.hour}
                    </IonCardSubtitle>
                    <IonCardSubtitle className='card-box-data-match-subtitle'>
                        <IonIcon className='card-box-icon' icon={calendarOutline} />
                        {club.address}
                    </IonCardSubtitle>                                          
                </div>     
                <div style={{'textAlign':'center','padding':'2px'}}>
                    <IonIcon icon={shield} style={{'fontSize':'22px','color':'gray'}}/>
                </div> 
            </div>                 
          </div>  
        </Link>    
  </IonCardContent>               
</IonCard>
  );
};

export default ClubCard;