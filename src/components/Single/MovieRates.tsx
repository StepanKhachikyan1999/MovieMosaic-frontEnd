import React, {useEffect} from 'react'
import Titles from '../Titles'
import {BsBookmarkStarFill} from 'react-icons/bs'
import {Message, Select} from '../UsedInputs'
import Rating from '../Stars'
import {Empty} from '../Notfications/Empty'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ReviewValidation} from "../Validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../Notfications/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction } from '../../Redux/Actions/MoviesActions'
import { useTranslation } from 'react-i18next'

function MovieRates({movie}: any) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    // use Selector
    // @ts-ignore
    const {isLoading, isError} = useSelector((state) => state.createReview)
    // @ts-ignore
    const {userInfo} = useSelector((state) => state.userLogin);
    const lang = localStorage.getItem('language')

    // validate review
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(ReviewValidation),
    });

    // on submit
    const onSubmit = (data: any) => {
        dispatch(
            // @ts-ignore
            reviewMovieAction({
                id: movie?._id,
                review: data,
            })
        );
    };

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch({type: "CREATE_REVIEW_RESET"});
        }
    }, [isError, dispatch]);

    const Ratings = [
        {
            title: `0 - ${t('Ratings.poor')}`,
            value: 0,
        },
        {
            title:  `1 - ${t('Ratings.fair')}`,
            value: 1,
        },
        {
            title:  `2 - ${t('Ratings.good')}`,
            value: 2,
        },
        {
            title:  `3 - ${t('Ratings.veryGood')}`,
            value: 3,
        },
        {
            title:  `4 - ${t('Ratings.excellent')}`,
            value: 4,
        },
        {
            title:  `5 - ${t('Ratings.masterpiece')}`,
            value: 5,
        },
    ];

    return (
        <div className="my-12">
            <Titles title={t('review')} Icon={BsBookmarkStarFill}/>
            <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
                {/* write review */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="xl:col-span-2 w-full flex flex-col gap-8"
                >
                    <h3 className="text-xl text-text font-semibold">
                        {t('review')}:  {movie && movie[`name_${lang}`]}
                    </h3>
                    <p className="text-sm leading-7 font-medium text-border">
                        {t('reviewForThisMovie')}
                    </p>
                    <div className="text-sm w-full">
                        <Select
                            label={t('selectRating')}
                            options={Ratings}
                            name="rating"
                            register={{...register("rating")}}
                        />
                        <div className="flex mt-4 text-lg gap-2 text-star">
                            {/*@ts-ignore*/}
                            <Rating value={watch("rating", false)}/>
                        </div>
                        {errors.rating && <InlineError text={errors.rating.message}/>}
                    </div>
                    {/* message */}
                    <div className="w-full">
                        <Message
                            name="comment"
                            register={{...register("comment")}}
                            label={t('message')}
                            placeholder={`${t('message')} ......`}
                        />
                        {errors.comment && <InlineError text={errors.comment.message}/>}
                    </div>

                    {/* submit */}
                    {userInfo ? (
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-subMain text-white py-4 w-full flex-colo rounded"
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-main border border-dashed border-border text-subMain py-4 w-full flex-colo rounded"
                        >
                            {t('loginToReviewThisMovie')}
                        </Link>
                    )}
                </form>
                {/* REVIWERS */}
                <div className="col-span-3 flex w-full flex-col gap-6">
                    <h3 className="text-xl text-text font-semibold">
                        {t('review')} ({movie?.numberOfReviews})
                    </h3>
                    <div
                        className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
                        {movie?.reviews?.length > 0 ? (
                            movie?.reviews?.map((review: any) => (
                                <div
                                    key={review?._id}
                                    className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                                >
                                    <div className="col-span-2 bg-main hidden md:block">
                                        {review?.userImage ? (
                                            <img
                                                src={review.userImage}
                                                alt={review?.userName}
                                                className="w-full h-24 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <span className="w-full h-24 rounded-lg bg-gray-200 flex items-center justify-center text-lg font-semibold text-black">
                                          {review?.userName?.substring(0, 1).toUpperCase()}
                                        </span>
                                        )}
                                    </div>
                                    <div className="col-span-7 flex flex-col gap-2">
                                        <h2>{review?.userName}</h2>
                                        <p className="text-xs leading-6 font-medium text-text">
                                            {review?.comment}
                                        </p>
                                    </div>
                                    {/* rates */}
                                    <div
                                        className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                                        <Rating value={review?.rating}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Empty message={`Be first to rate "${movie?.name}"`}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieRates

// new