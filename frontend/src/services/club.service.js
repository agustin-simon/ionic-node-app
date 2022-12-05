import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/clubes';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then( res => res.data);    
}

const getClubById = (id) => {
    const req = axios.get(`${baseUrl}/${id}`);
    return req.then( res => res.data);  
}

export default { getAll, getClubById };