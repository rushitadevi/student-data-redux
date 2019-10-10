import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const initialState = {
   loader : false,
   students :[]
  };
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  export default function configureStore() {
    return createStore(
      rootReducer,
      initialState,
     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     composeEnhancers(applyMiddleware(thunk))
    );
  }