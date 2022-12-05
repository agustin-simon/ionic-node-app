import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const authContext = createContext();

export const useAuth = () => {       
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const url = 'http://localhost:4000/api/users';
    const urlAuth = 'http://localhost:4000/api/auth';
    

    const signUp = (dataUser) => {
        axios.post(`${url}/register`, dataUser)
            .then(res => console.log(res))
            .catch( err => console.log(err));
    }

    const login = (dataUser) => {   
        const req = axios.post(urlAuth, dataUser);
        return req.then(res => {
                    setUser(res.data);
                });                      
    }  

    const logout = () => {
        setUser(null);
    }

    return (
        <authContext.Provider value={{ signUp, login, logout, user }}>{children}</authContext.Provider>
    )
}