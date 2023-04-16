import { Row, Col } from 'react-bootstrap';

import { useState, useEffect } from "react";
import styles from './styles/UserRecipes.module.css'
import { recipeServiceFactory } from '../../services/recipeService';

import { UserRecipesItem } from "./UserRecipesItem";
import * as  ratingServise from "../../services/ratingService";
import * as  imageService from "../../services/imageService";
import { useAuthContex } from "../../contexts/AuthContext";

export const UserRecipes = () => {

    const recipeService = recipeServiceFactory();
    const {userId} = useAuthContex(); 
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        recipeService.getAllUserRecipes(userId)
            .then(async (data) => {
                const allRecipes = [];
                Promise.all(Object.values(data).map(async (recipe) => {
                    await Promise.all(
                        [
                            imageService.getAll(recipe._id),
                            ratingServise.getAll(recipe._id),
                        ])
                        .then(([images, ratings]) => {
                            const recipeState = {
                                ...recipe,
                                imageUrl: images.length > 0 ? images[0].image : '',
                                totalRating: ratings.length > 0 ? ratings.reduce((sum, curr) => {
                                    return curr.rating + sum
                                }, 0) / ratings.length : 0,
                                ratingCount: ratings.length > 0 ? ratings.length : 0,
                            };
                            allRecipes.push(recipeState);
                        })
                }))
                    .then(() => {
                        setRecipes(Object.values(allRecipes));
                    });
            });
    }, [userId]);


    return (<div className={styles.row}>

        <div className={styles.column}>
            <Row xs={12} md={3} className="g-4" >
                {recipes.map((recipe, k) => (
                    <Col key={recipe._id}>
                        <UserRecipesItem  {...recipe} />
                    </Col>))}
                {recipes.length === 0 && (
                    <div style={{textAlign: "center"}}>Няма  рецепти.</div>
                )}
            </Row>
        </div>
    </div>
    )
}
