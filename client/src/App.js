import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { Catalog } from './components/Catalog/Catalog';
import { CatalogItem } from './components/Catalog/CatalogItem';
import { CreateRecipe } from './components/CreateRecipe/CreateRecipe';
import { RecipeDetails } from './components/RecipeDetails/RecipeDetails';
import { EditRecipe } from './components/EditRecipe/EditRecipe';
import { RouteGuard } from './components/Common/RouteGard';

import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { UserRecipes } from './components/UserRecipes/UserRecipes';

function App() {
    return (
        <AuthProvider>
            <RecipeProvider>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route element={<RouteGuard />}>
                        </Route>
                        <Route path="/catalog-Item" element={<CatalogItem />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/catalog" element={<Catalog />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path="/my-recipes/:userId/*" element={<UserRecipes />}></Route>
                        <Route path="/recipe-details/:recipeId/*" element={<RecipeDetails />}></Route>
                        <Route element={<RouteGuard />}>
                            <Route path="/create-recipe" element={<CreateRecipe />} ></Route>
                            <Route path="/recipeDetails/:recipeId/edit" element={<EditRecipe />}></Route>
                        </Route>

                    </Routes>
                </div>
            </RecipeProvider>
        </AuthProvider >
    );

}

export default App;