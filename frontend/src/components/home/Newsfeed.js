import React from "react";
import StoriesReels from "./StoriesReels";
import StatusForm from "../StatusForm";
import Post from "../Post";
import axios from "axios";
import { useGlobalContext } from "../../context-provider";
import Cookies from "universal-cookie";

export default function Newsfeed(){

    const [posts, setPosts] = React.useState([])
    const accessToken = new Cookies().get("accessToken")

    React.useEffect( () => {
        async function fetchPosts(){
            try{
                const response = await axios.get("http://localhost:5000/posts", {
                    headers: {
                        "Authorization": "Bearer "+ accessToken
                    }
                })
                console.log("About to set posts...")
                setPosts(response.data.data)
                
            }catch(err){
                alert("Error while fetching posts")
            }
        }
        fetchPosts()
    }, [])

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
