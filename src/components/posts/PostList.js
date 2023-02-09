import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import "./posts.css"

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
            <center><div className="beardBook">Beard Book</div></center>
            <center><div>
                <button onClick={() => history.push("/posts/create")}>Create Post</button>
            </div></center>
            {
                posts.map(
                    (post) => {
                        return <center><div key={`post--${post.id}`}>
                            <div className="postTitle"> {post.title}</div>
                            <img className="beardPhoto" src={post.imageURL} />
                            <div className="postDescription">{post.description} posted by <Link to={`/profile/${post.id}`}>{post.user.userName}</Link> on {post.date}</div>

                            <div>{post.comments.map(
                                (comment) => {
                                
                                })}
                            </div>
                            <div className="button">
                                <button onClick={() => history.push(`/posts/${post.id}`)}>Comment on Post</button>
                            </div>
                            <div className="button">
                                {post.user?.id === parseInt(localStorage.getItem("bearded"))
                                ?
                                <button onClick={() => {
                                    deletePost(post.id)
                                }}>Delete</button>
                                : ""}
                            </div>
                        </div></center>
                    }
                ).reverse()
            }
        </>
    )
}