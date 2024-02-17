import React from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Newsfeed from "./Newsfeed";
import Contacts from "./Contacts";
import { useLocation } from "react-router-dom";
import axios from "axios";


export const UserContext = React.createContext()

export default function HomePage(props){
    
    const locationObj = useLocation()

    const [user, setUser] = React.useState("")

    React.useEffect(() => {
        async function fetchUserData(){
            const res = await axios.get("http://localhost:5000/profiles/"+locationObj.state.username)
            setUser(res.data)
        }
        fetchUserData()
    }, [])
    console.log(user)

    return(
        <UserContext.Provider value={user} >
            <Header />
            <div className="main-body-container">
                <LeftSidebar />
                <Newsfeed />
                <Contacts />
            </div>
        </UserContext.Provider>
    )
}