import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Details(props){
console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myDog = useSelector ((state)=> state.detail)

    return(
        <div>
            {
               myDog.length>0 ?
               <div> 
                   <h1>Name:{myDog[0].name}</h1>
                   <img src ={myDog[0].image} alt="" width="500px" height="700px"/>
                   <h3>Temperaments:
                       {!myDog[0].createdInDb ? 
                       myDog[0].temperaments + ' ' 
                       : myDog[0].temperaments.map(el=> el.name + (' '))}</h3>
                   <h3>Weight:{myDog[0].weight}</h3>
                   <h3>Height:{myDog[0].height}</h3>

               </div> : <p>Loading...</p>
            }
            <Link to = '/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}