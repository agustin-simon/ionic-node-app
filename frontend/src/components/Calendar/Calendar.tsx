import { IonDatetime } from '@ionic/react';
import './Calendar.css';

interface Props {
    elemDate: string,
}

const Calendar: React.FC = () => {

  return (
        <IonDatetime locale="es-ES" display-format="DD/MM/YYYY">
            <span slot="time-label">Tiempo</span>
        </IonDatetime>
  );
};

export default Calendar;