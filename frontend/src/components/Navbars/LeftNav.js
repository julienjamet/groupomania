/*Imports------------------------------------------------------------------------------------------------------------*/
import { NavLink } from "react-router-dom"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function LeftNav() { /*Exports to the Home, Trendings and Profile pages a LeftNav component...*/

    return ( /*...that returns a navigation menu*/
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/home" className={link => (link.isActive ? "active-left-nav" : null)}>
                        <img src="./img/icons/home.svg" alt="home-icon" />
                    </NavLink>
                    <br />

                    <NavLink to="/profile" className={link => (link.isActive ? "active-left-nav" : null)}>
                        <img src="./img/icons/user.svg" alt="user-icon" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/
