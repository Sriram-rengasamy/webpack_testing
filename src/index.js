import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import App from './components/app/app';

import './index.scss';


// not sure why this check required? 
const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<Root>
    <App />
</Root>
, wrapper) : false;

//ReactDOM.render(<App />, document.getElementById(container));


