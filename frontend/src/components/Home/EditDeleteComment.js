/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch } from "react-redux"
import { useState } from "react"

/*------------Actions*/
import { DeleteComment, EditComment } from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function EditDeleteComment({ comment, postId }) { /*Exports an EditDeleteComment component...*/

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState("")

    /*------------Middlewares*/
    function handleEdit(e) { /*...that runs a handleEdit component...*/
        e.preventDefault()

        if (text) {
            dispatch(EditComment(postId, comment._id, comment.commenterId, text)) /*...running itself a Patch (Edit comment) action...*/
        }
        setEdit(false) /*...before resetting the Edit State...*/
        setText("") /*...and the Text State*/
    }

    function cancelEdit() { /*...a cancelEdit middleware...*/
        setEdit(false) /*...resetting the Edit State...*/
        setText("") /*...and the Text State*/
    }

    function handleDelete() { /*...and a handleDelete middleware...*/
        dispatch(DeleteComment(postId, comment._id, comment.commenterId)) /*...running itself a Delete (comment) action*/
    }

    /*------------Return*/
    return ( /*The EditDeleteComment component returns...*/
        <div className="edit-comment">
            {edit === false && ( /*...if the Edit State is set to "false"...*/
                <span onClick={() => setEdit(true)}> {/*...an icon that sets the Edit State to "true" when clicked*/}
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {edit === true && ( /*If the Edit State has been set to "true", the EditDeleteComment component instead returns...*/
                <form action="" onSubmit={handleEdit} className="edit-comment-form"> {/*...a form that runs the handleEdit middleware when submitted...*/}
                    <input /*...whose input sets the Text State when manipulated...*/
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                    <br />
                    <div className="btn">
                        <span onClick={() => {
                            /*...and that contains an icon running the handleDelete middleware when clicked...*/
                            if (window.confirm("Voulez-vous vraiment supprimer votre commentaire ?")) {
                                handleDelete()
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="delete-comment" />
                        </span>
                    </div>
                    <input type="submit" id="edit-button" value="Valider modification" />
                    <button onClick={cancelEdit} id="cancel-edit" >Annuler</button> {/*...and a button running the cancelEdit middleware when clicked*/}
                </form>
            )}
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/