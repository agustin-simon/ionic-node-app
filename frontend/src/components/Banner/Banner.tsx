import { IonRow, IonCol, IonIcon } from '@ionic/react';
import { footballOutline } from 'ionicons/icons';
import './Banner.css';

interface BannerProps {
    height: string,
    size: string,
    icon: string
}

const Banner: React.FC<BannerProps> = (props: BannerProps) => { 
    const { height, size, icon } = props;
    
    return (
        <>
            <IonRow>
                <IonCol style={{'backgroundColor':'#34b54e','height':`${height}em`}}>
                    
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className='create-circle-box'>
                    <div className='create-circle'>
                        <IonIcon className='create-circle-icon' icon={icon} style={{'fontSize':`${size}px`}}/>
                    </div>
                </IonCol>
            </IonRow>
        </>
    )
}

export default Banner;