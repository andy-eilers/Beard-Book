import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./users/UserList"
import { PostList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
                <UserList />
            </Route>

            <Route exact path="/posts">
                <PostList />
            </Route>

            <Route path="/posts/create">
                <PostForm />
            </Route>
        </>
    )
}