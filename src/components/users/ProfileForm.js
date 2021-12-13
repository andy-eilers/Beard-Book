import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const ProfileForm = () => {
    const [profile, updateProfile] = useState({
        name: "",
        email:"",
        city: "",
        beardTypeId: "", 
        image: ""
    });
    const [ beardTypes, setBeardTypes ] = useState([])
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

    const editProfile = (changeEvent) => {

        const newProfile = {
            "name": profile.name,
            "email": profile.email,
            "city": profile.city,
            "beardType": parseInt(changeEvent.target.value), 
            "image": profile.image
        }

        return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("bearded"))}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        })

            .then(() => {
                history.push("/users")
            })
    }

    return (
        <form className="profileForm">
            <h2 className="postForm__title">Edit Your Profile</h2>
            <fieldsest>
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
            </fieldsest>
            <fieldsest>
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
            </fieldsest>
            <fieldsest>
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
            </fieldsest>
            <fieldsest>
                <div className="form-group">
                    <label htmlFor="beardType">Beard Type:</label>
                    <select id="beardType" onChange={ updateProfile }>
                        {
                            beardTypes.map(
                                (beardType) => {
                                    return<option value={beardType.id} key={`beardType--${beardType.id}`}>
                                        { beardType.name }
                                    </option>
                                }
                            )
                        }
                    </select>
                    <input/>
                </div>
            </fieldsest>
            <fieldsest>
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
            </fieldsest>
            <button className="btn btn-primary" onClick={editProfile}>
                Edit Profile
            </button>
        </form>
    )
}