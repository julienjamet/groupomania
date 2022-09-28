/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useContext } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../AppContext" /*Imports the Context*/
import { NavLink } from "react-router-dom" /*Imports a NavLink component*/
import Logout from "../Log/Logout" /*Imports the Logout component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Navbar() { /*Runs a Navbar function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs itself the useContext() hook to retrieve the user data*/

    /*------------Return*/
    return ( /*The function then returns...*/
        <nav> {/*...a navigation bar...*/}
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/home"> {/*...that in all cases contains a link to the Home page...*/}
                        <div className="logo">
                            <img src="./img/round_logo.png" alt="icon" />
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {userData ? ( /*...and, if the Context contains user data...*/
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink to="/profile"> {/*...that also contains one to the authenticated profile page...*/}
                                <h5>Bienvenue {userData.pseudo} !</h5>
                            </NavLink>
                        </li>
                        <Logout /> {/*...and the Logout component*/}
                    </ul>
                ) : (
                    <div></div>
                )}
            </div>
        </nav>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default Navbar /*Exports the Navbar component to the App component*/
/*-------------------------------------------------------------------------------------------------------------------*/