import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [ beardTypes, setBeardType ] = useState([])
    const history = useHistory()  // State variable for current ticket object
// Variable storing the route parameter

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("bearded"))}`)
                .then(res => res.json())
                .then((data) => {
                    setUserProfile(data)
                })
        },
        []  // Above function runs when the value of posterProfileId change
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/beardTypes")
                .then(res => res.json())
                .then((data) => {
                    setBeardType(data)                    
                })
        },
        []
    )

    return (
        <>
            <div>
                <button onClick={() => history.push("/users/edit")}>Edit Profile</button>
            </div>
            <section className="userProfileId">
                <h3 className="userProfile__userName">User Name: {userProfile.userName}</h3>
                <div className="userProfile__name">Name: {userProfile.name}</div>
                <div className="userProfile__email">Email: {userProfile.email}</div>
                <div className="userProfile__city">City: {userProfile.city}</div>
                <div className="userProfile__beardTypes">Beard Type: {beardTypes.filter(beardType => beardType.id === userProfile.beardTypeId)[0]?.name}</div>                
            </section>
        </>
    )
}