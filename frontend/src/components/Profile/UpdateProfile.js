/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useContext } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../AppContext" /*Imports the Context*/
import LeftNav from "../Navbars/LeftNav" /*Imports the LeftNav component*/
import UploadImg from "./UploadImg" /*Imports the UploadImg component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function UpdateProfile() { /*Runs an UpdateProfile() function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs itself the useContext() hook to retrieve the user data*/

    /*------------Return*/
    return ( /*The function then returns...*/
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1> {/*...some authenticated data...*/}
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg /> {/*...and the UploadImg component*/}
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default UpdateProfile /*Exports the UpdateProfile component to the Profile component*/
/*-------------------------------------------------------------------------------------------------------------------*/