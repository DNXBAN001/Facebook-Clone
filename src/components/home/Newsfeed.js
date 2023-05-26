import StoriesReels from "./StoriesReels";
import StatusForm from "../StatusForm";
import Post from "../Post";

export default function Newsfeed(){

    return(
        <div className="news-feed-container">
            <StoriesReels/>
            <StatusForm />
            <Post />
        </div>
    )
}