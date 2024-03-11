import FormButtons from "./ILButton";
import CommentField from "./IconInputForm";
import formButtonsData from "../utils/post-ilbuttons";
import { useGlobalContext } from "../context-provider";

export default function Post(props){
    const { user } = useGlobalContext()

    const formButtons = formButtonsData.map(button => (
        <FormButtons key={button.id} buttonIcon={button.buttonIcon} buttonLabel={button.buttonLabel}/>
    ))

    return(
        <div className="post-container">
            <div className="post-info-container">
                <div>
                    <img src={props.profilePhoto} width="35" height="35" style={{borderRadius: "20px"}} alt=""/>
                </div>
                <div className="post-info">
                    <div className="postOwner">{props.writer}</div>
                    <div className="timePosted-privacy">{props.timePosted}s ago · {props.privacy}</div>
                </div>
            </div>
            <div className="caption">
                {props.caption}
            </div>
            <div>
                <img src={props.photo} className="post-image" alt=""/>
            </div>
            <div className="post-stats">
                <div>{props.likes} likes</div>
                <div>{props.comments} comment</div>
            </div>
            <div className="react-buttons-container">
                {formButtons}
            </div>
            <div className="comment-field">
                <CommentField profilePhoto={user.profilePhoto} text="Write a comment..." style={{fontSize: "14px"}}/>
            </div>
        </div>
    )
}

