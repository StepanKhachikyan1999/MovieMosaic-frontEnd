import * as yup from 'yup'

interface LoginValues {
    email: string;
    password: string;
}

interface RegisterValues extends LoginValues {
    fullName: string;
}

interface ProfileValues {
    fullName: string;
    email: string;
}

interface PasswordValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// login validation
const LoginValidation = yup.object().shape<LoginValues | any>({
    email: yup.string().email().required("Email is required").trim(),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

// register validation
const RegisterValidation = yup.object().shape<RegisterValues | any>({
    email: yup.string().email().required("Email is required").trim(),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    fullName: yup
        .string()
        .required("Full name is required")
        .max(20, "Full name must be less than 20 characters")
        .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters"),
});

const ProfileValidation = yup.object().shape<ProfileValues | any>({
    fullName: yup
        .string()
        .required("Full name is required")
        .max(20, "Full name must be less than 20 characters")
        .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters"),
    email: yup.string().email().required("Email is required").trim(),
});

const PasswordValidation = yup.object().shape<PasswordValues | any>({
    oldPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    confirmPassword: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
        .oneOf([yup.ref("newPassword"), null] as any, "Passwords must match"),
});

export {
    LoginValidation,
    RegisterValidation,
    ProfileValidation,
    PasswordValidation,
}

// new
