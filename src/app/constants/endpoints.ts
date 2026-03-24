// BASE URL PRODUCTION

import { VEHICLE } from "../assets/data/data"

const IAM_ENDPOINTS = {
    "SIGNUP_CUSTOMER" : `/v1/user/signup/customer`,
    "OTP_VERIFY" : `/v1/user/signup/customer/otp/verify`,
    "RESEND_OTP" : `/v1/user/signup/customer/otp/resend`,
    "ACCOUNT_UPDATE" : `/v1/user/signup/customer/account/update`,
    "PASSWORD_CUSTOMER" : `/v1/user/signin/password/customer`,
    "EMAIL_CUSTOMER": `/v1/user/signin/email/customer`,
    "FORGOT_PASSWORD_OTP" : `/v1/user/signin/forgot/password/otp/customer`,
    "FORGOT_PASSWORD_OTP_VERIFY" : `/v1/user/signin/forgot/password/otp/customer/verify`,
    "FORGOT_PASSWORD_OTP_UPDATE" : `/v1/user/signin/forgot/password/otp/customer/update`,
    "TOKEN_REFRESH" : `/v1/user/token/refresh`,
    "ACCOUNT_UPDATE_RIDER" : `/v1/user/profile/rider/account/update`
}

const ADMIN_ENDPOINTS = {
    "SERVICES": "/v1/user/services",
    "RUNNING" : `/v1/user/running`,
    "APP_UPDATES" : `/v1/user/app_updates`,
    "APP_UPDATES_CREATE" : `/v1/user/app_updates/create`,
    "PAYMENT_OPTIONS" : `/v1/user/payment_options`,
    "RATING_CREATE" : `/v1/user/rating-create`,
    "GET_COUPONS": `/v1/app-service/coupon/get`,
    "APPLY_COUPONS": `/v1/app-service/coupon/apply`,
    "CHECK_COUPONS": `/v1/app-service/coupon/check`,
    "GET_UPDATE_CONFIG" : '/v1/app-service/update-config/get'
}

const WALLET_ENDPOINTS = {
    "WALLET_ACCOUNT": `/v1/user/account`,
    "WALLET_CASHIN": `/v1/user/cash-in`,
    "CASHIN_PAYMENT": `/v1/user/cash-in/payment`,
    "TRANSACTIONS": `/v1/user/transactions`
}

const ACTIVITIES_ENDPOINTS = {
    "ACTIVITIES": `/v1/user/activities`,
    "ACTIVITY": `/v1/user/activity`
}

const PARCEL_ENDPOINTS = {
    "VEHICLE" : `/v1/user/vehicles`,
    "PAYMENT" : `/v1/user/transaction/payment`,
    "TRANSACTION" : `/v1/user/transaction`,
    "TRANSACTION_STATUS" : `/v1/user/transaction/status`,
    "TRANSACTION_CANCEL" : `/v1/user/transaction/cancel`,
    "CHECK_TRANSACTION" : `/v1/user/check/transaction`,
    "GET_TRANSACTION" : `/v1/user/get/user/transaction`,
    "GET_USER_TRANSACTION": `/v1/user/check/user/transaction`,
    "UPDATE_ADDRESS" : `/v1/user/update/address`,
    "ASSIGN_RIDER" : `/v1/user/favorite/rider`,
    "FAVORITE_RIDER": `/v1/user/get/favorite/rider`,
    "RIDER_STATUS": `/v1/user/check/favorite/rider`,
    "CHECK_CUSTOMER_TRANSACTION": `/v1/user/customer/transaction`,
    "GET_SAVED_ADDRESS": `/v1/user/save/address/get`,
    "CREATE_SAVE_ADDRESS": `/v1/user/save/address/add`,
    "REMOVE_SAVE_ADDRESS": `/v1/user/save/address/remove`,
    "VALIDATE_DROPOFF": `/v1/user/validate/dropoff`,
    "GET_CITY_COORDS": `/v1/user/check/city`,
    "GET_SERVICE_OPTION": `/v1/user/service/option`
}

const NOTIFICATION_ENDPOINTS = {
    "SEND_PNS" : '/v1/app-service/send/pns'
}

const NOMINATIM_ENPOINTS = {
    "GET_CITY_COORDS": '/reverse?format=json'
}

export{
    IAM_ENDPOINTS,
    ADMIN_ENDPOINTS,
    WALLET_ENDPOINTS,
    ACTIVITIES_ENDPOINTS,
    PARCEL_ENDPOINTS,
    NOTIFICATION_ENDPOINTS,
    NOMINATIM_ENPOINTS
}