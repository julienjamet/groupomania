/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useSelector } from "react-redux"

/*------------Components*/
import FollowHandler from "../Profile/FollowHandler"
import LikeButton from "./LikeButton"

/*------------Utils*/
import dateParser from "../Utils"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Card({ post }) { /*Exports a Card component...*/

    /*------------Data*/
    const usersData = useSelector(state => state.usersReducer) /*...that gets the users data from the Store...*/

    /*------------Return*/
    return ( /*...then returns...*/
        <>
            <div className="card-left">
                <img src={
                    usersData.map(user => {
                        if (user._id === post.posterId) {
                            return user.picture /*...the profile picture of the post creator...*/
                        }
                        return null
                    }).join('')
                } alt="profile-pic" />
            </div>

            <div className="card-right">
                <div className="card-header">

                    <div className="pseudo">
                        <h3>
                            {usersData.map(user => { /*...its pseudo...*/
                                if (user._id === post.posterId) {
                                    return user.pseudo
                                }
                                return null
                            })}
                        </h3>
                        <FollowHandler idToFollow={post.posterId} type="card" /> {/*...a FollowHandler component...*/}
                    </div>

                    <span>{dateParser(post.createdAt)}</span>
                </div>

                <p>{post.message}</p> {/*...the body of the post...*/}

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

                <div className="card-footer"> {/*...and a footer containing...*/}
                    <div className="comment-icon">
                        <img src="./img/icons/message1.svg" alt="comment" />
                        <span>{post.comments.length}</span> {/*...a comments section...*/}
                    </div>
                    <LikeButton post={post} /> {/*...and a LikeButton component*/}
                    <img src="./img/icons/share.svg" alt="share" />
                </div>
            </div>
        </>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/