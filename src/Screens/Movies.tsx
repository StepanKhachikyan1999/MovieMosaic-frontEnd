import React, { useEffect, useMemo, useState } from "react";
import Filters from "../components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import { LanguageData, RatesData, TimesData, YearData } from "../Data/FilterData";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function MoviesPage() {
    const { search } = useParams();
    const dispatch = useDispatch();
    const [category, setCategory] = useState({title: "allCategories"});
    const [year, setYear] = useState(YearData[0]);
    const [times, setTimes] = useState(TimesData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const [language, setLanguage] = useState(LanguageData[0]);
    const sameClass =
        "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
    // all movies
    const {isLoading, isError, movies, pages, page} = useSelector(
        // @ts-ignore
        (state) => state.getAllMovies
    );
    // get all categories
    // @ts-ignore
    const { categories } = useSelector((state) => state.categoryGetAll);
    const { t } = useTranslation();

    // queries
    const queries = useMemo(() => {
        const query = {
            category: category?.title === "allCategories" ? "" : category?.title,
            time: times?.title.replace(/\D/g, ""),
            language: language?.title === "sortByLanguage" ? "" : language?.title,
            rate: rates?.title.replace(/\D/g, ""),
            year: year?.title.replace(/\D/g, ""),
            search: search ? search : "",
            type: type || ""
        };
        return query;
    }, [category, times, language, rates, year, search, type]);

    // useEffect
    useEffect(() => {
        // errors
        if (isError) {
            toast.error(isError);
        }
        // get all movies
        // @ts-ignore
        dispatch(getAllMoviesAction(queries));
    }, [dispatch, isError, queries]);

    // pagination next and pev pages
    const nextPage = () => {
        dispatch(
            // @ts-ignore
            getAllMoviesAction({
                ...queries,
                pageNumber: page + 1,
            })
        );
    };
    const prevPage = () => {
        dispatch(
            // @ts-ignore
            getAllMoviesAction({
                ...queries,
                // @ts-ignore
                pageNumber: page - 1,
            })
        );
    };

    const datas = {
        categories: categories,
        category: category,
        setCategory: setCategory,
        language: language,
        setLanguage: setLanguage,
        rates: rates,
        setRates: setRates,
        times: times,
        setTimes: setTimes,
        year: year,
        setYear: setYear,
    };

    return (
        <Layout>
            <div className="min-height-screen container mx-auto px-2 my-6">
                <Filters data={datas}/>
                <p className="text-lg font-medium my-6">
                    {t('total')}{" "}
                    <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
                    {t('itemsFound')} {search && `for "${search}"`}
                </p>
                {isLoading ? (
                    <div className="w-full gap-6 flex-colo min-h-screen">
                        <Loader/>
                    </div>
                ) : movies?.length > 0 ? (
                    <>
                        <div
                            className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {movies.map((movie: any, index: any) => (
                                <Movie key={index} movie={movie}/>
                            ))}
                        </div>
                        {/* Loading More */}
                        <div className="w-full flex-rows gap-6 md:my-20 my-10">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={sameClass}
                            >
                                <TbPlayerTrackPrev className="text-xl"/>
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={page === pages}
                                className={sameClass}
                            >
                                <TbPlayerTrackNext className="text-xl"/>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="w-full gap-6 flex-colo min-h-screen">
                        <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
                            <RiMovie2Line/>
                        </div>
                        <p className="text-border text-sm">
                            {t('dontHaveAnyMovie')}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default MoviesPage


// new