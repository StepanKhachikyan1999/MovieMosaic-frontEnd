import React, {useEffect, useState} from "react";
import Uploder from "../../../components/Uploder";
import {Input, Message, Select} from "../../../components/UsedInputs";
import SideBar from "../SideBar";
import {MdDelete} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {ImUpload} from "react-icons/im";
import CastsModal from "../../../components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../components/Validation/MovieValidation";
import { createMovieAction, removeCastAction } from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../../../components/Notfications/Error";
import { Imagepreview } from "../../../components/Imagepreview";

import userImage from '../../../images/user.png'

function AddMovie() {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // use Selectors
    // @ts-ignore
    const {categories} = useSelector((state) => state.categoryGetAll)
    const {isLoading, isError, isSuccess} = useSelector(
        // @ts-ignore
        (state) => state.createMovie
    )
    // @ts-ignore
    const {casts} = useSelector((state) => state.casts);

    // validate movie
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(movieValidation),
    });

    // on submit
    const onSubmit = (data: any) => {
        dispatch(
            // @ts-ignore
            createMovieAction({
                ...data,
                image: imageWithoutTitle,
                titleImage: imageTitle,
                video: videoUrl,
                casts,
            })
        );
    };

    // delete cast handler
    const deleteCastHandler = (id: number) => {
        // @ts-ignore
        dispatch(removeCastAction(id));
        toast.success("Cast deleted successfully");
    };

    useEffect(() => {
        // if modal is false then reset cast
        if (modalOpen === false) {
            // @ts-ignore
            setCast();
        }
        // if its success then reset form and navigate to addMovie
        if (isSuccess) {
            reset({
                name: "",
                time: 0,
                language: "",
                year: 0,
                category: "",
                desc: "",
            });
            setImageTitle("");
            setImageWithoutTitle("");
            setVideoUrl("");
            dispatch({type: "CREATE_MOVIE_RESET"});
            navigate("/addMovie");
        }
        // if error then show error
        if (isError) {
            toast.error("Something went wrong");
            dispatch({type: "CREATE_MOVIE_RESET"});
        }
    }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

    return (
        <SideBar>
            <CastsModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                cast={cast}
            />
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Create Movie</h2>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <Input
                            label="Movie Title"
                            placeholder="Game of Thrones"
                            type="text"
                            bg={true}
                            name="name"
                            register={register("name")}
                        />
                        {errors.name && <InlineError text={errors.name.message}/>}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Hours"
                            placeholder="2hr"
                            type="number"
                            bg={true}
                            name="time"
                            register={register("time")}
                        />
                        {errors.time && <InlineError text={errors.time.message}/>}
                    </div>
                </div>

                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <Input
                            label="Language Used"
                            placeholder="English"
                            type="text"
                            bg={true}
                            name="language"
                            register={register("language")}
                        />
                        {errors.language && <InlineError text={errors.language.message}/>}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Year of Release"
                            placeholder="2022"
                            type="number"
                            bg={true}
                            name="year"
                            register={register("year")}
                        />
                        {errors.year && <InlineError text={errors.year.message}/>}
                    </div>
                </div>

                {/* IMAGES */}
                <div className="w-full grid md:grid-cols-2 gap-6">
                    {/* img without title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Image without Title
                        </p>
                        <Uploder setImageUrl={setImageWithoutTitle}/>
                        <Imagepreview image={imageWithoutTitle} name="imageWithouTitle"/>
                    </div>
                    {/* image with title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Image with Title
                        </p>
                        <Uploder setImageUrl={setImageTitle}/>
                        <Imagepreview image={imageTitle} name="imageTitle"/>
                    </div>
                </div>
                {/* DESCRIPTION */}
                <div className="w-full">
                    <Message
                        label="Movie Description"
                        placeholder="Make it short and sweet"
                        name="desc"
                        register={{...register("desc")}}
                    />
                    {errors.desc && <InlineError text={errors.desc.message}/>}
                </div>
                {/* CATEGORY */}

                <div className="text-sm w-full">
                    <Select
                        label="Movie Category"
                        options={categories?.length > 0 ? categories : []}
                        name="category"
                        register={{...register("category")}}
                    />
                    {errors.category && <InlineError text={errors.category.message}/>}
                </div>
                {/* MOVIE VIDEO */}

                <div className="flex flex-col gap-2 w-full ">
                    <label className="text-border font-semibold text-sm">
                        Movie Video
                    </label>
                    <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
                        {videoUrl && (
                            <div
                                className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                                Video Uploaded!!!
                            </div>
                        )}
                        <Uploder setImageUrl={setVideoUrl}/>
                    </div>
                </div>
                {/* CASTS */}
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start ">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
                    >
                        Add Cast
                    </button>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {casts?.length > 0 &&
                            casts?.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                                >
                                    <img
                                        src={`${user?.image ? user.image : userImage}`}
                                        alt={user.name}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <p>{user.name}</p>
                                    <div className="flex-rows mt-2 w-full gap-2">
                                        <button
                                            onClick={() => deleteCastHandler(user?.id)}
                                            className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded"
                                        >
                                            <MdDelete/>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCast(user);
                                                setModalOpen(true);
                                            }}
                                            className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded"
                                        >
                                            <FaEdit/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {/* SUBMIT */}
                <button
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
                >
                    {isLoading ? (
                        "Please wait..."
                    ) : (
                        <>
                            <ImUpload/> Publish Movie
                        </>
                    )}
                </button>
            </div>
        </SideBar>
    );
}

export default AddMovie

// new