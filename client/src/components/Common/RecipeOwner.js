import { useParams, Outlet, Navigate } from 'react-router-dom';

import { useRecipeContext } from "../../contexts/RecipeContext";
import { useAuthContex } from '../../contexts/AuthContext';

export const RecipeOwner = ({
    children,
}) => {
    debugger;
    const { recipeId } = useParams();
    const { getRecipe } = useRecipeContext();
    const { userId } = useAuthContex();

    const currentRecipe = getRecipe(recipeId);

    if (currentRecipe && currentRecipe._ownerId !== userId) {
        return <Navigate to={`/catalog/${recipeId}`} replace />
    }

    return children ? children : <Outlet />
};