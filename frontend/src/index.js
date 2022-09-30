/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import React from 'react' /*Imports React*/
import ReactDOM from 'react-dom/client' /*Imports ReactDOM*/
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

/*------------Components*/
import App from './App' /*Imports the App component*/
import rootReducer from "./components/Store/reducers"
import './styles/index.css' /*Imports styles*/
import GetUsers from './components/Store/actions/users.action'
import GetPosts from './components/Store/actions/posts.action'
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Calls*/
const root = ReactDOM.createRoot(document.getElementById('root')) /*Targets the "root" div of the "index.html" file and runs the ReactDOM createRoot() function on it*/
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

/*------------React App*/
store.dispatch(GetUsers())
store.dispatch(GetPosts())

root.render( /*Runs on the "root" div the App component as a React App*/
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
/*-------------------------------------------------------------------------------------------------------------------*/