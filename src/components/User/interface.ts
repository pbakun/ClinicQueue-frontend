
export interface User {
    username: string;
    email: string;
    lastName: string;
    firstName: string;
}

export interface PasswordChange {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}