/*Imports------------------------------------------------------------------------------------------------------------*/
import { useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function UploadImage() { /*Exports an UploadImage component...*/

    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/

    const [file, setFile] = useState()

    const label = document.querySelector(".upload-pic label")

    /*------------Middleware*/
    if (file) {
        label.textContent = "Votre fichier est chargé"
        label.style.background = "none"
        label.style.border = "none"
        label.style.color = "green"
        label.style.fontStyle = "italic"
    }

    function handlePicture(e) { /*...then runs a middleware...*/
        e.preventDefault()

        const data = new FormData() /*...that creates an object...*/
        data.append("picture", `./uploads/profil/${file.name}`) /*...containing the data retrieved from the State...*/

        axios({ /*...then runs a PUT (image) request...*/
            method: "put",
            headers: { "Content-Type": "multipart/form-data" },
            url: `http://localhost:5000/api/user/${clientData._id}`,
            data: data,
            withCredentials: true
        })
            .then(() => { window.location.reload() }) /*...before reloading the page*/
            .catch(error => console.log(error))
    }

    /*------------Return*/
    return ( /*The UploadImage component returns...*/
        <form action="" onSubmit={handlePicture} className="upload-pic"> {/*...a form that runs the middleware when submitted...*/}
            <label htmlFor="file">Changer de photo de profil</label>
            <input
                type="file"
                id="file"
                name="id"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => { setFile(e.target.files[0]) }} /*...and whose input sets the State when manipulated*/
            />
            <br />
            <input type="submit" id="submit" value="Envoyer" />
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/