import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const CommentForm = () => {
    const [comment, updateComment] = useState({
        postId: "",
        body: "",
        userId: "",
        date: "",
    })

    const history = useHistory()

    const postComment = (event) => {
        event.preventDefault()

        const newComment = {
            postId: comment.postId,
            body: comment.body,
            userId: comment.userId,
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
                                copy.name = event.target.value
                                updateComment(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Employee"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Employee Specialty:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...comment }
                                copy.specialty = event.target.value
                                updateComment(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Specialty"
                        />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={postComment}>
                Submit Comment
            </button>
        </form>
    )
}