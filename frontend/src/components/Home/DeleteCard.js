/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useDispatch } from "react-redux"

/*------------Actions*/
import { DeletePost } from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function DeleteCard({ postId }) { /*Exports a DeleteCard component...*/

    const dispatch = useDispatch()

    /*Middleware*/
    function deleteCard() { /*...that runs a middleware*...*/
        dispatch(DeletePost(postId)) /*...running itself a Delete action...*/
    }

    return ( /*...then returns...*/
        <div onClick={() => { /*...an icon that runs the middleware when clicked*/
            if (window.confirm('Voulez-vous vraiment supprimer votre message ?')) {
                deleteCard()
            }
        }}>
            <img src="./img/icons/trash.svg" alt="delete" />
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/