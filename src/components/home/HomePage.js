import React from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Newsfeed from "./Newsfeed";
import Contacts from "./Contacts";
// import Profile from "../profile/Profile";

export default function HomePage(){
    
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