import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Post = () => {
    const [post, updatePost] = useState({})
    const [ comments, setComments ] = useState([])
    const { postId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    updatePost(data)
                })
        },
        [ postId ]
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/comments")
                .then(res => res.json())
                .then((data) => {
                    setComments(data)
                })
        },
        []
    )

    const assignComment = (changeEvent) => {
        const newPostedComment = {
            "userId": parseInt(localStorage.getItem("bearded")),
            "commentId": parseInt(changeEvent.target.value),
            "title": post.title,
            "description": post.description,
            "image": post.image,
            "comment": post.comment.body 
        }
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newPostedComment)
        })
            .then (() => {
                history.push("/posts")
            })
    }

    return (
        <>
            <section className="post">
                <h3 className="post__title">{post.title}</h3>
                <div className="post__description">{post.description}</div>
            </section>
        </>
        
    )
}