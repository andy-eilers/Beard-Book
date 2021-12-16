import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export const CommentForm = () => {
    const [comment, updateComment] = useState({
        postId: "",
        body: "",
        date: ""
    });
    
    const [post, updatePost] = useState([])
    const history = useHistory()
    const {postId} = useParams()

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

    const postComment = (event) => {
        event.preventDefault()

        const newComment = {
            postId: parseInt(postId),
            body: comment.body,
            userId: parseInt(localStorage.getItem("bearded")),
            date: comment.date
        }

    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    }

    return fetch("http://localhost:8088/comments", fetchOption)
        .then(() => {
            history.push("/comments")
        })
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm__title">Post Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Beard Business:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...comment }
                                copy.body= event.target.value
                                updateComment(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Speak Your Peace"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date Commenting:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...comment }
                                copy.date= event.target.value
                                updateComment(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="MM-DD-YYYY"
                        />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={postComment}>
                Submit Comment
            </button>
        </form>
    )
}