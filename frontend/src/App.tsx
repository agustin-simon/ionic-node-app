import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home/Home';
import Matches from './pages/Matches/Matches';
import Clubes from './pages/Clubes/Clubes';
import Profile from './pages/Profile/Profile';
import Menu from './components/Menu/Menu';
import MyMatches from './pages/MyMatches/MyMatches';
import OneMatch from './pages/OneMatch/OneMatch';
import Register from './pages/Register/Register';

import { AuthProvider } from './context/authContext';
import Test from './pages/Test/Test';
import OneClub from './pages/OneClub/OneClub';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SendEmail from './pages/SendEmail/SendEmail';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const [render, setRender] = useState<boolean>(false);

  const resetRender = () => {
    setRender(!render);
  }
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
            <IonContent>
                <Menu/>
                  <IonRouterOutlet id='contentApp'> 
                      <Route exact path="/home">
                        <Home/>
                      </Route>            
                      <Route exact path="/clubes">
                        <Clubes/>
                      </Route>
                      <Route exact path="/matches">
                        <Matches render={resetRender}/>
                      </Route>
                      <Route exact path="/my-matches">
                        <MyMatches/>                    
                      </Route>
                      <Route exact path="/match/:id">
                        <OneMatch/>
                      </Route>
                      <Route exact path="/profile/:id">
                        <Profile render={render}/>
                      </Route>
                      <Route exact path="/profile/">
                        <Profile render={render}/>
                      </Route>
                      <Route exact path="/register">
                        <Register/>
                      </Route>
                      <Route exact path="/send-email-password">
                        <SendEmail/>
                      </Route>
                      <Route exact path="/reset-password/:id">
                        <ResetPassword/>
                      </Route>
                      <Route exact path="/club/:id">
                        <OneClub/>
                      </Route>
                      <Route exact path="/home">
                        <Home/>
                      </Route>
                      
                  </IonRouterOutlet>
            </IonContent>        
        </IonReactRouter>
      </AuthProvider> 
    </IonApp>
  );
}

export default App;
