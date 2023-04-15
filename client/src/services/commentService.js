//import  * as request from './requester';
import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/recipeComments';
const request = requestFactory();

export const getAll = async(recipeId) =>{
    const searchQuery = encodeURIComponent(`recipeId="${recipeId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);
   
    return comments;
};

export const create = async(recipeId, comment, createdDate) =>{
    const result = await request.post(baseUrl,{recipeId, comment,createdDate});
    return result;
};

export const edit = (commentId, comment) =>  request.put(`${baseUrl}/${commentId}`, comment);
