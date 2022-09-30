/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useContext } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../components/AppContext" /*Imports the Context*/
import LeftNav from "../components/Navbars/LeftNav" /*Imports the LeftNav component*/
import Log from "../components/Log" /*Imports the Log component*/
import Thread from "../components/Thread"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Home() { /*Runs a Home() function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs itself the useContext() hook to retrieve the user data*/

    /*------------Return*/
    return (
        <div className="profil-page">
            {userData ? ( /*If the Context contains indeed user data...*/
                <>
                    <LeftNav />
                    <div className="main">
                        <Thread />
                    </div> {/*...the user is automatically redirected to its authenticated home page*/}
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
export default Home /*Exports the Home page to the App component*/
/*-------------------------------------------------------------------------------------------------------------------*/