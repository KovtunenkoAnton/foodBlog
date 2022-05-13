import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeType } from '../AddRecipeModal/AddRecipeModal';

interface IRecipeContext {
    recipes: RecipeType[];
    addRecipe: (recipe: RecipeType) => void;
}

const recipesContext = React.createContext({} as IRecipeContext);

const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);

    useEffect(() => {
        axios('/').then(res => setRecipes(res.data));
    }, []);

    const addRecipe =((recipe: RecipeType) => {
          axios.post('/', recipe)
          .then(res => {  
              setRecipes(prev => [...prev, res.data])
            })
    });

    return (
        <recipesContext.Provider value={{ recipes, addRecipe }}>
            { children }
        </recipesContext.Provider>
    )
};

const useRecipesContext = () => useContext(recipesContext);
export { useRecipesContext, RecipesProvider };