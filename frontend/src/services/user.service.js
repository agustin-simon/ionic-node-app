import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/users';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then( res => res.data );    
}

const getUsersByMatch = (matchId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const req = axios.get(`${baseUrl}/match/${matchId}`, config);
    return req.then( res => res.data );    
}

const getUserWithToken = ( token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const req = axios.get(`${baseUrl}/get_user`, config);
    return req.then( res => res.data );  
}

const activateUserAccount = (email) => {
    const obj = {
        email: email
    }
    const req = axios.post(`${baseUrl}/send-email`,obj);
    return req.then( res => res.data );  
}

const sendResetUserPassword = (email) => {
    const obj = {
        email: email
    }
    const req = axios.post(`${baseUrl}/send-email-password`,obj);
    return req.then( res => res.data );  
}

const updatePasswordUser = (password, id) => {    
    const obj = {
        password: password
    }
    const req = axios.put(`${baseUrl}/reset-password/${id}`, obj);
    return req.then( res => res.data );  
};

const updateUser = ( token, body ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const req = axios.put(baseUrl, body, config);
    return req.then( res => res.data );  
}

const deleteUserByMatch = (matchId, userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const obj = {
        id: userId
    }

    const req = axios.put(`${baseUrl}/match/${matchId}`, obj ,config);
    return req.then( res => res.data );    
}

export default { getAll, getUserWithToken, activateUserAccount, updateUser, getUsersByMatch, deleteUserByMatch, sendResetUserPassword, updatePasswordUser };