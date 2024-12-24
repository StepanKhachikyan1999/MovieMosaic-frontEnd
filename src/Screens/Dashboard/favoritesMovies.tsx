import React, { useContext, useEffect } from 'react'
import Table from '../../components/Table'
import SideBar from './SideBar'
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions'
import toast from "react-hot-toast";
import Loader from "../../components/Notfications/Loader";
import { Empty } from "../../components/Notfications/Empty";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";
// @ts-ignore
import FileSaver from 'file-saver'

function FavoritesMovies() {
    const dispatch = useDispatch();
    // @ts-ignore
    const {progress, setprogress} = useContext(SidebarContext);
    const {isLoading, isError, likedMovies} = useSelector(
        // @ts-ignore
        (state) => state.userGetFavoriteMovies
    )
    // delete
    const {
        isLoading: deleteLoading,
        isError: deleteError,
        isSuccess,
        // @ts-ignore
    } = useSelector((state) => state.userDeleteFavoriteMovies);

    // delete movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all movies?") &&
        // @ts-ignore
        dispatch(deleteFavoriteMoviesAction());
    };

    // download movie Video
    const DownloadMovieVideo = async (videoUrl: any, name: any) => {
        await DownloadVideo(videoUrl, setprogress).then((data) => {
            setprogress(0);
            FileSaver.saveAs(data, name);
        });
    };

    // useEffect
    useEffect(() => {
        // @ts-ignore
        dispatch(getFavoriteMoviesAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({
                type: isError
                    ? "GET_FAVORITE_MOVIES_RESET"
                    : "DELETE_FAVORITE_MOVIES_RESET",
            });
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Favorites Movies</h2>
                    {likedMovies?.length > 0 && (
                        <button
                            disabled={deleteLoading}
                            onClick={deleteMoviesHandler}
                            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
                        >
                            {deleteLoading ? "Deleting..." : "Delete All"}
                        </button>
                    )}
                </div>
                {isLoading ? (
                    <Loader/>
                ) : likedMovies.length > 0 ? (
                    <Table
                        data={likedMovies}
                        admin={false}
                        downloadVideo={DownloadMovieVideo}
                        progress={progress}
                    />
                ) : (
                    <Empty message="You have no favorites movies"/>
                )}
            </div>
        </SideBar>
    );
}

export default FavoritesMovies

// new