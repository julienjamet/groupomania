/*Imports------------------------------------------------------------------------------------------------------------*/
import { useState } from 'react' /*Imports the useState() hook*/
import axios from 'axios' /*Imports Axios*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function SignInForm() { /*Runs a SignInForm() function...*/
    /*------------Calls*/
    const [email, setEmail] = useState('') /*...that calls a useState(email) hook...*/
    const [password, setPassword] = useState('') /*...and a useState(password) hook...*/

    /*------------Middleware*/
    function handleLogin(e) { /*...then creates a handleLogin() function...*/
        e.preventDefault()

        const emailError = document.querySelector('.email.error') /*...that targets the "email error" div...*/
        emailError.textContent = ""
        const passwordError = document.querySelector('.password.error') /*...and the "password error" div...*/
        passwordError.textContent = ""

        axios({ /*...then runs an Axios POST method on the backend "/api/user/login" route...*/
            method: "post",
            url: `http://localhost:5000/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then(() => { window.location.reload() }) /*...before redirecting the user to its authenticated profile page...*/
            .catch(error => { /*...or returning error messages*/
                const errorMessage = error.response.data.message

                if (errorMessage.includes("incomplet")) {
                    e.preventDefault()
                }
                if (errorMessage.includes("email")) {
                    emailError.textContent = errorMessage
                }
                if (errorMessage.includes("mot de passe")) {
                    passwordError.textContent = errorMessage
                }
            })
    }

    /*------------Return*/
    return ( /*The function finally returns...*/
        <form action="" onSubmit={handleLogin} id="sign-up-form"> {/*...a form that runs the handleLogin() function when submitted...*/}
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text" name="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} /*...and whose inputs set the useState(email) hook...*/
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password" name="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} /*...and the useState(password) hook*/
            />
            <div className="password error"></div>
            <br />
            <input type="submit" id="submit" value="Connexion" />
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default SignInForm /*Exports the Login component to the Log and Register components*/
/*-------------------------------------------------------------------------------------------------------------------*/