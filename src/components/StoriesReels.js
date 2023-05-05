import { VideoSettings } from "@mui/icons-material";
import Story from "./Story";


export default function StatusReels(){

    return(
        <div className="stories-reels-container">
            <div className="stories-reels-buttons">
                <div className="button one">
                    <VideoSettings className="label"/>
                    <p>Stories</p>
                </div>
                <div  className="button">
                    <img src="./images/reels-icon.jpg" width="34" height="34" className="label" alt=""/>
                    <p>Reels</p>
                </div>
            </div>
            <div className="stories-container">
               <Story className="stories"/>
            </div>
        </div>
        
    )

}