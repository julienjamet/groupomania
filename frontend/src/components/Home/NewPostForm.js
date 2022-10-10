import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { AddPost } from "../Store/actions/posts.action"

export default function NewPostForm() {

    const clientData = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [postPicture, setPostPicture] = useState('')
    const [video, setVideo] = useState('')
    const [file, setFile] = useState('')

    function handlePost() {
        dispatch(AddPost(clientData, message))

        setMessage('')
        setPostPicture(null)
        setVideo('')
        setFile('')
    }

    function cancelPost() {
        setMessage('')
        setPostPicture(null)
        setVideo('')
        setFile('')
    }

    return (
        <div className="post-container">
            <div className="data">
                <p>
                    <span>{clientData.followings ? clientData.followings.length : 0}</span>
                    {' '}Abonnement{clientData.followings.length > 1 ? "s" : null}
                </p>

                <p>
                    <span>{clientData.followers ? clientData.followers.length : 0}</span>
                    {' '}Abonné{clientData.followers.length > 1 ? "s" : null}
                </p>

                <div className="user-info">
                    <NavLink to="/profile">
                        <img src={clientData.picture} alt="profile-pic" />
                    </NavLink>
                </div>

                <div className="post-form">
                    <textarea
                        name="message"
                        id="message"
                        placeholder={`Bonjour ${clientData.pseudo} ! Quoi de neuf ?`}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    >
                    </textarea>
                </div>
                <div className="footer-form">
                    {message || postPicture || video ? (
                        <>
                            <button id="newpost--cancel" onClick={cancelPost}>Annuler</button>
                            <button id="newpost--send" onClick={handlePost}>Envoyer</button>
                        </>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}