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

export const getOne = async (commentId) => {
    const url = `${baseUrl}/${commentId}`;
    const result = await request.get(url);
    return result;
}

export const create = async(recipeId, comment, createdDate) =>{
    const result = await request.post(baseUrl,{recipeId, comment,createdDate});
    return result;
};

export const edit = async(recipeId, commentId, comment, createdDate) =>  {
   const result = await request.put(`${baseUrl}/${commentId}`, {recipeId, comment, createdDate});
   return result;
}

export const deleteComment = (commentId) => request.delete(`${baseUrl}/${commentId}`);

