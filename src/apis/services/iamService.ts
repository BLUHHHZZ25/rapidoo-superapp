import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import Config from 'react-native-config';
// import { ACTIVITY_BASE_URL, ADMIN_BASE_URL, IAM_BASE_URL, WALLET_BASE_URL } from '../Config'
import { ACTIVITY_BASE_URL, ADMIN_BASE_URL, IAM_BASE_URL, WALLET_BASE_URL } from '../../Config';
// import { ACTIVITIES, ACTIVITY_BASE_URL, ADMIN_BASE_URL, CASH_IN, CASH_IN_PAYMENT, FORGOT_PASS_UPDATE, FORGOT_PASS_VERIFY, GET_APPUPDATES, IAM_BASE_URL, OTP_VERIFY_RESEND, OTP_VERIFY_URL, PAYMENT_OPTIONS, POST_APPUPDATES, PROFILE_UPDATE, RATING, REFRESH_TOKEN, RUNNING_CHECK, SEND_OTP_FORGOT_PASS, SERVICES, SIGN_UP_RIDER_OTP, SIGNIN_CUSTOMER_PASSWORD, SIGNUP_CREATE_ACCOUNT, WALLET_ACCOUNT, WALLET_BASE_URL } from '../Config';
import { ListItemInput } from '@rneui/base/dist/ListItem/ListItem.Input';
import { ACTIVITIES_ENDPOINTS, ADMIN_ENDPOINTS, IAM_ENDPOINTS, WALLET_ENDPOINTS } from '../../app/constants/endpoints';
import { handleApiError } from '../utils/handleApiError';
import clientIAM from '../client/clientIAM';

export async function FetchData() {
    const data = await clientIAM.get(`http://10.0.2.2:9000/v1/user/report_issues`)
    return data
}


export async function SendOTPRequest( register_number: string, uuid: string | any ) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.SIGNUP_CUSTOMER,
            {
                "phone_number": register_number,
                "start": "2024-07-3 06:00:00"
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error);
        throw new Error(errorMessage)
    }
}

export async function OTPEntryRequest( 
    register_number: string,
    otp: string,
    uuid: string
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.OTP_VERIFY,
            {
                "phone_number": register_number,
                "otp": otp
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

export async function ResendOTPRequest(register_number: string) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.RESEND_OTP,
            {
                "phone_number": register_number,
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

export async function SignUpRequest(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirm_password: string,
    referral_code: string,
    pns_token: string,
    city: string,
    gender: string,
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.ACCOUNT_UPDATE,
            {
                "first_name": firstname,
                "last_name": lastname,
                "email": email,
                "password": password,
                "confirm_password": confirm_password,
                "referral_code": referral_code,
                "pns_token": pns_token,
                "city": city,
                "gender": gender,
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}
export async function SignInRequest(
    email: string,
    password: string,
    pns_token: string | undefined
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.PASSWORD_CUSTOMER,
            {
                "email": email,
                "password": password,
                "pns_token": pns_token
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}
export async function SignInEmailRequest(
    idToken: string | null,
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.EMAIL_CUSTOMER,
            {
                "idToken": idToken
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}


// FORGOT PASSWORD

export async function SendOTPForgotPass(
    phone_number: string,
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP,
            {
                "phone_number": phone_number,
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

export async function ForgotPassVerify(
    phone_number: string,
    otp: string,
    token: string
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP_VERIFY,
            {
                "phone_number": phone_number,
                "otp": otp,
                "token": token
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

export async function ForgotPassUpdate(
    phone_number: string,
    token: string,
    password: string
) {
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP_UPDATE,
            {
                "phone_number": phone_number,
                "token": token,
                "password": password
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

export async function ProfileUpdate(
    profile_pic: string,
    firstname: string,
    lastname: string,
    display_name: string,
    email: string,
    city: string,
    gender: string,
) {
    const formData = new FormData()
    formData.append('profile_pic', profile_pic)
    formData.append('first_name', firstname)
    formData.append('last_name', lastname)
    formData.append('display_name', display_name)
    formData.append('email', email)
    formData.append('city', city)
    formData.append('gender', gender)
    try {
        const data = await clientIAM.post(
            IAM_BASE_URL + IAM_ENDPOINTS.ACCOUNT_UPDATE_RIDER,
            formData,
            {
                headers:
                {
                    'z-app': Config.z_app,
                    'Content-Type': 'multipart/form-data',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET
                }
            }
        )
        return data.data
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}

// TODO: GET STATUS OF TOKEN 
export async function RefreshRequest() {
    try {
        const data = await clientIAM.get(IAM_BASE_URL + IAM_ENDPOINTS.TOKEN_REFRESH)

        return data.data;
    } catch (error: any) {
        const errorMessage = handleApiError(error)
        throw new Error(errorMessage)
    }
}