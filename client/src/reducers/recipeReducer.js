export const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'RECIPE_FECTH':
            const x = {
                ...action.payload,
                totalRating: action.payload.ratings.reduce((sum, curr) => { return curr.rating + sum }, 0) / action.payload.ratings.length,
                isRated: action.payload.ratings.find(curr => curr._ownerId === action.payload.currUserId) ? true : false,
            };
            console.log()
            return x;
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            username: action.username,
                        }
                    }]
            }
        case 'ADD_RATING':
            return {
                ...state,
                isRated: true,
                ratings: [
                    ...state.ratings,
                    action.payload,
                ],
                totalRating: state.ratings.reduce((sum, curr) => { return curr.rating + sum }, action.payload.rating) / (state.ratings.length + 1),

            }
        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map(x => x._id === action.payload._id ? {
                    ...x,
                    comment: action.payload.comment,
                    createdDate: action.payload.createdDate
                } : x)
            }
        case 'DELETE_COMMENT':
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)           
            }
        default:
            return state;
    }
}