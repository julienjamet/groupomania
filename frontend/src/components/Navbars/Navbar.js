/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useDispatch, useSelector } from "react-redux"

/*------------Components*/
import { NavLink } from "react-router-dom"
import Logout from "../Log/Logout"
import { Reset } from "../Store/actions/user.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Navbar() { /*Exports to the App a Navbar component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/
    const dispatch = useDispatch()

    /*------------Middleware*/
    function resetUserData() { /*...then runs a middleware...*/
        dispatch(Reset()) /*...running itself a Reset action*/
    }

    return ( /*The Navbar component returns...*/
        <nav> {/*...a navigation menu...*/}
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/home" onClick={resetUserData}> {/*...that contains a link to the Home page running the middleware when clicked...*/}
                        <div className="logo">
                            <img src="./img/round_logo.png" alt="icon" />
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {clientData._id ? ( /*...and, if there is client data...*/
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink to="/profile" onClick={resetUserData}> {/*...that also contains one to the Profile page running the middleware when clicked...*/}
                                <h5>Bienvenue {clientData.pseudo} !</h5>
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