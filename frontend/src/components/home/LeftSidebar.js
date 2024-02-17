import React from "react"
import { UserContext } from "./HomePage";
import MenuItem from "../MenuItem";
import data from "../../utils/side-menu-data";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

export default function LeftSidebar(){

    const user = React.useContext(UserContext)

    // console.log(user.profilePhoto, user.firstName, user.lastName)

    let i = 0
    const menuItems = data.map(menuItem => {
        i++
        return i === 1 ? (<Link to="/profile" key={i} style={{color: "black", textDecoration: "none"}}>
            <MenuItem icon={user.profilePhoto} label={`${user.firstName} ${user.lastName}`}/> </Link>):
            (<MenuItem key={menuItem.id} icon={menuItem.icon} label={menuItem.label}/>)
    })

    return(
        <div className="menu-items-container">
            {menuItems}
            <div className="menu-item-container">
                <div className="sidebar-menu-icon-container"><ExpandMoreIcon fontSize="large"/></div>
                <p className="menu-label">See more</p>
            </div>
            <div className="shortcuts-label"><h4 className="hrline">Your shortcuts</h4></div>
            <div className="menu-item-container">
                <div className="sidebar-menu-icon-container">
                    <img src="./images/pool-icon.png" className="sidebar-menu-icon" alt=""/>
                </div>
                <p className="menu-label">8 Ball Pool</p>
            </div>
            <div className="menu-item-container">
                <div className="sidebar-menu-icon-container">
                    <img src="./images/traffic-motorbike-icon.png" className="sidebar-menu-icon" alt=""/></div>
                <p className="menu-label">Traffic Motorbike</p>
            </div>
            <div className="footer-container"><p>Privacy · Terms  · Advertising  · Ad Choices   · Cookies  ·<br/>  More · Meta © 2024</p></div>
        </div>
    )
}