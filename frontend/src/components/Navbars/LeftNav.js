/*Imports------------------------------------------------------------------------------------------------------------*/
import { NavLink } from "react-router-dom" /*Imports a NavLink component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function LeftNav() { /*Runs a LeftNav() function...*/
    return ( /*...that returns a navigation bar...*/
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis"> {/*...containing a link to the Home page...*/}
                    <NavLink to="/home" className={(link) => (link.isActive ? "active-left-nav" : null)}>
                        <img src="./img/icons/home.svg" alt="home-icon" />
                    </NavLink>
                    <br /> {/*...one to the Trendings page...*/}
                    <NavLink to="/trendings" className={(link) => (link.isActive ? "active-left-nav" : null)}>
                        <img src="./img/icons/rocket.svg" alt="rocket-icon" />
                    </NavLink>
                    <br /> {/*...and one to the Profile page...*/}
                    <NavLink to="/profile" className={(link) => (link.isActive ? "active-left-nav" : null)}>
                        <img src="./img/icons/user.svg" alt="user-icon" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default LeftNav /*Exports the LeftNav component to the Home, Trendings and Profile components*/
/*-------------------------------------------------------------------------------------------------------------------*/
