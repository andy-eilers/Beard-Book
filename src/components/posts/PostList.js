import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"

export const PostList = () => {
    const [posts, updatePosts] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/posts?_expand=user&_embed=comments")
                .then(res => res.json())
                .then((data) => {
                    updatePosts(data)
                })
        },
        []
    )

    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            fetch("http://localhost:8088/posts?_expand=user&_embed=comments")
            .then(res => res.json())
            .then((data) => {
                updatePosts(data)
            })
            .then(() => {
                history.push("/posts")
            }) 
        })
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/posts/create")}>Create Post</button>
            </div>
            {
                posts.map(
                    (post) => {
                        return <div key={`post--${post.id}`}>
                            <div>{post.title}</div>
                            <div>{post.description} posted by <Link to={`/profile/${post.id}`}>{post.user.userName}</Link> on {post.date}</div>
                            <div>{`post ${post.like ? 'like' : 'post'}`}</div>
                            <div>{post.comments.map(
                                (comment) => {
                                    return <div key={`comment--${comment.id}`}>{comment.body} from on {comment.date}</div>
                                })}
                            </div>
                            <div>
                                <button onClick={() => history.push(`/posts/${post.id}`)}>Comment on Post</button>
                            </div>
                            <div>
                                {post.user?.id === parseInt(localStorage.getItem("bearded"))
                                ?
                                <button onClick={() => {
                                    deletePost(post.id)
                                }}>Delete</button>
                                : ""}
                            </div>
                        </div>
                    }
                ).reverse()
            }
        </>
    )
}