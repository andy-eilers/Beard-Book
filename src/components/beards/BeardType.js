import { useEffect, useState } from "react"

export const BeardTypes = (singleBeardObject) => {
    const [beards, setBeards] = useState([])

    useEffect(
        () => {
            console.log("Beard Type Changed", beards)
        },
        [beards]        
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/beardTypes")
                .then(res => res.json())
                .then((beardTypeArray) => {
                    setBeards(beardTypeArray)
                })
        },
        []        
    )

    return (
        <>
            <div>
                <h2>Beards</h2>
                {
                    beardTypes.map(beardType => {
                        return <button
                            onClick={
                                () => {
                                    const copy = {...singleBeardObject.choices}
                                    copy.beardType = beardType
                                    singleBeardObject.setter(copy)
                                }
                            }
                            key={beardType.id}>{beardType.name}</button>
                    })
                }
            </div>
        </>
    )
}