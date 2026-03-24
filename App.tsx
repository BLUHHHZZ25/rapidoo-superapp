import React, { useEffect, useRef, useState } from 'react';
import { Button, Linking, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/navigations/Navigation';
import { Provider } from 'react-redux';
import { AppDispatch, store } from './src/app/redux/store';
import SetPin from './src/components/screens/Pin/SetPin';
import { NotificationPermission } from './src/components/notification/NotificationPermission';
import { foregroundAction } from './src/components/notification/Notification';
import './src/Config.js';
import messaging from '@react-native-firebase/messaging';
import { GOOGLE_API_KEY, ANDROID_ID, ADMIN_BASE_URL } from './src/Config.js';
import Config from 'react-native-config';
import linkingURL from './src/components/navigations/LinkingNavigation.tsx';
import Blocked from './src/components/screens/Blocked';
import axios from 'axios';
import {
  getAppInfo,
  getCountAppInfo,
  getCountAppUpdates,
  getCountServices,
  getServices,
  postAppInfo,
  postServices,
} from './src/app/watermelonDB/model/model.ts';
import { axiosAsync } from './src/app/redux/reducers/registrationSlice.ts';
import NetInfoComp from './src/utils/NetInfoComp.tsx';
import { notificationConnection } from './src/services/notification.tsx';
import { log } from '@react-native-firebase/crashlytics';
import { setAcceptTransaction } from './src/app/redux/reducers/transactionOrder.ts';
import { Text } from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { WebSocketInitializer } from './src/components/WebsocketInit.tsx/WeboscketInit.tsx';
// import SignInScreen from './src/components/screens/SignInScreen.tsx';



export default function App() {
  const [isServices, setIsServices] = useState<null | any>(null);
  const [serviceStat, setServiceStat] = useState(false);
  const [appInfoStat, setAppInfoStat] = useState(false);
  const permissionRef = useRef<any>(null);
  console.log(GOOGLE_API_KEY);
  console.log('Key Config', Config.VARIANT);

  // //Fetch data from services
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await axios.get(ADMIN_BASE_URL + '/admin/v1/user/services');
  //       setIsServices(data.data);
  //       // console.log("\n\n Datass", data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (!isServices) {
  //     fetchData();
  //   }
  // }, [isServices]);

  //Count on watermelon db if App_info table has data
  async function funcAppInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getCountAppInfo();
        // console.log("app_info count success", data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  //Count on watermelon db if Services table has data
  async function funcServices() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getCountServices();
        // console.log("service count success", data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function count() {
    const data = await getCountServices();
    const data_app_updates = await getCountAppUpdates();

    return console.log('services count', data, 'appupdates', data_app_updates);
  }

  count();

  // // Check if the app_info and services in equal to zero ================
  //   async function appInfo() {
  //     return new Promise(async(resolve,reject) => {
  //       try {
  //         const countAppInfo = await funcAppInfo();
  //         const app_info_params = {
  //           device_id: (await ANDROID_ID).toString()
  //         }
  //         // if App_info is Zero
  //         if (!countAppInfo) {
  //           const result = await postAppInfo(app_info_params);
  //           console.log("result", result);
  //           setAppInfoStat(true);
  //           resolve(result);
  //         }
  //       } catch (error) {
  //         reject(error);
  //       }
  //     })
  //   }

  // async function services() {
  //   return new Promise(async(resolve,reject) =>{
  //     try {
  //       const countServices = await funcServices();
  //       // if App info is Zero
  //       if (!countServices) {
  //         if (isServices) {
  //           (isServices).forEach((index: any) => {
  //             const services_params = {
  //               service_id: index.id,
  //               name: index.name,
  //               key: index.key,
  //               is_active: index.is_active,
  //               status: index.status,
  //               img: index.img,
  //               version: index.version
  //             }
  //             const result = postServices(services_params);
  //             console.log("isServices",isServices);
  //             console.log("result",result);
  //             console.log("\n\n\n paramssss",services_params);

  //             resolve(services_params);
  //           })
  //           setServiceStat(true);
  //         }
  //       }
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
  // }

  // useEffect(() =>{
  //   if(!appInfoStat){
  //     appInfo();
  //   }
  //   if(!serviceStat){
  //     services();
  //   }
  // },[serviceStat, appInfoStat])

  useEffect(() => {
    const Notification = () => {
      // Handle displaying of Notification while in background
      const foreground = messaging().onMessage(async remoteMessage => {
        const body = remoteMessage.notification?.body;
        const title = remoteMessage.notification?.title;
        const data = remoteMessage?.data;
        const data_string = data?.data;

        if (typeof data_string === 'string') {
          try {
            if (data_string == 'alive' && !setAcceptTransaction) {
              console.log('alive');
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.error('Data is not a string:', data_string);
        }
        // onDisplayNotification(body, title, data);
      });
    };

    Notification();
  }, []);

  // const awakePNS = async () => {
  //   try {
  //     const fcm_token = await NotificationPermission();
  //     const response = await notificationConnection(fcm_token);
  //     if (response) {
  //       console.log('Notification Awake');
  //     }
  //   } catch (error) {
  //     console.log('App.tsx - awakePNS', error);
  //   }
  // };

  useEffect(() => {
    permissionRef.current = setInterval(() => {
      // awakePNS();
    }, 29000);
    return () => {
      clearInterval(permissionRef.current);
    };
  }, []);

  useEffect(() => {
    // awakePNS();
    foregroundAction();
  }, []);

  // console.log("current Year:",cdate+1);

  // async function services_fetch() {
  //   const data = await getServices();
  //   console.log("get services ==",data[0]);
  // }
  // services_fetch();
  
  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const response = await GoogleSignin.signIn();
  //     // const response = await GoogleSignin.signInSilently();
  //     // const response = await GoogleSignin.getTokens();
  //     // const { type, data } = await GoogleSignin.signIn()

  //     // console.log("\n\n log ", type, " ", data);
      
  //   } catch (error) {
  //     console.log("error message", error, " error code ", error.code);
  //   }
  // }


const handleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('User signed out successfully');
    // Optionally clear your app's user state here
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

  return (
    // <View>
    //   <Text>sdfasdfasdfasdf</Text>
    //   <Button title='SignIn' onPress={signIn}/>
    //   <Button title='Signout' onPress={handleSignOut}/>
    // </View>
    <Provider store={store}>
      <WebSocketInitializer />
      <NetInfoComp />
      <NavigationContainer linking={linkingURL}>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}