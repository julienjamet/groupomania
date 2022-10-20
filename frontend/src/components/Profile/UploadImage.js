/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

/*------------Actions*/
import { PutImage } from "../Store/actions/client.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function UploadImage() { /*Exports to the UpdateProfile an UploadImage component...*/

    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/
    const dispatch = useDispatch()

    const [file, setFile] = useState()
    const [loadedFile, setLoadedFile] = useState(false)

    /*------------Middleware*/
    function handlePicture(e) { /*...then runs a middleware...*/
        e.preventDefault()

        const data = new FormData() /*...that creates an object...*/
        data.append("image", file) /*...containing the data retrieved from the State...*/

        dispatch(PutImage(data, clientData._id)) /*...then runs a PUT (Image) action...*/

        setTimeout(() => { setLoadedFile(false) }, 500) /*...before setting the LoadedFile State to false*/
    }

    /*------------Return*/
    return ( /*The UploadImage component returns...*/
        <form action="" onSubmit={handlePicture} className="upload-pic"> {/*...a form that runs the middleware when submitted...*/}
            {!loadedFile && (<label htmlFor="file">Changer de photo de profil</label>)}
            {loadedFile && (<label id="loaded" htmlFor="file">Votre fichier est chargé</label>)}
            <input
                type="file"
                id="file"
                name="id"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => { /*...and whose input sets the States when manipulated...*/
                    setFile(e.target.files[0])
                    setLoadedFile(true)
                }}
            />
            <br />
            {loadedFile && <input type="submit" id="submit-image" value="Envoyer" />} {/*...and, if the LoadedFile State has been set to "true", a button that submits the form*/}
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/