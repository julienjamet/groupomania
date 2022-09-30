/*Imports------------------------------------------------------------------------------------------------------------*/
import { useState } from "react" /*Imports the useState() hook*/
import axios from "axios" /*Imports Axios*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function SignUpForm() { /*Runs a SignUpForm() function...*/
    /*------------Calls*/
    const [pseudo, setPseudo] = useState('') /*...that calls a useState(pseudo) hook...*/
    const [email, setEmail] = useState('') /*...a useState(email) hook...*/
    const [password, setPassword] = useState('') /*...a useState(password) hook...*/
    const [controlPassword, setControlPassword] = useState('') /*...and a useState(controlPassword) hook...*/

    /*------------Middleware*/
    function handleRegister(e) { /*...then creates a handleRegister() function...*/
        e.preventDefault()

        const pseudoError = document.querySelector('.pseudo.error') /*...that targets the "pseudo error" div...*/
        pseudoError.textContent = ""
        const emailError = document.querySelector('.email.error') /*...the "email error" div...*/
        emailError.textContent = ""
        const passwordError = document.querySelector('.password.error') /*...the "password error" div...*/
        passwordError.textContent = ""
        const passwordConfirmError = document.querySelector('.password-confirm.error') /*...the "password-confirm error" div...*/
        passwordConfirmError.textContent = ""
        const terms = document.getElementById('terms') /*...the checkbox input...*/
        const termsError = document.querySelector('.terms.error') /*...and the "terms error" div*/
        termsError.textContent = ""

        const submitBox = document.querySelector(".connection-form")
        const submitButton = document.getElementById('submit')
        const registerButton = document.getElementById('register')

        if (password !== controlPassword || !terms.checked) { /*If the two passwords do not match or if the checkbox is not checked, the function returns error messages*/
            if (password !== controlPassword) {
                return passwordConfirmError.textContent = "Les mots de passe ne correspondent pas"
            }
            if (!terms.checked) {
                return termsError.textContent = "Veuillez valider les conditions générales"
            }
        }

        axios({ /*Otherwise the middleware runs an Axios POST method on the backend "/api/user/register" route...*/
            method: "post",
            url: `http://localhost:5000/api/user/register`,
            data: {
                pseudo: pseudo,
                email: email,
                password: password
            }
        })
            .then(() => { /*...before redirecting the user to the login page...*/
                submitBox.style.backgroundColor = "#c9f0d4"

                submitButton.style.borderColor = "#76ba6a"
                submitButton.style.backgroundColor = "#white"
                submitButton.style.color = "#76ba6a"

                registerButton.style.backgroundColor = "white"
                registerButton.style.color = "#76ba6a"

                setTimeout(function () {
                    window.location = "/profile"
                }, 500)
            })
            .catch(error => { /*...or returning error messages*/
                const RegexErrorMessage = error.response.data.message

                if (RegexErrorMessage) {
                    if (RegexErrorMessage.includes("pseudo")) {
                        pseudoError.textContent = RegexErrorMessage
                    }
                    if (RegexErrorMessage.includes("email")) {
                        emailError.textContent = RegexErrorMessage
                    }
                    if (RegexErrorMessage.includes("mot de passe")) {
                        passwordError.textContent = RegexErrorMessage
                    }
                }

                const pseudoNotAvailableErrorMessage = error.response.data.errors.pseudo
                const emailNotAvailableErrorMessage = error.response.data.errors.email

                if (pseudoNotAvailableErrorMessage) {
                    pseudoError.textContent = pseudoNotAvailableErrorMessage
                }
                if (emailNotAvailableErrorMessage) {
                    emailError.textContent = emailNotAvailableErrorMessage
                }
            })
    }

    /*------------Return*/
    return ( /*The function finally returns...*/
        <form action="" onSubmit={handleRegister} id="sign-up-form"> {/*...a form that runs the handleRegister() function when submitted...*/}
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                placeholder="ex: Thomas27"
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)} /*...and whose inputs set the useState(pseudo) hook...*/
                value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)} /*...the useState(email) hook...*/
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                placeholder="ex: P@sswor3"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)} /*...the useState(password) hook...*/
                value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)} /*...and the useState(controlPassword) hook*/
                value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
            <div className="terms error"></div>
            <br />
            <input type="submit" id="submit" value="Inscription" />
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default SignUpForm /*Exports the Register component to the Log component*/
/*-------------------------------------------------------------------------------------------------------------------*/