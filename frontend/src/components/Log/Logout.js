/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios" /*Imports Axios*/
import cookie from "js-cookie" /*Imports a cookies handler module*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Logout() { /*Runs a Logout() function...*/
    /*------------Middlewares*/
    function removeCookie(key) { /*...that creates a removeCookie() middleware...*/
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 }) /*...that removes itself the existing cookie from the frontend...*/
        }
    }

    function logout() { /*...and a logout() middleware...*/
        axios({ /*...that runs itself an Axios GET method on the backend "/api/user/logout" route to remove the cookie from the backend...*/
            method: "get",
            url: `http://localhost:5000/api/user/logout`,
            withCredentials: true
        })
            .then(() => {
                removeCookie('token') /*...then runs the removeCookie() middleware...*/
            })
            .catch(error => console.log(error))

        setTimeout(function () {
            window.location = "/profile"
        }, 500)
    }

    /*------------Return*/
    return ( /*The function finally returns...*/
        <li onClick={logout}> {/*...an icon that runs the logout() middleware when clicked*/}
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default Logout /*Exports the Logout component to the Navbar component*/
/*-------------------------------------------------------------------------------------------------------------------*/