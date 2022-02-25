import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const recipesContext = React.createContext();

const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios('/')
        .then(res => setRecipes(res.data))
    }, []);

    const addRecipe =((recipe) =>
          axios.post('/', {recipe})
          .then(res => setRecipes(prev => [...prev, res.data]))
        )

    return (
        <recipesContext.Provider value={{ recipes, addRecipe }}>
            { children }
        </recipesContext.Provider>
    )
}

const useRecipesContext = () => useContext(recipesContext);
export { useRecipesContext, RecipesProvider };