import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import Config from 'react-native-config';
import { ACTIVITY_BASE_URL, ADMIN_BASE_URL, IAM_BASE_URL, WALLET_BASE_URL } from '../Config';
// import { ACTIVITIES, ACTIVITY_BASE_URL, ADMIN_BASE_URL, CASH_IN, CASH_IN_PAYMENT, FORGOT_PASS_UPDATE, FORGOT_PASS_VERIFY, GET_APPUPDATES, IAM_BASE_URL, OTP_VERIFY_RESEND, OTP_VERIFY_URL, PAYMENT_OPTIONS, POST_APPUPDATES, PROFILE_UPDATE, RATING, REFRESH_TOKEN, RUNNING_CHECK, SEND_OTP_FORGOT_PASS, SERVICES, SIGN_UP_RIDER_OTP, SIGNIN_CUSTOMER_PASSWORD, SIGNUP_CREATE_ACCOUNT, WALLET_ACCOUNT, WALLET_BASE_URL } from '../Config';
import { ListItemInput } from '@rneui/base/dist/ListItem/ListItem.Input';
import { ACTIVITIES_ENDPOINTS, ADMIN_ENDPOINTS, IAM_ENDPOINTS, WALLET_ENDPOINTS } from '../app/constants/endpoints';

export async function FetchData() {
    const data = await axios.get(`http://10.0.2.2:9000/v1/user/report_issues`)
    return data
}


