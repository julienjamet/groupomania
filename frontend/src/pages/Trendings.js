/*Imports------------------------------------------------------------------------------------------------------------*/
import LeftNav from "../components/Navbars/LeftNav" /*Imports the LeftNav component*/
import Log from "../components/Log" /*Imports the Log component*/
import { useSelector } from "react-redux"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Trendings() { /*Runs a Trendings() function...*/
    /*------------Calls*/
    const userData = useSelector(state => state.clientReducer) /*...that runs the useContext() hook to retrieve the user data*/
    console.log(userData)
    /*------------Return*/
    return (
        <div className="profil-page">
            {userData === null ? ( /*If the Context contains indeed user data...*/
                <>
                    <LeftNav />
                    <h1>TRENDINGS PAGE</h1> {/*...the user is automatically redirected to its authenticated trendings page*/}
                </>
            ) : (
                <div className="log-container">
                    <Log signUp={false} signIn={true} /> {/*Otherwise it is redirected to the Log component to register or log in*/}
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>
            )}
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default Trendings /*Exports the Trendings page to the App component*/
/*-------------------------------------------------------------------------------------------------------------------*/