/*Imports------------------------------------------------------------------------------------------------------------*/
import { useState } from 'react'
import axios from 'axios'
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Login() { /*Exports to the LogModal a Login component...*/

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /*------------Middleware*/
    function handleLogin(e) { /*...running a middleware...*/
        e.preventDefault()

        const emailError = document.querySelector('.email.error')
        emailError.textContent = ""

        const passwordError = document.querySelector('.password.error')
        passwordError.textContent = ""

        axios({ /*...that runs a POST (Login) request...*/
            method: "post",
            url: `http://localhost:5000/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })

            .then(() => { window.location.reload() }) /*...before reloading the page*/
            .catch(error => {
                const errorMessage = error.response.data.message

                if (errorMessage.includes("email")) {
                    emailError.textContent = errorMessage
                }
                if (errorMessage.includes("mot de passe")) {
                    passwordError.textContent = errorMessage
                }
            })
    }

    /*------------Return*/
    return ( /*The Login component returns...*/
        <form action="" onSubmit={handleLogin} id="sign-up-form"> {/*...a form that runs the middleware when submitted...*/}
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text" name="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} /*...and whose inputs set the States when manipulated*/
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password" name="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <br />
            <input type="submit" id="submit" value="Connexion" />
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/