export async function SendOTPRequest({
    register_number,
    uuid
}: {
    register_number: string,
    uuid: string | any
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.SIGNUP_CUSTOMER,
            {
                "phone_number": register_number,
                "start": "2024-07-3 06:00:00"
            },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                    "uuid": uuid
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function OTPEntryRequest({
    register_number,
    otp,
    uuid
}: {
    register_number: string,
    otp: string,
    uuid: string
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.OTP_VERIFY,
            {
                "phone_number": register_number,
                "otp": otp
            },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': uuid
                }
            }
        )
        console.log("data -------- ", data);
        
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function ResendOTPRequest({
    register_number,
}: {
    register_number: string,
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.RESEND_OTP,
            {
                "phone_number": register_number,
            },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                    'uuid': "asdf-sdfasd-sdf3d-ee"
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function SignUpRequest({
    firstname,
    lastname,
    email,
    password,
    confirm_password,
    referral_code,
    pns_token,
    city,
    gender,
    uuid,
    bearer_token
}: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirm_password: string,
    referral_code: string,
    pns_token: string,
    city: string,
    gender: string,
    uuid: string,
    bearer_token: string
}) {
    try {
        const data = await axios.post(
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
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'Content-Type': 'application/json',
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': uuid
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}
export async function SignInRequest({
    email,
    password,
    pns_token
}: {
    email: string,
    password: string,
    pns_token: string | undefined
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.PASSWORD_CUSTOMER,
            {
                "email": email,
                "password": password,
                "pns_token": pns_token
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.status
        // if (error.response) {
        //     return error.response.status
        //     // if (error.response.status == '401') {
        //     //     return "401"
        //     // } else if (error.response.status == '400')
        //     //     return "400"
        // }
        // return console.log(error)
    }
}
export async function SignInEmailRequest({
    idToken
}: {
    idToken: string | null,
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.EMAIL_CUSTOMER,
            {
                "idToken": idToken
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.status
    }
}

// TODO: GET SERVICES
export async function Services() {
    try {
        const data = await axios.get(ADMIN_BASE_URL + ADMIN_ENDPOINTS.SERVICES)
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}


// TODO: GET APPUPDATES
export async function GetAppUpdates({
    phone_number
}: {
    phone_number: string
}) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.APP_UPDATES, {
            "phone_number": phone_number
        })
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: POST APPUDPATES
export async function PostAppUpdates({
    phone_number,
    app_services,
    app_merchants,
    app_sku_foods
}: {
    phone_number: string,
    app_services: string,
    app_merchants: string,
    app_sku_foods: string
}) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.APP_UPDATES_CREATE, {
            "phone_number": phone_number,
            "app_services": app_services,
            "app_merchants": app_merchants,
            "app_sku_foods": app_sku_foods
        })
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// FORGOT PASSWORD

export async function SendOTPForgotPass({
    phone_number,
}: {
    phone_number: string,
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP,
            {
                "phone_number": phone_number,
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function ForgotPassVerify({
    phone_number,
    otp,
    token
}: {
    phone_number: string,
    otp: string,
    token: string
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP_VERIFY,
            {
                "phone_number": phone_number,
                "otp": otp,
                "token": token
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function ForgotPassUpdate({
    phone_number,
    token,
    password
}: {
    phone_number: string,
    token: string,
    password: string
}) {
    try {
        const data = await axios.post(
            IAM_BASE_URL + IAM_ENDPOINTS.FORGOT_PASSWORD_OTP_UPDATE,
            {
                "phone_number": phone_number,
                "token": token,
                "password": password
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'z-app-key': Config.SIGN_APP_KEY,
                    'z-app-secret': Config.SIGN_APP_SECRET,
                }
            }
        )
        return data.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function ProfileUpdate({
    profile_pic,
    firstname,
    lastname,
    display_name,
    email,
    city,
    gender,
}: {
    profile_pic: string
    firstname: string,
    lastname: string,
    display_name: string,
    email: string,
    city: string,
    gender: string,
}) {
    const formData = new FormData()
    formData.append('profile_pic', profile_pic)
    formData.append('first_name', firstname)
    formData.append('last_name', lastname)
    formData.append('display_name', display_name)
    formData.append('email', email)
    formData.append('city', city)
    formData.append('gender', gender)
    try {
        const data = await axios.post(
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
        return error.response
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400') {
                return "400"
            } else if (error.response.status == '404') {
                return "404"
            }
        }
        return "500"
    }
}

export async function ActivitiesStatus({
    option,
    bearer_token,
    limit,
    action,
    // app_status
}: {
    option: string,
    bearer_token: string,
    limit: number,
    action: string
    // app_status: string
}) {
    try {
        const data = await axios.post(
            ACTIVITY_BASE_URL + ACTIVITIES_ENDPOINTS.ACTIVITIES,
            {
                "option": option,
                "limit": limit,
                "action": action
                // "service_key": 'parcel'
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': "asfsdaf-asdfas-asdfadsf"
                }
            }
        )
        return data.data
    } catch (error: any) {
        console.log("Error occured ", error)
        return error.code
        // if (error.response) {
        //     if (error.response.status == '401') {
        //         return "401"
        //     } else if (error.response.status == '400')
        //         return "400"
        // }
        // return console.log(error)
    }
}

export async function GetPaymentOptions() {
    try {
        const data = await axios.post(
            ADMIN_BASE_URL + ADMIN_ENDPOINTS.PAYMENT_OPTIONS,
            {
                "is_active": 1
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.status
    }
}

export async function WalletAccount({
    username,
    bearer_token
}: {
    username: string,
    bearer_token: string
}) {
    try {
        const data = await axios.post(
            WALLET_BASE_URL + WALLET_ENDPOINTS.WALLET_ACCOUNT,
            {
                "username": username
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': "asfsdaf-asdfas-asdfadsf"
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.status
    }
}

export async function CashInRequest({
    amount,
    option,
    bearer_token,
    type
}: {
    amount: number,
    option: string,
    bearer_token: string,
    type:string
}) {
    try {
        const data = await axios.post(
            WALLET_BASE_URL + WALLET_ENDPOINTS.WALLET_CASHIN,
            {
                "amount": amount,
                "option": option,
                "type": type
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': "asfsdaf-asdfas-asdfadsf"
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.status
    }
}

export async function CashInPaymentRequest({
    refernce_id,
    payment_reference_id,
    redirect_uri,
    code,
    bearer_token
}: {
    refernce_id: string,
    payment_reference_id: string,
    redirect_uri: string,
    code: string | (string | null ) [] | null,
    bearer_token: string
}) {
    try {
        const data = await axios.post(
            WALLET_BASE_URL + WALLET_ENDPOINTS.CASHIN_PAYMENT,
            {
                "refernce_id": refernce_id,
                "payment_reference_id": payment_reference_id,
                "redirect_uri": redirect_uri,
                "code": code
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': "asfsdaf-asdfas-asdfadsdfs"
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.data
    }
}

export async function RatingRequest({
    rider_username,
    rider_account_id,
    reference_id,
    rating,
    comment,
    bearer_token
}: {
    rider_username: string,
    rider_account_id: string,
    reference_id: string,
    rating: number,
    comment: string,
    bearer_token: string
}) {
    try {
        const data = await axios.post(
            ADMIN_BASE_URL + ADMIN_ENDPOINTS.RATING_CREATE,
            {
                "rider_username": rider_username,
                "rider_account_id": rider_account_id,
                "reference_id": reference_id,
                "rating": rating,
                "comment": comment
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'uuid': "asfsdaf-asdfas-asdfadsdfs"
                }
            }
        )
        return data.data
    } catch (error: any) {
        return error.response.data
    }
}

// TODO: GET STATUS OF TOKEN 
export async function RUNNING({ bearer_token }: { bearer_token: any }) {
    try {
        const data = await axios.get(ADMIN_BASE_URL + ADMIN_ENDPOINTS.RUNNING, {
            headers:
            {
                'Authorization': `Bearer ${bearer_token}`,
                'z-app': 'rapidoo-superapp',
                'z-app-type': Config.z_app_type,
                'z-app-version': Config.z_app_version,
                'z-app-code': Config.z_app_code,
                'uuid': "asfsdaf-asdfas-asdfadsf"
            }
        })
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: GET STATUS OF TOKEN 
export async function RefreshRequest({ bearer_token }: { bearer_token: any }) {
    try {
        const data = await axios.get(IAM_BASE_URL + IAM_ENDPOINTS.TOKEN_REFRESH, {
            headers:
            {
                'Authorization': `Bearer ${bearer_token}`,
                'z-app': 'rapidoo-superapp',
                'z-app-type': Config.z_app_type,
                'z-app-version': Config.z_app_version,
                'z-app-code': Config.z_app_code,
                'uuid': "0cc6ec08-e7bb-4dc0-af79-e86904c96420"
            }
        })
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: GET COUPONS LIST 
export async function GetCoupons({ bearer_token, coupon_code }: { bearer_token: any, coupon_code: any | null }) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.GET_COUPONS,{
            coupon_code: coupon_code
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'x-app-key': Config.SIGN_APP_KEY,
                    'x-app-secret': Config.SIGN_APP_SECRET,
                    "uuid": "sdf-asdfsdf-fdfdf-vvc"
                }
            }
        )
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: APPLY COUPONS 
export async function ApplyCoupons({ coupon_id, app_transaction_id, username, account_id, app_service_id }:
     { coupon_id: any, app_transaction_id:any, username:any, account_id: any, app_service_id:any }) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.APPLY_COUPONS,
            {
                'coupon_id': coupon_id,
                'app_transaction_id': app_transaction_id,
                'username': username,
                'account_id': account_id,
                'app_service_id': app_service_id
            },
            {
                headers:
                {
                    // 'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'x-app-key': Config.SIGN_APP_KEY,
                    'x-app-secret': Config.SIGN_APP_SECRET,
                    "uuid": "sdf-asdfsdf-fdfdf-vvc"
                }
            }
        )
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: APPLY COUPONS 
export async function CheckCoupons({ coupon_id }:
     { coupon_id: any }) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.CHECK_COUPONS,
            {
                'coupon_id': coupon_id,
            },
            {
                headers:
                {
                    'z-app': 'rapidoo-superapp',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'x-app-key': Config.SIGN_APP_KEY,
                    'x-app-secret': Config.SIGN_APP_SECRET,
                    "uuid": "sdf-asdfsdf-fdfdf-vvc"
                }
            }
        )
        return data.data;
    } catch (error: any) {
        return error.response.data
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: ACTIVITY APP_TRANSACTION_ID
export async function ActivityTransactionID({ option, app_transaction_id, limit, bearer_token }:
     { option: any, app_transaction_id:any, limit:any, bearer_token:any }) {
    try {
        const data = await axios.post(ACTIVITY_BASE_URL + ACTIVITIES_ENDPOINTS.ACTIVITY,
            {
                'option': option,
                'app_transaction_id': app_transaction_id,
                'limit': limit
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${bearer_token}`,
                    'z-app': 'rapidoo-rider',
                    'z-app-type': Config.z_app_type,
                    'z-app-version': Config.z_app_version,
                    'z-app-code': Config.z_app_code,
                    'x-app-key': Config.SIGN_APP_KEY,
                    'x-app-secret': Config.SIGN_APP_SECRET,
                    "uuid": "sdf-asdfsdf-fdfdf-vvc"
                }
            }
        )
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

// TODO: GET UPDATECONFIG
export async function GetUpdateConfig({
    config_name
}: {
    config_name: string
}) {
    try {
        const data = await axios.post(ADMIN_BASE_URL + ADMIN_ENDPOINTS.GET_UPDATE_CONFIG, {
            "config_name": config_name
        })
        return data.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status == '401') {
                return "401"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}

export async function Transactions({
    bearer_token,
    limit,
    status
}:{
    bearer_token:any,
    limit: number,
    status: string
}) {
    try {
        const data = await axios.post(WALLET_BASE_URL+WALLET_ENDPOINTS.TRANSACTIONS,
            {
                "limit": limit,
                "status": status
            },
            {
            headers:
            {
                'Authorization': `Bearer ${bearer_token}`,
                'z-app': 'rapidoo-riderapp',
                'z-app-type': Config.z_app_type,
                'z-app-version': Config.z_app_version,
                'z-app-code': Config.z_app_code,
                'uuid': "0cc6ec08-e7bb-4dc0-af79-e86904c96420"
            }
        })
        return data.data;
    } catch (error: any) {
        console.log(`\n\n response ${JSON.stringify(error.response.data.message)}`);
        if (error.response.data) {
            if (error.response.data.message == "400: Insuficient Wallet Balance") {
                return "insuficient_balance"
            } else if (error.response.status == '400')
                return "400"
        }
        return console.log(error)
    }
}
