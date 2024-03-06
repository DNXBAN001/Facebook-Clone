import React from "react";
import axios from "axios";

const AppContext = React.createContext()

export function AppProvider({ children }){

    const [isLoading, setLoading] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [posts, setPosts] = React.useState([])

    async function logoutUser(){
        try{
            await axios.delete("http://localhost:5000/logout", {
                headers: {
                    "Authorization": "Bearer "+ user.accessToken
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
                posts, 
                setPosts,
                isLoading, 
                setLoading, 
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