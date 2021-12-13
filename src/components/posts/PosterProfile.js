import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const PosterProfile = () => {
    const [posterProfile, assignPosterProfile] = useState({})  // State variable for current ticket object
    const { posterProfileId } = useParams()  // Variable storing the route parameter
    const [ beardTypes, setBeardType ] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${posterProfileId}?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    assignPosterProfile(data)
                })
        },
        [ posterProfileId ]  // Above function runs when the value of posterProfileId change
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
            <section className="posterProfile">
                <h3 className="posterProfile__userName">User Name: {posterProfile.user?.userName}</h3>
                <div className="posterProfile__name">Name: {posterProfile.user?.name}</div>
                <div className="posterProfile__city">City: {posterProfile.user?.city}</div>
                <div className="posterProfile__beardTypes">Beard Type: {beardTypes.filter(beardType => beardType.id === posterProfile.user?.beardTypeId)[0]?.name}</div>                
            </section>
        </>
    )
}