import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { football, shield } from 'ionicons/icons';
import { Route } from 'react-router-dom';
import Clubes from '../Clubes/Clubes';
import Matches from '../Matches/Matches';
import './Test.css';

const Test: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>  
        <Route path="/clubes">
          <Clubes/>
        </Route>
        <Route path="/matches">
          
        </Route>
      </IonRouterOutlet>
    
    <IonTabBar slot="bottom">
      <IonTabButton tab="base" href="/clubes">
        <IonIcon icon={shield} />
        <IonLabel>Clubes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="matches" href="/matches">
        <IonIcon icon={football} />
        <IonLabel>Partidos</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
  );
};

export default Test;