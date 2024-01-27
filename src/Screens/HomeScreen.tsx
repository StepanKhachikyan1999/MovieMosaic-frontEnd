import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/Toprated";
import Layout from "../Layout/Layout";
import {getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction,} from "../Redux/Actions/MoviesActions";

function HomeScreen() {
    const dispatch = useDispatch();
    // useSelectors
    const {
        isLoading: randomLoading,
        isError: randomError,
        movies: randomMovies,
        // @ts-ignore
    } = useSelector((state) => state.getRandomMovies);
    const {
        isLoading: topLoading,
        isError: topError,
        movies: topMovies,
        // @ts-ignore
    } = useSelector((state) => state.getTopRatedMovie);
    const {isLoading, isError, movies} = useSelector(
        // @ts-ignore
        (state) => state.getAllMovies
    );

    // useEffect
    useEffect(() => {
        // get random movies
        // @ts-ignore
        dispatch(getRandomMoviesAction());
        // get all movies
        // @ts-ignore
        dispatch(getAllMoviesAction({}));
        // get top rated movies
        // @ts-ignore
        dispatch(getTopRatedMovieAction());
        // errors
        if (isError || randomError || topError) {
            toast.error("Something went wrong!");
        }
    }, [dispatch, isError, randomError, topError]);

    return (
        <Layout>
            <div className="container mx-auto min-h-screen px-2 mb-6">
                <Banner movies={movies} isLoading={isLoading}/>
                <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
                <Promos/>
                <TopRated movies={topMovies} isLoading={topLoading}/>
            </div>
        </Layout>
    );
}

export default HomeScreen

// new