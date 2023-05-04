import { Games, Groups, Home, Menu, Notifications,
    Search, Store } from "@mui/icons-material";


export default function Header(){

    return(

        <div className="header-container">
            <div className="left-nav row">
                <div><img src="./images/facebook-icon.png" alt="logo"/></div>
                <form className="search-form">
                    <input type="text" placeholder="Search Facebook" className="search-field"/>
                    <Search className="search-icon"/>
                </form>
            </div>
            <div className="center-nav row">
                <div className="home"><a href="/"><Home className="nav-icon"/></a></div>
                <div><a href="/"><Store className="nav-icon"/></a></div>
                <div><a href="/"><Groups className="nav-icon"/></a></div>
                <div><a href="/"><Games className="nav-icon"/></a></div>
            </div>
            <div className="right-nav row">
                <div className="nav-icon-container"><a href="/"><Menu className="nav-icon menu"/></a></div>
                <div className="nav-icon-container"><a href="/"><img src="./images/messenger-icon0.png" className="nav-icon messenger" alt=""/></a></div>
                <div className="nav-icon-container"><a href="/"><Notifications className="nav-icon notifications"/></a></div>
                <div className="nav-icon-container">
                    <a href="/">
                        <img src="./images/bandile-profile.jpg" width="40" height="40" className="nav-icon account-circle" 
                                style={{borderRadius: "20px"}} alt=""/>
                    </a>
                </div>
            </div>
        </div>

    )
}

//<AccountCircle className="nav-icon account-circle"/>