import React from 'react'
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../Context/Functionalities";

function Movie({movie}: any) {
    // @ts-ignore
    const {isLoading} = useSelector((state) => state.userLikeMovie)
    const dispatch = useDispatch()
    // @ts-ignore
    const {userInfo} = useSelector((state) => state.userLogin)
    const lang = localStorage.getItem('language')

    // if liked function
    const isLiked = IfMovieLiked(movie)
    return (
        <>
            <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
                <Link to={`/movie/${movie?._id}`} className="w-full">
                    <img
                        src={movie?.image ? movie?.image : "/images/user.png"}
                        alt={movie?.name}
                        className="w-full h-64 object-cover"
                    />
                </Link>
                <div
                    className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                    <h3 className="font-semibold truncate">
                        {movie && movie[`name_${lang}`]}
                    </h3>
                    <button
                        // @ts-ignore
                        onClick={() => LikeMovie(movie, dispatch, userInfo)}
                        disabled={isLiked || isLoading}
                        className={`h-9 w-9 text-sm flex-colo transitions
           ${isLiked ? "bg-transparent" : "bg-subMain"}
            hover:bg-transparent border-2 border-subMain rounded-md  text-white`}
                    >
                        <FaHeart/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Movie

// new