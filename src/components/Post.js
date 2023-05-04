import { CommentOutlined, ThumbUpSharp } from "@mui/icons-material";
import profileData from "../utils/profiles";

export default function Post(){

    let listOfPosts = profileData.map(posts => (
        posts.posts.map(post => (
            <div className="post-container" key={post.id}>
                    <div className="post-info-container">
                        <div className="acc-icon">
                            <img src={posts.profilePhoto} width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                        </div>
                        <div className="post-info">
                            <p className="post-owner">{post.writer}</p>
                            <p className="timePosted-and-privacy">{post.timePosted} . {post.privacy}</p>
                        </div>
                    </div>
                    <div className="post-content">
                        <p className="caption">{post.caption}</p>
                        <img src={post.photo} alt="" className="photo"/>
                    </div>
                    <div>
                        <div className="reactions-container">
                            <div className="reactions">
                                <p><img src="./images/heart-icon.png" alt=""/> {post.reactions.likes}</p>
                            </div>
                            <div className="comments">
                                <p>{post.comments.length} comments</p>
                            </div>
                        </div>
                        <div className="reaction-buttons">
                            <div className="reaction-button">
                                <ThumbUpSharp />
                                <p className="reaction-label">Like</p>
                            </div>
                            <div className="reaction-button">
                                <img src="./images/comment-icon0.png" width="24" height="24" alt=""/>
                                <p className="reaction-label">Comment</p>
                            </div>
                            <div className="reaction-button">
                                <img src="./images/share-icon.png" width="24" height="24" alt="" />
                                <p className="reaction-label">Share</p>
                            </div>
                        </div>
                        <div className="inline-row comment-post"> 
                            <div className="acc-circle-container">
                                <img src="./images/bandile-profile.jpg" width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                            </div>
                            <div className="status-field type-comment">
                                <input type="text" placeholder="Write a comment..." />
                            </div>
                        </div>
                    </div>
                </div>
        ))
    ))

    return(
        <>
            {listOfPosts}
        </>
    )
}