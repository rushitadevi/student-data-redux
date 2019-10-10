import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './index.css';

//import App from './App';
import * as serviceWorker from './serviceWorker';
import Student from './components/student';
import {Provider} from "react-redux"
import configureStore from "./store"

ReactDOM.render( <Provider store={configureStore()}>
<Student /></Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
