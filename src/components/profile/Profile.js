import ProfileCover from "./ProfileCover";
import Intro from "./Intro";
import StatusForm from "../StatusForm";
import PostsManager from "./PostsManager";
import Post from "../Post";

export default function Profile(){

    return(
        <div className="profile-container">
            <ProfileCover />
            <div className="grid">
                <Intro />
                <div>
                    <StatusForm className="profile-status-form"/>
                    <PostsManager/>
                    <Post className="post-frame"/>
                </div>
            </div>
        </div>
    )

}