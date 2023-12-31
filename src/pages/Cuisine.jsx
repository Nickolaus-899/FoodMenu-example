import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";
import {Card, Grid} from "./style"

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();


    const getCuisine = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
        );
        const recipes = await data.json();

        setCuisine(recipes.results);
    };


    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]);

    return (
        <Grid
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            {cuisine.map((item) => {
                return(
                    <Link to={'/recipe/' + item.id}>
                        <Card key={item.id}>
                            <img src={item.image} alt={item.alt}/>
                            <h4>{item.title}</h4>
                        </Card>
                    </Link>
                )
            })}
        </Grid>
    )
}


export default Cuisine;
