import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {likeMovieAction} from "../Redux/Actions/userActions";
import {IoMdCloudDownload} from "react-icons/io";
import Axios from '../Redux/api/Axios'

// check if movie is added to favorites
const IfMovieLiked = (movie: any) => {
    // @ts-ignore
    const {likedMovies} = useSelector((state) => state.userGetFavoriteMovies)
    return likedMovies?.find((likedMovie: { _id: any; }) => likedMovie?._id === movie?._id)
};

// like movie functionalty
const LikeMovie = (movie: { _id: any; }, dispatch: (arg0: (dispatch: any, getState: any) => Promise<void>) => any, userInfo: any) => {
    return !userInfo
        ? toast.error("Please Login to add to favorites")
        : dispatch(
            likeMovieAction({
                movieId: movie._id,
            })
        );
};

// download video url functionalty
const DownloadVideo = async (videoUrl: any, setProgress: (arg0: number) => void) => {
    const {data} = await Axios({
        url: videoUrl,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            // @ts-ignore
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
            if (percent > 0 && percent < 100) {
                toast.loading(`Downloading... ${percent}%`, {
                    id: "download",
                    duration: 100000000,
                    position: "bottom-right",
                    style: {
                        background: "#0B0F29",
                        color: "#fff",
                        borderRadius: "10px",
                        border: ".5px solid #F20000",
                        padding: "16px",
                    },
                    icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain"/>,
                });
            } else {
                toast.dismiss("download");
            }
        },
    });
    return data;
};

export {IfMovieLiked, LikeMovie, DownloadVideo}


// new