import Axios from './Axios'

// get all movies Function
export const getAllMoviesService = async (
    category: string,
    time: string,
    language: string,
    rate: string,
    year: string,
    search: string,
    pageNumber: string,
    type: string
) => {
    const {data} = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}&type=${type}`
    );
    return data;
};

// get random movies Function
export const getRandomMoviesService = async () => {
    const {data} = await Axios.get(`/movies/random/all`)
    return data;
};

// get movie by id Function
export const getMovieByIdService = async (id: number) => {
    const {data} = await Axios.get(`/movies/${id}`);
    return data;
};

// get top rated movie Function
export const getTopRatedMovieService = async () => {
    const {data} = await Axios.get(`/movies/rated/top`);
    return data;
};

// review movie Function
export const reviewMovieService = async (token: any, id: any, review: any) => {
    const {data} = await Axios.post(`/movies/${id}/reviews`, review, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// delete movie Function
export const deleteMovieService = async (token: any, id: number) => {
    const {data} = await Axios.delete(`/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// delete all movies function
export const deleteAllMoviesService = async (token: string) => {
    const {data} = await Axios.delete(`/movies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// create movie Function
export const createMovieService = async (token: string, movie: any) => {
    const {data} = await Axios.post(`/movies`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// update movie Function
export const updateMovieService = async (token: any, id: number, movie: any) => {
    const {data} = await Axios.put(`/movies/${id}`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};