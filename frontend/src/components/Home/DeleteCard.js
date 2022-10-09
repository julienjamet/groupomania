import { useDispatch } from "react-redux"
import { DeletePost } from "../Store/actions/posts.action"

export default function DeleteCard({ postId }) {

    const dispatch = useDispatch()

    function deleteCard() {
        dispatch(DeletePost(postId))
    }

    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous vraiment supprimer votre message ?')) {
                deleteCard()
            }
        }}>
            <img src="./img/icons/trash.svg" alt="delete" />
        </div>
    )
}