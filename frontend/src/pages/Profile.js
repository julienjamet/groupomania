/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useContext } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../components/AppContext" /*Imports the Context*/
import Log from "../components/Log" /*Imports the Log component*/
import UpdateProfile from "../components/Profile/UpdateProfile" /*Imports the UpdateProfile component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Profile() { /*Runs a Profile() function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs the useContext() hook to retrieve the user data*/

    /*------------Return*/
    return (
        <div className="profil-page">
            {userData ? ( /*If the Context contains indeed user data...*/
                <UpdateProfile /> /*...the user is automatically redirected to its authenticated profile page*/
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
export default Profile /*Exports the Profile page to the App component*/
/*-------------------------------------------------------------------------------------------------------------------*/