import React, { useEffect, useState } from "react"

export const UserList = () => {
    const [users, setUsers] = useState([])

    const [totalUserMessage, updateMessage] = useState("")

    useEffect(
        () => {
            console.log("Initial useEffect")
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        []
    )

    useEffect(
        () => {
            console.log("User state changed")

            if (users.length === 1) {
                updateMessage("There is one Beard Book user")
            }

            else {
                updateMessage(`There are ${users.length} Beard Book users`)
            }
        },
        [users]
    )

    return (
        <>
            <div>{totalUserMessage}</div>
        </>
    )
}