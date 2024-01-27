import * as moviesConstants from '../Constants/MoviesConstants'
import * as moviesAPIs from "../api/MoviesServices";
import toast from "react-hot-toast";
import {ErrorsAction, tokenProtection} from "../Protection";

// get all movies action
export const getAllMoviesAction =
    ({
         category = "",
         time = "",
         language = "",
         rate = "",
         year = "",
         search = "",
         pageNumber = "",
     }) =>
        async (dispatch: any) => {
            try {
                dispatch({type: moviesConstants.MOVIES_LIST_REQUEST});
                const response = await moviesAPIs.getAllMoviesService(
                    category,
                    time,
                    language,
                    rate,
                    year,
                    search,
                    pageNumber
                );
                dispatch({
                    type: moviesConstants.MOVIES_LIST_SUCCESS,
                    payload: response,
                });
            } catch (error) {
                ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
            }
        };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch: any) => {
    try {
        dispatch({type: moviesConstants.MOVIES_RANDOM_REQUEST});
        const response = await moviesAPIs.getRandomMoviesService();
        dispatch({
            type: moviesConstants.MOVIES_RANDOM_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
    }
};

// get movie by id action
export const getMovieByIdAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch({type: moviesConstants.MOVIE_DETAILS_REQUEST});
        const response = await moviesAPIs.getMovieByIdService(id);
        dispatch({
            type: moviesConstants.MOVIE_DETAILS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
    }
};

// get top rated movie action
export const getTopRatedMovieAction = () => async (dispatch: any) => {
    try {
        dispatch({type: moviesConstants.MOVIE_TOP_RATED_REQUEST});
        const response = await moviesAPIs.getTopRatedMovieService();
        dispatch({
            type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
    }
};

// review movie action
export const reviewMovieAction =
    ({id, review}: any) =>
        async (dispatch: any, getState: any) => {
            try {
                dispatch({type: moviesConstants.CREATE_REVIEW_REQUEST});
                const response = await moviesAPIs.reviewMovieService(
                    tokenProtection(getState),
                    id,
                    review
                );
                dispatch({
                    type: moviesConstants.CREATE_REVIEW_SUCCESS,
                    payload: response,
                });
                toast.success("Review added successfully");
                dispatch({type: moviesConstants.CREATE_REVIEW_RESET});
                dispatch(getMovieByIdAction(id));
            } catch (error) {
                ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
            }
        };

// delete movie action
export const deleteMovieAction = (id: number) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: moviesConstants.DELETE_MOVIE_REQUEST});
        const response = await moviesAPIs.deleteMovieService(
            tokenProtection(getState),
            id
        );
        dispatch({
            type: moviesConstants.DELETE_MOVIE_SUCCESS,
            payload: response,
        });
        toast.success("Movie deleted successfully");
        dispatch(getAllMoviesAction({}));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
    }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: moviesConstants.DELETE_ALL_MOVIES_REQUEST});
        const response = await moviesAPIs.deleteAllMoviesService(
            tokenProtection(getState)
        );
        dispatch({
            type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
            payload: response,
        });
        toast.success("All movies deleted successfully");
        dispatch(getAllMoviesAction({}));
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
    }
};

// create movie action
export const createMovieAction = (movie: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: moviesConstants.CREATE_MOVIE_REQUEST});
        const response = await moviesAPIs.createMovieService(
            tokenProtection(getState),
            movie
        );
        dispatch({
            type: moviesConstants.CREATE_MOVIE_SUCCESS,
            payload: response,
        });
        toast.success("Movie created successfully");
        dispatch(deleteAllCastAction());
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
    }
};

// *******CASTS**********

// add cast
export const addCastAction = (cast: any) => async (dispatch: any, getState: any) => {
    dispatch({type: moviesConstants.ADD_CAST, payload: cast});
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remove cast
export const removeCastAction = (id: number) => async (dispatch: any, getState: any) => {
    dispatch({type: moviesConstants.DELETE_CAST, payload: id});
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// update cast
export const updateCastAction = (cast: any) => async (dispatch: any, getState: any) => {
    dispatch({type: moviesConstants.EDIT_CAST, payload: cast});
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete all cast
export const deleteAllCastAction = () => async (dispatch: any) => {
    dispatch({type: moviesConstants.RESET_CAST});
    localStorage.removeItem("casts");
};

// Update movie action
export const updateMovieAction = (id: number, movie: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: moviesConstants.UPDATE_MOVIE_REQUEST});
        const response = await moviesAPIs.updateMovieService(
            tokenProtection(getState),
            id,
            movie
        );
        dispatch({
            type: moviesConstants.UPDATE_MOVIE_SUCCESS,
            payload: response,
        });
        toast.success("Movie updated successfully");
        dispatch(getMovieByIdAction(id));
        dispatch(deleteAllCastAction());
    } catch (error) {
        ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
    }
};