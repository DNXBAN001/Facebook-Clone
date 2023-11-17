import { ArrowDropDown } from "@mui/icons-material";
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';


export default function ProfileCover(){

    return(
        <div className="cover-container">
            <div><img src="./images/bandile-cover.jpg" width="1230" height="400" alt="" /></div>
            <div className="profile-info-container">
                <div className="name-friends-container">
                    <div><img src="./images/bandile-profile.jpg" className="profile-photo" alt="" /></div>
                    <div className="name-friends">
                        <h1>Bandile Danxa</h1>
                        <p>1.4k friends</p>
                        <img src="./images/bandile-friends-preview.png" alt="" />
                    </div>
                </div>
                <div className="addStory-editProfile-buttons">
                    <span className="add-story-button"><img src="./images/plus-icon.png" alt="" /> Add to Story</span>
                    <span className="edit-profile-button"><img src="./images/edit-profile-icon.png" alt="" /> Edit Profile</span>
                    <span className="arrow-down-button"><ArrowDropDown /></span>
                </div>
            </div>
            <div className="tabs-and-button-container">
                <div className="tabs-container">
                    <div className="profile-tab posts">Posts</div>
                    <div className="profile-tab">About</div>
                    <div className="profile-tab">Friends</div>
                    <div className="profile-tab">Photos</div>
                    <div className="profile-tab">Videos</div>
                    <div className="profile-tab">Reels</div>
                    <div className="profile-tab more-tab">More<ArrowDropDown /></div>
                </div>
                <div><MoreHorizSharpIcon /></div>
            </div>
        </div>
    )

}