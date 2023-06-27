import React from 'react'
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Card, Grid} from "./style"

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const recipes = await data.json();

        console.log(recipes);
        setSearchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);
    return (
        <Grid>
            {searchedRecipes?.map((item) => {
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

export default Searched
