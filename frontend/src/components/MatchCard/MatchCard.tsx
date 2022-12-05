import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonFooter, IonIcon, IonLabel } from '@ionic/react';
import { calendarOutline, alarmOutline, trashOutline, checkmarkOutline} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../../models/match.model';
import './MatchCard.css';

interface Props {
  match: Match,
  admin: boolean,
  funcs: ObjectFunction
}

interface ObjectFunction {
  deleteMatch: Function,
  editMatch: Function
}

const MatchCard: React.FC<Props> = (props: Props) => {

  const { match, admin, funcs } = props;
  const { club, date, mode, players, genre } = match;
  const [adminOn, setAdminOn] = useState<boolean>(false);
  const newDate = new Date(date);
  const localDate = new Date();

  const checkDate = () => {
    if(localDate > newDate) {
      return false;
    }
    return true;
  }

  useEffect(() =>{        
    if(checkDate()) {
      setAdminOn(true);
    }
  }, [])

  return (
    <IonCard className='card-match'>  
        <IonCardContent className='card-cont'>   
          <Link style={{'display':'flex','textDecoration':'none'}} to={`/match/${match._id}`}>                 
              <div className='card-box-img'>       
                  <div className='card-img'>
                  
                  </div>  
              </div>

              <div>
                <div style={{'display':'flex'}}>
                    <div className='card-box-content'>       
                        <IonCardTitle className='card-box-data-match-title'>{club}</IonCardTitle>
                        <IonCardSubtitle className='card-box-data-match-subtitle'>
                          <IonIcon className='card-box-icon' icon={alarmOutline} />
                            {newDate.getHours() + "hs"}
                        </IonCardSubtitle>
                        <IonCardSubtitle className='card-box-data-match-subtitle'>
                            <IonIcon className='card-box-icon' icon={calendarOutline} />
                            {newDate.getDate() + "/" + newDate.getMonth()}
                        </IonCardSubtitle>                                          
                    </div>     
                    <div style={{'width':'32%', 'textAlign':'center'}}>
                        <IonChip color="primary" className='card-box-chip'>
                          <IonLabel color="dark">{mode}</IonLabel>
                        </IonChip>
                        <IonChip color="primary" className='card-box-chip'>
                          <IonLabel color="dark">{genre}</IonLabel>
                        </IonChip>
                        <IonChip color="primary" className='card-box-chip'>
                          <IonLabel color="dark">
                            {players}
                          </IonLabel>
                        </IonChip>
                    </div> 
                </div>                 
              </div>    
              </Link>              
      </IonCardContent>
          {
            admin ? adminOn ? <IonFooter>
                                  <div style={{'display':'flex', 'justifyContent':'center','padding':'4px','marginTop':'10px'}}>
                                    <IonButton>
                                        <IonIcon icon={checkmarkOutline}/>
                                    </IonButton>
                                    <IonButton style={{'marginLeft':'40px'}} color='danger' onClick={() => funcs.deleteMatch(match._id)}>
                                        <IonIcon icon={trashOutline}/>
                                    </IonButton>
                                </div> 
                              </IonFooter>
                              : ''
                  : ''
          }      
    </IonCard>
  );
};

export default MatchCard;