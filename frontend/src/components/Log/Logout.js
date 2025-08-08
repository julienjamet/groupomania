/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Logout() { /*Exports to the Navbar a Logout component...*/

    /*------------Middleware*/
    function logout() {
        axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true }) /*...running a GET (Logout) request...*/

            .catch(() => window.location.reload()); /*...then reloading the current page*/
    }

    /*------------Return*/
    return ( /*The Logout component returns...*/
        <li onClick={logout}> {/*...an icon that runs the logout middleware when clicked*/}
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/