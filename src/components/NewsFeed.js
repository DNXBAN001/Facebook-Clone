import StatusForm from "./StatusForm";
import StoriesReels from "./StoriesReels";
import Post from "./Post";

export default function NewsFeed(){

    return(
        <div className="news-feed-container">
            <StoriesReels />
            <StatusForm />
            <Post />
        </div>
    )

}