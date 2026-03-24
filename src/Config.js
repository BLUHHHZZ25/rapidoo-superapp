import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import { IAM_ENDPOINTS,ADMIN_ENDPOINTS,WALLET_ENDPOINTS,ACTIVITIES_ENDPOINTS } from './app/constants/endpoints';

const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;
const GOOGLE_AUTOCOMPLETE_URL = Config.GOOGLE_AUTOCOMPLETE_URL;
const GOOGLE_DETAILS_URL = Config.GOOGLE_DETAILS_URL;
const SIGN_APP_KEY = Config.SIGN_APP_KEY; 
const SIGN_APP_SECRET = Config.SIGN_APP_SECRET;
const COUPON_SECRET= Config.COUPON_SECRET;

// const VARIANT = "STAGING";
const VARIANT = Config.VARIANT;

const LOCAL_BASE_URL = Config.LOCAL_BASE_URL;

const autorization = Config.autorization;
const z_app = Config.z_app;
const z_app_type = Config.z_app_type;
const z_app_version = Config.z_app_version;
const z_app_code = Config.z_app_code;

 export const IAM_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/iam` : "https://iam.rapidooph.com" ;
//  export const IAM_BASE_URL = VARIANT == "STAGING" ? `http://10.0.2.2:9000` : "https://iam.rapidooph.com" ;
 export const PARCEL_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/parcel` : "https://parcel.rapidooph.com";
 export const ACTIVITY_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/activity` : "https://activity.rapidooph.com";
 export const WALLET_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/wallet` : "https://wallet.rapidooph.com";
 export const ADMIN_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/admin` : "https://admin.rapidooph.com";
 export const NOTIFICATION_BASE_URL = VARIANT == "STAGING" ? `https://staging.rapidooph.com/notification` : "https://notification.rapidooph.com";
 export const NOMINATIM_BASE_URL = VARIANT == "STAGING" ? `https://nominatim.openstreetmap.org` : "https://nominatim.openstreetmap.org";

 const ANDROID_ID = DeviceInfo.getAndroidId();

// WEBSOCKET
 const IAM_WEBSOCKET_URL = VARIANT == "STAGING" ? 'wss://staging.rapidooph.com/iam/app-service/ws' : 'wss://iam.rapidooph.com/app-service/ws';

export {
    GOOGLE_API_KEY,
    GOOGLE_AUTOCOMPLETE_URL,
    GOOGLE_DETAILS_URL,
    SIGN_APP_KEY,
    SIGN_APP_SECRET,
    VARIANT,
    LOCAL_BASE_URL,
    ANDROID_ID,
    z_app,
    z_app_type,
    z_app_version,
    z_app_code,
    autorization,
    IAM_WEBSOCKET_URL,
    COUPON_SECRET
}