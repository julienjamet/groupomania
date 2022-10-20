/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import ReactDOM from 'react-dom/client'
import React from 'react'

/*------------Reducers & Actions*/
import rootReducer from "./components/Store/reducers/root.reducer"
import GetUsers from './components/Store/actions/users.action'
import GetPosts, { GetAllPosts } from './components/Store/actions/posts.action'

/*------------Components & Styles*/
import { Provider } from "react-redux"
import App from './App'
import './styles/index.css'
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Redux Store*/
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) /*Creates a Redux Store*/

store.dispatch(GetUsers()) /*Runs a Get (All users) action*/
store.dispatch(GetPosts()) /*Runs a Get (Posts) action*/
store.dispatch(GetAllPosts()) /*Runs a Get (All posts) action*/

/*------------React App*/
const root = ReactDOM.createRoot(document.getElementById('root')) /*Creates a React Root*/

root.render( /*Runs on the Root...*/
  <React.StrictMode> {/*...a React App...*/}
    <Provider store={store}> {/*...that uses the Store at its highest level...*/}
      <App /> {/*...and runs the App component*/}
    </Provider>
  </React.StrictMode>
)
/*-------------------------------------------------------------------------------------------------------------------*/