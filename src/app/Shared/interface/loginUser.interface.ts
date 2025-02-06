export interface LoginUser{
    user_id: string,
    token: string,
    name: string,
    email: string,
    phone: string,
    otp_is_verified: boolean,
    address: null | string,
    status: string
}