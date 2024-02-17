import React from "react";
import { UserContext } from "../home/HomePage";
import ProfileCover from "./ProfileCover";
import Intro from "./Intro";
import StatusForm from "../StatusForm";
import PostsManager from "./PostsManager";
import Post from "../Post";
import profilesData from "../../utils/profiles";

export default function Profile(){

    const user = React.useContext(UserContext)

    console.log(user)

    return(
        <div className="profile-container">
            <ProfileCover />
            <div className="grid">
                <Intro />
                <div>
                    {/* <StatusForm className="profile-status-form"/> */}
                    <PostsManager/>
                    <Post 
                        className="post-frame" profilePhoto={profilesData[0].profilePhoto} 
                        writer={profilesData[0].firstName +" "+profilesData[0].lastName}
                        timePosted={profilesData[0].posts[0].timePosted}
                        privacy={profilesData[0].posts[0].privacy}
                        caption={profilesData[0].posts[0].caption}
                        photo={profilesData[0].posts[0].photo}
                        likes={profilesData[0].posts[0].reactions.likes}
                        comments={profilesData[0].posts[0].comments.length}
                    />
                </div>
            </div>
        </div>
    )

}