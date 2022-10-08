/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------React modules*/
import { useState } from "react"

/*------------Components*/
import Register from "./Register"
import Login from "./Login"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function LogModal() { /*Exports to the Home, Trendings and Profile pages a LogModal component...*/

    const [signUpModal, setSignUpModal] = useState(false)
    const [signInModal, setSignInModal] = useState(true)

    /*------------Middleware*/
    function handleModals(e) { /*...running a middleware...*/
        if (e.target.id === "register") { /*...that, according to the list item on which one clicks...*/
            setSignUpModal(true) /*...sets each State to "true" or "false"*/
            setSignInModal(false)
        }
        else {
            setSignUpModal(false)
            setSignInModal(true)
        }
    }

    /*------------Return*/
    return ( /*The LogModal component returns...*/
        <div className="connection-form">
            <div className="form-container">
                <ul> {/*...a list whose items run the middleware when clicked...*/}
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>

                {signUpModal && <Register />} {/*...and, depending on which State is set to "true", the Register component...*/}
                {signInModal && <Login />} {/*...or the Login component*/}
            </div>
        </div >
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/