import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"
import { PosterProfile } from "./posts/PosterProfile"
import { ProfileForm } from "./users/ProfileForm"
import { UserProfile } from "./users/UserProfile"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/users">
                <UserProfile />
            </Route>

            <Route exact path="/users/edit">
                <ProfileForm />
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