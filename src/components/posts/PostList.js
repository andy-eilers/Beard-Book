import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const PostList = () => {
    const [posts, updatePosts] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/posts")
                .then(res => res.json())
                .then((data) => {
                    updatePosts(data)
                })
        },
        []        
    )

    return (
        <>
            <div>
                <button onClick={() => history.push("/posts/create")}>Create Post</button>
            </div>
            {
                posts.map(
                    (post) => {
                        return <p key={`post--${post.id}`}>{post.title}</p>
                    }
                )
            }
        </>
    )
}