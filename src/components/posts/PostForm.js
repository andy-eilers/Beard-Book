import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const PostForm = () => {
    const [post, updatePost] = useState({
        title: "",
        description: "",
        imageURL: "",
        liked: false,
        date: ""
    });

    const history = useHistory()

    const submitPost = (event) => {
        event.preventDefault()

        const newPost = {
            title: post.title,
            description: post.description,
            userId: parseInt(localStorage.getItem("bearded")),
            date: post.date,
            liked: post.liked,
            imageURL: post.imageURL
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }

        return fetch("http://localhost:8088/posts", fetchOption)
            .then(() => {
                history.push("/posts")
            })
    }

    return (
        <form className="postForm">
            <h2 className="post__title">Create New Post</h2>
            <fieldset>
                <div className="post__title">
                    <label htmlFor="title">Title:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.title = event.target.value
                                updatePost(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Title of Your Post"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="post__description">
                    <label htmlFor="description">Description:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.description = event.target.value
                                updatePost(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Describe Your Post"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Submitted Date:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.date = event.target.value
                                updatePost(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="MM-DD-YYYY"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="beardPhoto">
                    <label htmlFor="url">Image:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.imageURL = event.target.value
                                updatePost(copy)
                            }
                        }
                        required autoFocus
                        type="url"
                        className="form-control"
                        placeholder="Image URL"
                        />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitPost}>
                Submit Post
            </button>
        </form>
    )
}