import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import CrashlyticsErrorHandler from '../../utils/Crashlytics/CrashlyticsErrorHandler';
import { Platform,PermissionsAndroid } from 'react-native';

export const NotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      // console.log('Authorization status:', authStatus);
      return generateToken();
    }
  } catch (error) {
    CrashlyticsErrorHandler(error, 'NotificationPermission', 'NotificationPermission');
    console.log(error); 
  }
};

export const requestNotificationPermission = async () => {
  if(Platform.OS ==="android"){
    try {
      PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
        response => {
          if(!response){
            PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            })
          }
        }
      ).catch(
        err => {
          console.log("Notification Error=====>",err);
        }
      )
    } catch (err){
      console.log(err);
    }
  }
};


// Generate Unique Token that will be used to send notification to specific device
const generateToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log(token);
    return token
  } catch (error) {
    CrashlyticsErrorHandler(error, 'NotificationPermission', 'generateToken');
    console.log('Generating Token Failed');
  }
};


