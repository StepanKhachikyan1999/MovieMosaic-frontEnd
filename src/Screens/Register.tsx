import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/UsedInputs'
import Layout from '../Layout/Layout'
import { FiLogIn } from "react-icons/fi";
import { InlineError } from "../components/Notfications/Error";
import toast from "react-hot-toast";
import { registerAction } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'

function Register() {const { t } = useTranslation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, isError, userInfo, isSuccess} = useSelector(
        // @ts-ignore
        (state) => state.userRegister
    );

    // validate user
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(RegisterValidation),
    });

    // on submit
    const onSubmit = (data: any) => {
        // @ts-ignore
        dispatch(registerAction(data));
    };

    // useEffect
    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/dashboard");
        } else if (userInfo) {
            navigate("/profile");
        }
        if (isSuccess) {
            toast.success(`Welcome ${userInfo?.fullName}`);
            dispatch({type: "USER_REGISTER_RESET"});
        }
        if (isError) {
            toast.error(isError);
            dispatch({type: "USER_REGISTER_RESET"});
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);
    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-colo">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
                >
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
                            label={t('email')}
                            placeholder={t('email')}
                            type="email"
                            name="email"
                            register={register("email")}
                            bg={true}
                        />
                        {errors.email && <InlineError text={errors.email.message}/>}
                    </div>
                    <div className="w-full">
                        <Input
                            label={t("password")}
                            placeholder={t("password")}
                            type="password"
                            bg={true}
                            name="password"
                            register={register("password")}
                        />
                        {errors.password && <InlineError text={errors.password.message}/>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
                    >
                        {
                            // if loading show loading
                            isLoading ? (
                                "Loading..."
                            ) : (
                                <>
                                    <FiLogIn/> {t('signUp')}
                                </>
                            )
                        }
                    </button>
                    <p className="text-center text-border">
                        {t('alreadyHaveAnAccount')}{" "}
                        <Link to="/login" className="text-dryGray font-semibold ml-2">
                            {t('signIn')}
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
}

export default Register;


// new