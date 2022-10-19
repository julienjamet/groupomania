import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { AddPost } from "../Store/actions/posts.action"

export default function NewPostForm() {

    const clientData = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [picture, setPicture] = useState('')
    const [loadedPicture, setLoadedPicture] = useState(false)
    const [file, setFile] = useState('')

    function handlePost(e) {

        if (message || picture) {
            const data = new FormData()
            data.append("posterId", clientData._id)
            data.append("message", message)
            if (file) data.append("image", file)

            dispatch(AddPost(data))
        }

        setMessage('')
        setPicture('')
        setLoadedPicture(false)
        setFile('')
    }

    function cancelPost() {
        setMessage('')
        setPicture('')
        setLoadedPicture(false)
        setFile('')
    }

    function handlePicture(e) {
        setLoadedPicture(true)
        setPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

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
                                        <img src="./img/icons/picture.svg" alt="image" />
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