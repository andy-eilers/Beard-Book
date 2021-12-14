import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"


export const CommentList = () => {
    const [comments, changeComment] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/comments")
                .then(res => res.json())
                .then((data) => {
                    changeComment(data)
                })
        },
        []
    )

    return (
        <>
            {
                comments.map(
                    (comment) => {
                        return <div key={`comment--${comment.id}`}>
                            <p className={`comment ${comment.postId}`}>
                            </p>
                        </div>
                    }
                )
            }
        </>
    )
}
