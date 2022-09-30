/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import axios from "axios" /*Imports Axios*/
import { useContext, useState } from "react" /*Imports the useState() and useContext() hooks*/

/*------------Components*/
import { UserDataContext } from "../AppContext" /*Imports the Context*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function UploadImg() { /*Runs an UploadImg() function...*/
    /*------------Calls*/
    const [file, setFile] = useState() /*...that calls a useState(file) hook...*/
    const userData = useContext(UserDataContext) /*...runs the useContext() hook to retrieve the user data...*/
    const fileInput = document.getElementById("file")

    /*------------Middlewares*/
    if (file) {
        fileInput.style.color = "black"
        fileInput.style.marginLeft = "1px"
    }

    function handlePicture(e) { /*...and creates a handlePicture() function...*/
        e.preventDefault()

        const data = new FormData() /*...that creates a new FormData object...*/
        data.append("picture", `./uploads/profil/${file.name}`) /*...containing the data from the useState(file) hook...*/

        axios({ /*...then runs an Axios PUT method on the backend "api/user/:id" route...*/
            method: "put",
            headers: { "Content-Type": "multipart/form-data" },
            url: `http://localhost:5000/api/user/${userData._id}`,
            data: data, /*...that contains the FormData object*/
            withCredentials: true
        })
            .then(res => { console.log(res) })
            .catch(error => console.log(error))

    }

    /*------------Return*/
    return ( /*The function finally returns...*/
        <form action="" onSubmit={handlePicture} className="upload-pic"> {/*...a form that runs the handlePicture() function when submitted...*/}
            <label htmlFor="file">Changer de photo de profil</label>
            <input
                type="file"
                id="file"
                name="id"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => { setFile(e.target.files[0]) }} /*...and whose input sets the useState(file) hook*/
            />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default UploadImg /*Exports the UploadImg component to the UpdateProfile component*/
/*-------------------------------------------------------------------------------------------------------------------*/