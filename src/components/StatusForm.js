import data from "../utils/profiles";

export default function StatusForm(){

    const profileOwner = data[0].firstName;
    return(
        <div className="status-form-container">
           <div className="inline-row form"> 
                <div className="acc-circle-container">
                    <img src="./images/bandile-profile.jpg" width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                </div>
                <div className="status-field">
                    <input type="text" placeholder={`What's on your mind, ${profileOwner}?`} />
                </div>
            </div>
            <div className="bottom-buttons">
                <div><img src="./images/live-video.png" width="24" height="24" alt=""/><p>Live video</p></div>
                <div><img src="./images/photos-videos.png" width="24" height="24"alt=""/><p>Photo/video</p></div>
                <div><img src="./images/smiley-icon.png" width="24" height="24"alt=""/><p>Feeling/activity</p></div>
            </div>
        </div>
    )

}