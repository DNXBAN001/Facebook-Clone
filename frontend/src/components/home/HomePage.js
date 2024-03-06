import React from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Newsfeed from "./Newsfeed";
import Contacts from "./Contacts";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
import { useGlobalContext } from "../../context-provider";


export default function HomePage(props){
    
    const { user } = useGlobalContext()
    
    console.log(user)

    return(
        <>
            <Header />
            <div className="main-body-container">
                <LeftSidebar />
                <Newsfeed />
                <Contacts />
            </div>
        </>
    )
}