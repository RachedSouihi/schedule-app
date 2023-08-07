import React from 'react';
import ReactDOM from 'react-dom/client';
import {nanoid} from 'nanoid'
import App from './App.js'
//console.log(app)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App key={nanoid()} />)
