import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FollowHandler from "../Profile/FollowHandler"
import dateParser, { isEmpty } from "../Utils"
import LeftNav from "../Navbars/LeftNav"

function Thread() {
    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector(state => state.usersReducer)
    const postsData = useSelector(state => state.postsReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <div className="thread-container">
            <LeftNav />
            <ul>
                {postsData.map(post => {
                    return (
                        <li key={post._id} className="card-container">
                            {isLoading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <>
                                    <div className="card-left">
                                        <img src={
                                            !isEmpty(usersData[0]) && usersData.map(user => {
                                                if (user._id === post.posterId) {
                                                    return user.picture
                                                }
                                                return null
                                            }).join('')
                                        } alt="profile-pic" />
                                    </div>
                                    <div className="card-right">
                                        <div className="card-header">
                                            <div className="pseudo">
                                                <h3>
                                                    {!isEmpty(usersData[0]) && usersData.map(user => {
                                                        if (user._id === post.posterId) {
                                                            return user.pseudo
                                                        }
                                                        return null
                                                    })}
                                                </h3>
                                                <FollowHandler idToFollow={post.posterId} type="card" />
                                            </div>
                                            <span>{dateParser(post.createdAt)}</span>
                                        </div>
                                        <p>{post.message}</p>
                                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                                        {post.video && (
                                            <iframe
                                                title={post._id}
                                                width="500"
                                                height="300"
                                                src={post.video}
                                                allowFullScreen
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                                gyroscope; picture-in-picture"
                                                frameBorder="0">
                                            </iframe>
                                        )}
                                        <div className="card-footer">
                                            <div className="comment-icon">
                                                <img src="./img/icons/message1.svg" alt="comment" />
                                                <span>{post.comments.length}</span>
                                            </div>
                                            {/*<LikeButton />*/}
                                            <img src="./img/icons/share.svg" alt="share" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Thread