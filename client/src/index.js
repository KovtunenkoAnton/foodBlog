import React from 'react';
import ReactDOM from 'react-dom';
import Body from './components/Body/Body';
import {PostProvider} from './components/context/postContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3001'

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <Body/>
    </PostProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
