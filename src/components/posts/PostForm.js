import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const PostForm = () => {
    const [post, updatePost] = useState({
        title: "",
        description: "",
        image: ""
    });

    const history = useHistory()

    const submitPost = (event) => {
        event.preventDefault()

        const newPost = {
            title: post.title,
            description: post.description,
            userId: parseInt(localStorage.getItem("bearded")),
            image: post.image
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
            <h2 className="postForm__title">Create New Post</h2>
            <fieldsest>
                <div className="form-group">
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
            </fieldsest>
            <fieldsest>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
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
                        placeholder="Describe Your Post"
                        />
                </div>
            </fieldsest>
            <fieldsest>
                <div className="form-group">
                    <label htmlFor="picture">Picture:</label>
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
                        placeholder="Image URL"
                        />
                </div>
            </fieldsest>
            <button className="btn btn-primary" onClick={submitPost}>
                Submit Post
            </button>
        </form>
    )
}