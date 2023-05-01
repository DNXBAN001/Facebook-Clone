import { Timelapse } from "@mui/icons-material";


export default function Intro(){
    return(
        <div className="intro-container">
            <h3>Intro</h3>
            <div className="bio">
                <p>"Smooth seas do not make good sailors"<br/><br/>
                    Aspiring Engineer<br/><br/>
                    Ok, let's do this!
                </p>
                <div className="edit-button">Edit bio</div>
            </div>
            <div className="relationship-status-container intro-row">
                <img src="./images/heart-icon.png" alt="" />
                <p className="rel-status">Single</p>
            </div>
            <div className="joined-container intro-row">
                <Timelapse />
                <p className="joined">Joined October 2012</p>
            </div>
            <div className="edit-button">Edit details</div>
        </div>
    )
}