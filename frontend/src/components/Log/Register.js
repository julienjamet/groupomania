/*Imports------------------------------------------------------------------------------------------------------------*/
import { useState } from "react"
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function SignUpForm() { /*Exports to the LogModal a Register component...*/

    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlPassword, setControlPassword] = useState('')

    /*------------Middleware*/
    function handleRegister(e) { /*...running a middleware...*/
        e.preventDefault()

        const pseudoError = document.querySelector('.pseudo.error')
        pseudoError.textContent = ""

        const emailError = document.querySelector('.email.error')
        emailError.textContent = ""

        const passwordError = document.querySelector('.password.error')
        passwordError.textContent = ""

        const passwordConfirmError = document.querySelector('.password-confirm.error')
        passwordConfirmError.textContent = ""

        const terms = document.getElementById('terms')

        const termsError = document.querySelector('.terms.error')
        termsError.textContent = ""

        const submitBox = document.querySelector(".connection-form")
        const submitButton = document.getElementById('submit')
        const registerButton = document.getElementById('register')

        if (password !== controlPassword || !terms.checked) { /*...that controls the client-side validity of the form...*/
            if (password !== controlPassword) {
                return passwordConfirmError.textContent = "Les mots de passe ne correspondent pas"
            }
            if (!terms.checked) {
                return termsError.textContent = "Veuillez valider les conditions générales"
            }
        }

        axios({ /*...then runs a POST (Register) request...*/
            method: "post",
            url: 'https://api.julienjamet-groupomania.com/api/user/register',
            data: {
                pseudo: pseudo,
                email: email,
                password: password
            },
            withCredentials: true
        })

            .then(() => { /*...before reloading the page*/
                submitBox.style.backgroundColor = "#c9f0d4"

                submitButton.style.borderColor = "#76ba6a"
                submitButton.style.backgroundColor = "white"
                submitButton.style.color = "#76ba6a"

                registerButton.style.backgroundColor = "white"
                registerButton.style.color = "#76ba6a"

                setTimeout(() => { window.location.reload() }, 500)
            })
            .catch(error => {
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
    return ( /*The Register component returns...*/
        <form action="" onSubmit={handleRegister} id="sign-up-form"> {/*...a form that runs the middleware when submitted...*/}
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
                placeholder="ex: Thomas27"
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)} /*...and whose inputs set the States when manipulated*/
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setControlPassword(e.target.value)}
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