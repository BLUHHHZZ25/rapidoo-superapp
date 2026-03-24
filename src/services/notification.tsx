import axios from 'axios';
import { NOTIFICATION_ENDPOINTS } from '../app/constants/endpoints';
import { NOTIFICATION_BASE_URL } from '../Config';

// https://staging.rapidooph.com/parcel/ use when in local host

export async function notificationConnection(fcm_token: any) {
  try {
    const response = await axios.post(
      `${NOTIFICATION_BASE_URL+NOTIFICATION_ENDPOINTS.SEND_PNS}`,
      {
        "fcm_token": fcm_token,
        "title": 'notif awake',
        "body": 'notif awake',
        "redirect_to": 'none',
        "application_type": 'SUPERAPP',
        "data": 'alive',
      },
      {
        headers: {
          "x-app-key": "8rPTa76mQ80eNe00NWqUjGJyQIIpDnP6brHSIyVnE7hs763F",
          "x-app-secret": "Bs9GFj01yq6wVLQijlosvObqOePWFYPWf2An4m2o0qZ6IIrF",
        },
      },
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
