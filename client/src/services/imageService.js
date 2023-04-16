import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/recipeImages';
const request = requestFactory();

export const getAll = async (recipeId) => {
    const searchQuery = encodeURIComponent(`recipeId="${recipeId}"`);
    const url = `${baseUrl}?where=${searchQuery}`;
    const result = await request.get(url);
    const images = Object.values(result);
    return images;
};


export const saveImageToCloudinary = async (image) => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "recipesApp");
    data.append("cloud_name", "drhqukmht");
    const response  = await fetch("https://api.cloudinary.com/v1_1/drhqukmht/image/upload",
        {
            method: "POST",
            body: data,
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        })
        return response.url;
}

export const create = async (recipeId, image) => {
    const result = await request.post(baseUrl, { recipeId, image });
    return result;
};

export const deleteImage = (imageId) => request.delete(`${baseUrl}/${imageId}`);
