import StoriesReels from "./StoriesReels";
import StatusForm from "../StatusForm";
import Post from "../Post";
import profilesData from "../../utils/profiles";

export default function Newsfeed(){

    let unorderedPostsList = [];
    for(let i = 0; i < profilesData.length; i++){
        for(let j = 0; j < profilesData[i].posts.length; j++){
            unorderedPostsList.push(profilesData[i].posts[j]);
        }
    }

    const sortedPostsList = (unsortedLists) => {
        let sortedList = unsortedLists;
        let tempVar = 0;
        for(let i = 0; i < sortedList.length; i++){
            for(let j = 1; j < (sortedList.length-i); j++){
                if(sortedList[j-1].timePosted > sortedList[j].timePosted){
                    tempVar = sortedList[j-1];
                    sortedList[j-1] = sortedList[j];
                    sortedList[j] = tempVar;
                }
            }
        }
        return sortedList;
    }

    const postsList = sortedPostsList(unorderedPostsList).map(post => (
            <Post key={post.id}
                profilePhoto={post.profilePhoto}
                writer={post.writer}
                timePosted={post.timePosted}
                privacy={post.privacy}
                caption={post.caption}
                photo={post.photo}
                likes={post.reactions.likes}
                comments={post.comments.length}
        />
    ))

    return(
        <div className="news-feed-container">
            <StoriesReels/>
            <StatusForm />
            {postsList}
        </div>
    )
}