import { CommentOutlined, ShareOutlined, ThumbUpSharp } from "@mui/icons-material";
import profileData from "../utils/profiles";

export default function Post(){

    const posts = profileData.map(post => {
        return(
                <div className="post-container" key={post.posts.id}>
                    <div className="post-info-container">
                        <div className="acc-icon">
                            <img src={post.profilePhoto} width="35" height="35" className="icon" style={{borderRadius: "20px"}} alt=""/>
                        </div>
                        <div className="post-info">
                            <p className="post-owner">{post.posts[0].writer}</p>
                            <p className="timePosted-and-privacy">{post.posts[0].timePosted} . {post.posts[0].privacy}</p>
                        </div>
                    </div>
                    <div className="post-content">
                        <p className="caption">{post.posts[0].caption}</p>
                        <img src={post.posts[0].photo} alt="" className="photo"/>
                    </div>
                    <div>
                        <div className="reactions-container">
                            <div className="reactions">
                                <p><img src="./images/heart-icon.png" alt=""/> {post.posts[0].reactions.likes}</p>
                            </div>
                            <div className="comments">
                                <p>{post.posts[0].comments.length} comments</p>
                            </div>
                        </div>
                        <div className="reaction-buttons">
                            <div className="reaction-button">
                                <ThumbUpSharp />
                                <p className="reaction-label">Like</p>
                            </div>
                            <div className="reaction-button">
                                <CommentOutlined />
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
        )
    })

    return(
        <>
            {posts}
        </>
    )
}