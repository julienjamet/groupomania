/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useState } from "react" /*Imports the useState() hook*/

/*------------Components*/
import SignUpForm from "./SignUpForm" /*Imports the SignUpForm component*/
import SignInForm from "./SignInForm" /*Imports the SignInForm component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function Log(props) { /*Runs a Log() function...*/
    /*------------Calls*/
    const [signUpModal, setSignUpModal] = useState(props.signUp) /*...that calls a useState(signUp) hook...*/
    const [signInModal, setSignInModal] = useState(props.signIn) /*...and a useState(signIn) hook...*/

    /*------------Middleware*/
    function handleModals(e) { /*...then creates a handleModals() function that sets these hooks...*/
        if (e.target.id === "register") { /*...according to the list item on which one clicks*/
            setSignUpModal(true)
            setSignInModal(false)
        }
        else if (e.target.id === "login") {
            setSignUpModal(false)
            setSignInModal(true)
        }
    }

    /*------------Return*/
    return ( /*The function finally returns...*/
        <div className="connection-form">
            <div className="form-container">
                <ul> {/*...a list whose items run the handleModals() function when clicked...*/}
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

                {signUpModal && <SignUpForm />} {/*...and the SignUpForm component if the useState(signUp) hook has been set to "true"...*/}
                {signInModal && <SignInForm />} {/*...or the SignInForm component if the useState(signIn) hook has been set to "true"*/}
            </div>
        </div >
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default Log /*Exports the Log component to the Home, Trendings and Profile components*/
/*-------------------------------------------------------------------------------------------------------------------*/