import { useNavigate } from "react-router-dom";
import { recipeServiceFactory } from '../services/recipeService';
import { useContext } from "react";
import { useEffect, useState, createContext } from "react"
import * as  imageService from "../services/imageService";
import * as  ratingServise from "../services/ratingService";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const recipeService = recipeServiceFactory();

    useEffect(() => {
        getData();
        navigate('/catalog');
    }, []);

    const getData = (async () => {

        recipeService.getAll()
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
    });


    const onRecipeCreateSubmit = async (values) => {
        const imgUrls = [];
        await recipeService.create(values)
            .then(async (data) => {
                const images = Array.from(values.images);
                await Promise.all(images?.map(async (file) => {
                    await imageService.saveImageToCloudinary(file)
                        .then(async (imageUrl) => {
                            imgUrls.push(imageUrl);
                            if (data._id) {
                                await imageService.create(data._id, imageUrl);
                            }
                        })
                })
                )
                    .then(() => {
                        const newRecipe = {
                            ...data,
                            imageUrl: imgUrls[0],
                            totalRating: 0,
                            ratingCount: 0,
                        };
                        setRecipes(state => [...state, newRecipe]);
                    })

                navigate('/catalog');
            });
    }

    const onFilterSubmit = (values) => {
        let result = recipes;
        if (values.category !== '') {
            result = result.filter(recipe => recipe.category === values.category);
        }

        if (values.isGlutenFree) {
            result = result.filter(recipe => recipe.isGlutenFree === values.isGlutenFree);
        }

        if (values.isVegan) {
            result = result.filter(recipe => recipe.isVegan === values.isVegan);
        }

        if (values.isDairyFree) {
            result = result.filter(recipe => recipe.isDairyFree === values.isDairyFree);
        }

        if (values.isVegeterian) {
            result = result.filter(recipe => recipe.isVegeterian === values.isVegeterian);
        }

        if (values.search?.length > 0){
         result = result.filter(recipe => recipe.title.includes(values.search)
        || recipe.products.includes(values.search) || recipe.directions.includes(values.search));
        }
        setRecipes(result);
    }

    const onFilterReset = () => {
        getData();
    }

    const onRecipeEditSubmit = () => {
    }

    const onSearchSubmit = async (values) => {
        if (recipes.length === 0) {
            await getData()
                .then((data) => {
                   const result = recipes.filter(recipe => recipe.title.includes(values.search)
                        || recipe.products.includes(values.search) || recipe.directions.includes(values.search));
                    setRecipes(result);
                });
        }
        else {

            const result = recipes.filter(recipe => recipe.title.includes(values.search)
                || recipe.products.includes(values.search) || recipe.directions.includes(values.search));

            setRecipes(result);
        }
    }

    const contextValues = {
        recipes,
        onRecipeCreateSubmit,
        onRecipeEditSubmit,
        onFilterSubmit,
        onFilterReset,
        onSearchSubmit,
    }

    return (
        <RecipeContext.Provider value={contextValues}>
            {children}
        </RecipeContext.Provider>
    );
}

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    return context;
}