import { VideoSettings } from "@mui/icons-material";
import Story from "./Story";


export default function StoriesReels(){

    return(
        <div className="stories-reels-container">
            <div className="stories-reels-buttons">
                <div className="button one">
                    <img src="./images/stories-icon.png" className="label" alt=""/>
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