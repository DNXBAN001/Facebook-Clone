import Story from "./Story";
import data from "../../utils/stories";

export default function StoriesReels(){

    const stories = data.map(story => (
        <Story key={story.id} storyImg={story.storyImg} accImg={story.accImg} contactName={story.contactName} />
    ))

    return(
        <div className="stories-reels-container">
            <div className="stories-reels-tab-container">
                <div className="tab tab-one">
                    <img src="./images/stories-icon.png" className="tab-icon" alt=""/>
                    <p>Stories</p>
                </div>
                <div className="tab">
                    <img src="./images/reels-icon.jpg" width="35" height="35" className="tab-icon" alt=""/>
                    <p>Reels</p>
                </div>
            </div>
            <div className="stories-container">
                <div>
                    <img src="./images/create-story-icon.png" className="story" alt="" />
                </div>
                {stories}
            </div>
        </div>
    )
}