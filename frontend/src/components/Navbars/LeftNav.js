/*Imports------------------------------------------------------------------------------------------------------------*/
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Reset } from "../Store/actions/user.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function LeftNav() { /*Exports to the Home, Trendings and Profile pages a LeftNav component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the cliend data from the Store...*/
    const dispatch = useDispatch()

    /*------------Middleware*/
    function resetUserData() { /*...then runs a middleware...*/
        dispatch(Reset()) /*...running itself a Reset action*/
    }

    return ( /*The LeftNav component returns a navigation menu*/
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/home" className={link => (link.isActive ? "active-left-nav" : null)} onClick={resetUserData}>
                        <img src="./img/icons/home.svg" alt="home-icon" />
                    </NavLink>
                    <br />

                    {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && (
                        <NavLink to="/profile" className={link => (link.isActive ? "active-left-nav" : null)} onClick={resetUserData}>
                            <img src="./img/icons/user.svg" alt="user-icon" />
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/
