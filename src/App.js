import React from "react";
import "./styles.css";
import Header from "./components/Header";
import LeftSideMenu from "./components/LeftSideMenu";
import NewsFeed from "./components/NewsFeed";
import Contacts from "./components/Contacts";
import Profile from "./components/profile/Profile";

export default function App() {

  const [isProfilePage, setIsProfilePage] = React.useState(false);

  function switchPage(id){
    setIsProfilePage(prevIsProfilePage => {
      console.log("ID of the element is: "+id)
      return (!prevIsProfilePage)
    })
  }
 
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="main-body-container">
        {isProfilePage ? (<Profile />): (<><LeftSideMenu changePage={switchPage}/><NewsFeed /><Contacts /></>)}
      </div>
    </div>
  );
}
