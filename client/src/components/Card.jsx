import React from "react";
import './Card.css';
import { Link } from "react-router-dom";

export default function Card ({name, image, temperaments, id}) {
    return (
        <Link to={"/details/" + id}>
        <div>
            <img src={image} alt = "img not found" width= "200px" height="250px" />
            <h3 className="dogName" > {name}</h3>
            <h5 className="temperaments">{temperaments}</h5>
        </div>
        </Link>
    );
}