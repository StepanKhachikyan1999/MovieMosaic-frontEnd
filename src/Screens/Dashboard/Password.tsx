import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { InlineError } from "../../components/Notfications/Error";
import { Input } from "../../components/UsedInputs";
import { PasswordValidation } from "../../components/Validation/UserValidation";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import SideBar from "./SideBar";
import { useTranslation } from 'react-i18next';

function Password() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {isLoading, isError, message, isSuccess} = useSelector(
        (state: any) => state.userchangepassword
    )

    // validate user
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(PasswordValidation),
    })

    // on submit
    const onSubmit = (data: any) => {
        dispatch(changePasswordAction(data) as any);
    };

    // useEffect
    useEffect(() => {
        if (isSuccess) {
            dispatch({type: "USER_CHANGE_PASSWORD_RESET"});
        }
        if (isError) {
            toast.error(isError);
            dispatch({type: "USER_CHANGE_PASSWORD_RESET"});
        }
        if (message) {
            toast.success(message);
            reset();
        }
    }, [isSuccess, isError, message, reset, dispatch]);

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">{t('changePassword')}</h2>
                <div className="w-full">
                    <Input
                        label={t('previousPassword')}
                        placeholder="********"
                        type="password"
                        bg={true}
                        name="oldPassword"
                        register={register("oldPassword")}
                    />
                    {errors.oldPassword && (
                        <InlineError text={t(`yup.${errors.oldPassword.message}`)} />
                    )}
                </div>
                <div className="w-full">
                    <Input
                        label={t('newPassword')}
                        placeholder="********"
                        type="password"
                        bg={true}
                        name="newPassword"
                        register={register("newPassword")}
                    />
                    {errors.newPassword && (
                        <InlineError text={t(`yup.${errors.newPassword.message}`)} />
                    )}
                </div>
                <div className="w-full">
                    <Input
                        label={t('confirmPassword')}
                        placeholder="********"
                        type="password"
                        bg={true}
                        name="confirmPassword"
                        register={register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <InlineError text={t(`yup.${errors.confirmPassword.message}`)} />
                    )}
                </div>

                <div className="flex justify-end items-center my-4">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        {isLoading ? t('updating') : t('changePassword')}
                    </button>
                </div>
            </form>
        </SideBar>
    );
}

export default Password


// new