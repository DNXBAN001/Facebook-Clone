import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const AppContext = React.createContext()

export function AppProvider({ children }){

    const [isLoading, setIsLoading] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const accessToken = new Cookies().get("accessToken")

    async function logoutUser(){
        try{
            await axios.delete("http://localhost:5000/logout", {
                headers: {
                    "Authorization": "Bearer "+ accessToken
                }
            })
        }catch(err){
            alert("Error while logging out user...")
        }
    }

    return(
        <AppContext.Provider
         value={{
                user, 
                setUser,
                isLoading, 
                setIsLoading, 
                logoutUser
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext(){
    return React.useContext(AppContext)
}