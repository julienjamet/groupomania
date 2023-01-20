/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------React & Redux modules*/
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

/*------------Actions*/
import { AddPost } from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function NewPostForm() { /*Exports a NewPostForm component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the clientData from the Store...*/
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [picture, setPicture] = useState('')
    const [file, setFile] = useState('')

    /*------------Middlewares*/
    function handlePost(e) { /*...then runs a HandlePost middleware...*/

        if (message || picture) {
            const data = new FormData()
            data.append("posterId", clientData._id)
            data.append("message", message)
            if (file) data.append("image", file)

            dispatch(AddPost(data)) /*...running a Add (post) action...*/
        }

        setMessage('') /*...before resetting the States..*/
        setPicture('')
        setFile('')
    }

    function cancelPost() { /*...a CancelPost middleware...*/

        setMessage('') /*...that resets the States*/
        setPicture('')
        setFile('')
    }

    function handlePicture(e) { /*...and a HandlePicture middleware...*/
        setPicture(URL.createObjectURL(e.target.files[0])) /*...that sets the Picture and File States*/
        setFile(e.target.files[0])
    }

    /*------------Return*/
    return (
        <div className="post-container">
            <div className="data">
                {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && (
                    <>
                        <p>
                            <span>{clientData.followings ? clientData.followings.length : 0}</span>
                            {' '}Abonnement{clientData.followings.length > 1 ? "s" : null}
                        </p>

                        <p>
                            <span>{clientData.followers ? clientData.followers.length : 0}</span>
                            {' '}Abonné{clientData.followers.length > 1 ? "s" : null}
                        </p>
                    </>
                )}

                <div className="user-info">
                    {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && (
                        <NavLink to="/profile">
                            <img src={clientData.picture} alt="profile-pic" />
                        </NavLink>
                    )}
                </div>

                <div className="post-form">
                    {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` ? (
                        <textarea
                            name="message"
                            id="message"
                            placeholder={`Bonjour ${clientData.pseudo} ! Quoi de neuf ?`}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                    ) : (
                        <h2 id="admin">Bonjour Administrateur !</h2>
                    )}

                    <div className="footer-form">
                        {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && (
                            <>
                                {!picture ? (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="pic-icon" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={(e) => { handlePicture(e) }} />
                                    </>
                                ) : (
                                    <span id="loaded">Votre fichier est chargé</span>
                                )}
                            </>
                        )}

                        {message || picture ? (
                            <div id="buttons">
                                <button id="newpost--cancel" onClick={cancelPost}>Annuler</button>
                                <button id="newpost--send" onClick={handlePost}>Envoyer</button>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/