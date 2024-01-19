import React from "react";
import StoriesReels from "./StoriesReels";
import StatusForm from "../StatusForm";
import Post from "../Post";
// import profilesData from "../../utils/profiles";
import axios from "axios";

export default function Newsfeed(){

    const [posts, setPosts] = React.useState([])
    // const [reactions, setReactions] = React.useState(0)

    React.useEffect( () => {
        // axios.get("http://localhost:5000/api/posts")
        //     .then(res => {
        //         setPosts(res.data.data)
        //     })
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/posts")
            const postsData = response.data.data
            setPosts(postsData)
        }
        fetchData()
    }, [])
    
    // function handleReactions(id){
    //     setReactions(prevReactions => {
    //         if
    //     })
    // }

    const postsList = posts.map(post => (
            <Post key={post._id}
                id={post._id}
                profilePhoto={post.postOwnerProfilePhoto}
                writer={post.postOwner}
                timePosted={post.timePosted}
                privacy={post.privacy}
                caption={post.caption}
                photo={post.files}
                likes={post.reactions}
                comments={post.comments}
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
