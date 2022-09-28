/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useContext } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../components/AppContext" /*Imports the Context*/
import LeftNav from "../components/Navbars/LeftNav" /*Imports the LeftNav component*/
import Log from "../components/Log" /*Imports the Log component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Trendings() { /*Runs a Trendings() function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs the useContext() hook to retrieve the user data*/

    /*------------Return*/
    return (
        <div className="profil-page">
            {userData ? ( /*If the Context contains indeed user data...*/
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