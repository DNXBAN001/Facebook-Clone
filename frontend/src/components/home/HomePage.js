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
    console.log(locationObj.state.userId)
    React.useEffect(() => {
        async function fetchUserData(){
            try{
                const res = await axios.get("http://localhost:5000/profiles/"+locationObj.state.userId)
                setUser(res.data)
            }catch(err){
                alert("Error while trying to fetch user data...")
            }
        }
        fetchUserData()
    }, [locationObj.state.userId])
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