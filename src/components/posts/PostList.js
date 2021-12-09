import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"

export const PostList = () => {
    const [posts, updatePosts] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/posts?_expand=user")
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
                        return <div key={`post--${post.id}`}><div>{post.title}</div> <div>{post.description} posted by <Link to={`/posts/${post.id}`}>{post.user.userName}</Link></div></div>
                    }
                )
            }
        </>
    )
}