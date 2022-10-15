/*Imports------------------------------------------------------------------------------------------------------------*/
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { Reset } from "../Store/actions/user.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function LeftNav() { /*Exports to the Home, Trendings and Profile pages a LeftNav component...*/

    const dispatch = useDispatch()

    function resetUserData() {
        dispatch(Reset())
    }

    return ( /*...that returns a navigation menu*/
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/home" className={link => (link.isActive ? "active-left-nav" : null)} onClick={resetUserData}>
                        <img src="./img/icons/home.svg" alt="home-icon" />
                    </NavLink>
                    <br />

                    <NavLink to="/profile" className={link => (link.isActive ? "active-left-nav" : null)} onClick={resetUserData}>
                        <img src="./img/icons/user.svg" alt="user-icon" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/
