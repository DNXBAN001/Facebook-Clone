import StoriesReels from "./StoriesReels";
import StatusForm from "../StatusForm";
import Post from "../Post";
import profilesData from "../../utils/profiles";

export default function Newsfeed(){

    const posts = profilesData.map(profile => (
        profile.posts.map(post => (
            <Post key={post.id}
                profilePhoto={profile.profilePhoto}
                writer={post.writer}
                timePosted={post.timePosted}
                privacy={post.privacy}
                caption={post.caption}
                photo={post.photo}
                likes={post.reactions.likes}
                comments={post.comments.length}
        />
        ))
    ))

    return(
        <div className="news-feed-container">
            <StoriesReels/>
            <StatusForm />
            {posts}
        </div>
    )
}