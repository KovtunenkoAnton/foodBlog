import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeType } from '../AddRecipeModal/AddRecipeModal';

interface IRecipeContext {
    recipes: RecipeType[];
    addRecipe: (recipe: RecipeType, imagesList: FileList) => void;
}

const recipesContext = React.createContext({} as IRecipeContext);

const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);

    useEffect(() => {axios('/').then(res => setRecipes(res.data))}, []);

    const addRecipe = (async(recipe: RecipeType, imagesList: FileList) => {
        const formData = new FormData();

        formData.append('text', JSON.stringify(recipe));
        Array.prototype.forEach.call(imagesList, (el) => formData.append('images', el));

        await axios.post('/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => setRecipes(prev => [...prev, res.data]));
    })

    return (
        <recipesContext.Provider value={{ recipes, addRecipe }}>
            { children }
        </recipesContext.Provider>
    )
}

const useRecipesContext = () => useContext(recipesContext);
export { useRecipesContext, RecipesProvider };