import React from "react"
import { Route } from "react-router-dom"
import { UserList } from "./users/UserList"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
                <UserList />
            </Route>
        </>
    )
}