// axiosClient.ts
import axios from 'axios';
import Config from 'react-native-config';


const clientActivity = axios.create({
  baseURL: 'https://staging.rapidooph.com/activity',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'z-app': 'rapidoo-superapp',
    'z-app-type': Config.z_app_type,
    'z-app-version': Config.z_app_version,
    'z-app-code': Config.z_app_code,
    'z-app-key': Config.SIGN_APP_KEY,
    'z-app-secret': Config.SIGN_APP_SECRET,
    'uuid': "asdf-sdfasd-sdf3d-ee"
  },
});

export default clientActivity;
