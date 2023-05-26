import FormButtons from "./ILButton";
import CommentField from "./IconInputForm";
import data from "../utils/post-ilbuttons";

export default function Post(){

    const formButtons = data.map(button => (
        <FormButtons key={button.id} buttonIcon={button.buttonIcon} buttonLabel={button.buttonLabel}/>
    ))

    return(
        <div className="post-container">
            <div className="post-info-container">
                <div>
                    <img src="./images/bandile-profile.jpg" width="35" height="35" style={{borderRadius: "20px"}} alt=""/>
                </div>
                <div className="post-info">
                    <div className="postOwner">Bandile Danxa</div>
                    <div className="timePosted-privacy">1 day ago · public</div>
                </div>
            </div>
            <div className="caption">
                Hi there!
            </div>
            <div>
                <img src="./images/bandile-cover.jpg" className="post-image" alt=""/>
            </div>
            <div className="post-stats">
                <div>100 likes</div>
                <div>2 comments</div>
            </div>
            <div className="react-buttons-container">
                {formButtons}
            </div>
            <div className="comment-field">
                <CommentField text="Write a comment..." style={{fontSize: "14px"}}/>
            </div>
        </div>
    )
}