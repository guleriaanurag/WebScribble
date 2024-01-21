import { createContext,useState } from 'react';

export const AuthenticationContext = createContext({
    isAuthenticated: false,
    authenticateUser: ()=>{},
    logoutUser:()=>{}
})

export default function AuthenticationContextProvider({children}){
    
    const[isAuthenticated,setIsAuthenticated] = useState(false);

    function authenticateUser(){
        if(isAuthenticated===false){
            setIsAuthenticated(true);
        }
    }

    function logoutUser(){
        if(isAuthenticated){
            setIsAuthenticated(false);
        }
    }
    
    const ctxValue = {
        isAuthenticated,
        authenticateUser,
        logoutUser
    }

    return(
        <AuthenticationContext.Provider value={ctxValue}>
            {children}
        </AuthenticationContext.Provider>
    );
}