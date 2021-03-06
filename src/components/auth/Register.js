import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = (evt) => {
        evt.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(regEmail => {
                //Returning array will be zero or will have a present user object matching inputted value
                if (regEmail.length !== 0) {
                    conflictDialog.current.showModal()
                } else {
                    fetch(`http://localhost:8088/users?userName=${user.userName}`)
                        .then(res => res.json())
                        .then(regName => {
                            if (regName.length !== 0) {
                                conflictDialog.current.showModal()
                            } else {
                                fetch("http://localhost:8088/users", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(user)
                                })
                                    .then(res => res.json())
                                    .then(createdUser => {
                                        if (createdUser.hasOwnProperty("id")) {
                                            localStorage.setItem("bearded", createdUser.id)
                                            history.push("/")
                                        }
                                    })
                            }
                        })
                }
            })
    }
/*
    const handleRegister = (evt) => {
        evt.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("bearded", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }
*/
    const updateUser = (evt) => {        
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address or user name already exists</div>
                <button className="button--close" onClick={evt => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={existingUserCheck}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Beard Book</h1>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Used for Login" required />
                </fieldset>                 
                <fieldset>
                    <label htmlFor="userName"> User Name </label>
                    <input onChange={updateUser}
                        type="text" id="userName" className="form-control"
                        placeholder="What would you like your User Name to be" required autoFocus />
                </fieldset>             
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
