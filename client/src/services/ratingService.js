//import  * as request from './requester';
import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/recipeRatings';
const request = requestFactory();

export const getAll = async(recipeId) =>{
    const searchQuery = encodeURIComponent(`recipeId="${recipeId}"`);
   // const relationQuery = encodeURIComponent(`author=_ownerId:users`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}`);
    const comments = Object.values(result);
    return comments;
};

export const create = async(recipeId, rating) =>{
    const result = await request.post(baseUrl,{recipeId, rating});
    return result;
};
