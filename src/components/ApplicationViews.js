import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./users/UserList"
import { PostList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"
import { PosterProfile } from "./posts/PosterProfile"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
                <UserList />
            </Route>

            <Route exact path="/posts">
                <PostList />
            </Route>

            <Route exact path="/posts/:posterProfileId(\d+)">
                <PosterProfile />
            </Route>

            <Route path="/posts/create">
                <PostForm />
            </Route>
        </>
    )
}