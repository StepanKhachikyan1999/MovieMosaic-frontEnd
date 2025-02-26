import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Imagepreview } from "../../components/Imagepreview";
import { InlineError } from "../../components/Notfications/Error";
import Uploder from "../../components/Uploder";
import { Input } from "../../components/UsedInputs";
import { ProfileValidation } from "../../components/Validation/UserValidation";
import { deleteProfileAction, updateProfileAction } from "../../Redux/Actions/userActions";
import SideBar from "./SideBar";
import { useTranslation } from 'react-i18next'

function Profile() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // @ts-ignore
    const {userInfo} = useSelector((state) => state.userLogin);
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
    const {isLoading, isError, isSuccess} = useSelector(
        // @ts-ignore
        (state) => state.userUpdateProfile
    );
    const {isLoading: deleteLoading, isError: deleteError} = useSelector(
        // @ts-ignore
        (state) => state.userDeleteProfile
    );
    // validate user
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(ProfileValidation),
    });

    // update profile
    const onSubmit = (data: any) => {
        // @ts-ignore
        dispatch(updateProfileAction({...data, image: imageUrl}));
    };

    // delete profile
    const deleteProfile = () => {
        window.confirm("Are you sure you want to delete your profile?") &&
        // @ts-ignore
        dispatch(deleteProfileAction());
    };

    // useEffect
    useEffect(() => {
        if (userInfo) {
            setValue("fullName", userInfo?.fullName);
            setValue("email", userInfo?.email);
        }
        if (isSuccess) {
            dispatch({type: "USER_UPDATE_PROFILE_RESET"});
        }
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({type: "USER_UPDATE_PROFILE_RESET"});
            dispatch({type: "USER_DELETE_PROFILE_RESET"});
        }
    }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">{t("profile")}</h2>
                <div className="w-full grid lg:grid-cols-12 gap-6">
                    <div className="col-span-10">
                        {/*@ts-ignore*/}
                        <Uploder setImageUrl={setImageUrl}/>
                    </div>
                    {/* image preview */}
                    <div className="col-span-2">
                        <Imagepreview
                            image={imageUrl}
                            name={userInfo ? userInfo.fullName : "NewMoviess React Tailwind"}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <Input
                        label={t("fullName")}
                        placeholder={t("fullName")}
                        type="text"
                        bg={true}
                        name="fullName"
                        register={register("fullName")}
                    />
                    {errors.fullName && <InlineError text={errors.fullName.message}/>}
                </div>
                <div className="w-full">
                    <Input
                        label={t("email")}
                        placeholder="example@gmail.com"
                        type="email"
                        name="email"
                        register={register("email")}
                        bg={true}
                    />
                    {errors.email && <InlineError text={errors.email.message}/>}
                </div>
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                    <button
                        onClick={deleteProfile}
                        disabled={deleteLoading || isLoading}
                        className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        {deleteLoading ? t('deleting') : t('deleteAccount')}
                    </button>
                    <button
                        disabled={deleteLoading || isLoading}
                        className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        {isLoading ? t('updating') : t('updateProfile')}
                    </button>
                </div>
            </form>
        </SideBar>
    );
}

export default Profile;

// new