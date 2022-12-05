import { homeOutline, personCircleOutline, mailOutline, footballOutline, shieldOutline } from 'ionicons/icons';

const items = [
    {
        to: '/matches',
        icon: homeOutline,
        text: 'Inicio',        
    },
    {
        to: '/clubes',
        icon: shieldOutline,
        text: 'Clubes'
    },
    {
        to: '/profile',
        icon: personCircleOutline,
        text: 'Cuenta'
    },
    {
        to: '/my-matches',
        icon: footballOutline,
        text: 'Mis partidos'
    },
    {
        to: '/contact',
        icon: mailOutline,
        text: 'Contacto'
    },
];

export default items;