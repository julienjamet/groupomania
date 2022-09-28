/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import React from 'react' /*Imports React*/
import ReactDOM from 'react-dom/client' /*Imports ReactDOM*/

/*------------Components*/
import App from './App' /*Imports the App component*/
import './styles/index.css' /*Imports styles*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Calls*/
const root = ReactDOM.createRoot(document.getElementById('root')) /*Targets the "root" div of the "index.html" file and runs the ReactDOM createRoot() function on it*/

/*------------React App*/
root.render( /*Runs on the "root" div the App component as a React App*/
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
/*-------------------------------------------------------------------------------------------------------------------*/