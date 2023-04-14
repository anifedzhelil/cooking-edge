import { requestFactory } from './requester';
const baseUrl = `http://localhost:3030/data/recipes`;


export const recipeServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const recipes = Object.values(result);
        return recipes;
    };

    const getAllUserRecipes = async (userId) => {
        const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
        const url = `${baseUrl}?where=${searchQuery}`;
        const result = await request.get(url);
        const recipes = Object.values(result);
        return recipes;
    };

    const getOne = async (recipeId) => {
        const url = `${baseUrl}/${recipeId}`;
        const result = await request.get(url);
        return result;
    }

    const create = async (recipeData) => {
        return await request.post(baseUrl, recipeData);
    }

    return {
        create,
        getAll,
        getOne,
        getAllUserRecipes,
    }
}