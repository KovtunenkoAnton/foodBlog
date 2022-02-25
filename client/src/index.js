import React from 'react';
import ReactDOM from 'react-dom';
import Body from './components/Body/Body';
import {RecipesProvider} from './components/context/recipesContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3001'

ReactDOM.render(
  <React.StrictMode>
    <RecipesProvider>
      <Body/>
    </RecipesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
