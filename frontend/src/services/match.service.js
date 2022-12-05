import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/matches';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then( res => res.data);    
}

const getMatchById = (id) => {
    const req = axios.get(`${baseUrl}/${id}`);
    return req.then( res => res.data);  
}

// Test
const getMatchesByUser = ( matchId , token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const req = axios.get(`${baseUrl}/user/${matchId}`, config);
    return req.then( res => res.data);  
}

const createMatch = ( newObject , token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const req = axios.post(baseUrl, newObject, config);
    return req.then( res => res.data );
}

const addPlayerToMatch = ( id, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const req = axios.put(`${baseUrl}/add/player/${id}`,'',config);
    return req.then( res => res.data );
}

const deleteMatch = (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const req = axios.delete(`${baseUrl}/${id}`, config);
    return req.then( res => res.data );
}

const updateMatch = (id, token) => {
    
}

export default { getAll, createMatch, getMatchesByUser, getMatchById, addPlayerToMatch, deleteMatch };