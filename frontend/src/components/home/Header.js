import React from "react";
import { Menu, Notifications, Search } from "@mui/icons-material";
import { UserContext } from "./HomePage";

export default function Header(){

    const user = React.useContext(UserContext)

    function handleSubmit(event){
        event.preventDefault()
        console.log("String search for...")
    }

    return(
        <div className="header-container">
           <div className="left-nav row">
                <div><img src="./images/facebook-icon.png" width="42" height="42" alt="" /></div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input type="search" className="search-field" placeholder="Search Facebook"/>
                    <Search className="search-icon"/>
                </form>
           </div>
           <div className="center-nav row">
                <div className="nav-icon home"><a href="/"><img src="./images/home-icon-focused.png" alt=""/></a></div>
                <div className="nav-icon marketplace"><a href="/"><img src="./images/marketplace-header.png" alt=""/></a></div>
                <div className="nav-icon groups"><a href="/"><img src="./images/groups-header.png" alt=""/></a></div>
                <div className="nav-icon feeds"><a href="/"><img src="./images/feeds-header.png" alt=""/></a></div>
           </div>
           <div className="right-nav row">
                <div><Menu className="menu-icon"/></div>
                <div><img src="./images/messenger-icon0.png" className="messenger-icon" alt=""/></div>
                <div><Notifications className="notifications-icon"/></div>
                <div><img src={user.profilePhoto} className="acc-photo" width="40" height="40" alt=""/></div>
           </div>
        </div>
    )
}