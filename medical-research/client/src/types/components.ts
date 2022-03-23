export interface LoginFormValues {
    email: string;
    password: string;
    //rememberMe: boolean,
}

export interface SignupFormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface NewUserDataValues {
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface EditUserInfoFormValues {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | null | undefined;
    phoneNumber: string | null | undefined;
    userAvatar: string | null | undefined;
    // oldPassword: string;
    // newPassword: string;
    // confirmNewPassword: string;
}

interface userAvatar {
    id: string;
    fileName: string;
    data: string | null | undefined;
}

export interface EditedUserInfoValues {
    userName: string;
    email: string | null | undefined;
    phoneNumber: string | null | undefined;
    images: userAvatar[];
    // newPassword: string;
    // confirmNewPassword: string;
}

export interface AddMedicineFormValues {
    type: string;
    dosageForm: string;
    container: string;
    state: string;
    expirationDate: string;
    description: string;
}
