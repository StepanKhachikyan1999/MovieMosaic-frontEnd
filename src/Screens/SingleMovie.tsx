import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../components/Single/MovieCasts";
import MovieInfo from "../components/Single/MovieInfo";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import { useTranslation } from 'react-i18next'
// @ts-ignore
import FileSaver from "file-saver";

function SingleMovie() {
    const { t } = useTranslation()
    const [modalOpen, setModalOpen] = useState(false)
    // @ts-ignore
    const {progress, setprogress} = useContext(SidebarContext);
    const {id} = useParams();
    const dispatch = useDispatch();
    const sameClass = "w-full gap-6 flex-colo min-h-screen";
    // use Selector
    const {isLoading, isError, movie} = useSelector(
        // @ts-ignore
        (state) => state.getMovieById
    )
    // @ts-ignore
    const {movies} = useSelector((state) => state.getAllMovies);
    // related movies
    const RelatedMovies = movies?.filter((m: any) => m.category === movie?.category);

    // download movie Video
    // @ts-ignore
    const DownloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setprogress).then((data) => {
            setprogress(0);
            FileSaver.saveAs(data, name);
        });
    };

    // use Effect
    useEffect(() => {
        //  movie id
        // @ts-ignore
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

    return (
        <Layout>
            {isLoading ? (
                <div className={sameClass}>
                    <Loader/>
                </div>
            ) : isError ? (
                <div className={sameClass}>
                    <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                        <RiMovie2Line/>
                    </div>
                    <p className="text-border text-sm">Something went wrong</p>
                </div>
            ) : (
                <>
                    <ShareMovieModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        movie={movie}
                    />
                    <MovieInfo
                        movie={movie}
                        setModalOpen={setModalOpen}
                        DownloadVideo={DownloadMovieVideo}
                        progress={progress}
                    />
                    <div className="container mx-auto min-h-screen px-2 my-6">
                        {/*@ts-ignore*/}
                        <MovieCasts movie={movie}/>
                        {/* rate */}
                        <MovieRates movie={movie}/>
                        {/* related */}
                        {RelatedMovies?.length > 0 && (
                            <div className="my-16">
                                <Titles title={t('relatedMovies')} Icon={BsCollectionFill}/>
                                <div
                                    className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                                    {RelatedMovies?.map((movie: any) => (
                                        <Movie key={movie?._id} movie={movie}/>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
}

export default SingleMovie

// new