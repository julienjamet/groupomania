/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------React & Redux modules*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { Provider } from "react-redux"

/*------------Actions & Reducers*/
import GetUsers from './components/Store/actions/users.action'
import GetPosts from './components/Store/actions/posts.action'
import rootReducer from "./components/Store/reducers/root.reducer"

/*------------Components*/
import App from './App'
import './styles/index.css'
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Redux Store*/
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) /*Creates a Redux Store*/

store.dispatch(GetUsers()) /*Runs a Users action*/
store.dispatch(GetPosts()) /*Runs a Posts action*/

/*------------React App*/
const root = ReactDOM.createRoot(document.getElementById('root')) /*Creates a React Root*/

root.render( /*Runs on the React Root a React App...*/

  <React.StrictMode>
    <Provider store={store}> {/*...that uses the Store at its highest level...*/}
      <App /> {/*...and runs the App component*/}
    </Provider>
  </React.StrictMode>

)
/*-------------------------------------------------------------------------------------------------------------------*/