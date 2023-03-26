import React from 'react'
import { Link } from "react-router-dom"

const Dog = ({image, name, temperament, weightMin, weightMax, id}) => {
return (
    <div>
    <Link to= {`/detail/${id}`}>
        <img src={image} alt={name} width='200px' height='200px'/>
    </Link>
    <h2>{name}</h2>
    <h3>Temperament: {temperament}</h3>
    <h3>Min weight: {weightMin} - Max weight: {weightMax}</h3>
    </div>
)
}

export default Dog;