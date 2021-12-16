import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const ProfileForm = () => {
    const [profile, updateProfile] = useState({
        name: "",
        userName: "",
        email: "",
        city: "",
        beardTypeId: 0,
        image: ""
    });
    const [beardTypes, setBeardTypes] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("bearded"))}`)
                .then(res => res.json())
                .then((data) => {
                    updateProfile(data)
                })
        },
        []
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/beardTypes")
                .then(res => res.json())
                .then((data) => {
                    setBeardTypes(data)
                })
        },
        []
    )

    const editUserProfile = () => {
        const newUserProfile = {
            name: profile.name,
            userName:profile.userName,
            email: profile.email,
            city: profile.city,
            beardTypeId: parseInt(profile.beardTypeId)
        }

        return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("bearded"))}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserProfile)
        })
            .then(() => {
                history.push("/users")
            })
    }

    return (
        <form className="profileForm">
            <h2 className="postForm__title">Edit Your Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.name = event.target.value
                                updateProfile(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userName">User Name:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.userName = event.target.value
                                updateProfile(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="User Name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.email = event.target.value
                                updateProfile(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email: Used for Login"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.city = event.target.value
                                updateProfile(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="City"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="beardType">Beard Type:</label>
                    <select id="beardType" onChange={
                        (event) => {
                            const copy = { ...profile }
                            copy.beardTypeId = event.target.value
                            updateProfile(copy)
                        }
                    }>
                        {
                            beardTypes.map(
                                (beardType) => {
                                    return <option value={beardType.id} key={`beardType--${beardType.id}`}>
                                        {beardType.name}
                                    </option>
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...profile }
                                copy.image = event.target.value
                                updateProfile(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Image URL"
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={editUserProfile}>
                Edit Profile
            </button>
        </form>
    )
}