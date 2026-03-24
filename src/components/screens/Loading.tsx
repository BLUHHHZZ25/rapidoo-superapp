import { Text, View, Dimensions, Animated } from "react-native"
import { Icon } from "@rneui/themed"
import { colors } from "../../app/constants/theme"
import { useEffect, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SharedElement } from "../navigations/Navigation"
import { GetAppUpdates, GetUpdateConfig, PostAppUpdates, RefreshRequest, RUNNING, Services } from "../../services/api_services"
import { createUpdateConfig, deleteAll, deleteAppUpdates, deleteServices, getAppUpdates, getServices, getUpdateConfig, postAppUpdates, postServices } from "../../app/watermelonDB/model/model"
import * as Keychain from 'react-native-keychain'
import { KeyChainGet } from "../../utils/KeyChain/GetKeyChain"
import { AlertModalError } from "./SignUp/AlertModalError"
import { AlertModal } from "../../app/constants/AlertModal"

const fullHeight = Dimensions.get('screen').height
const fullWidth = Dimensions.get('screen').width

const Loading = () => {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const iconVariants = ["beer-outline", "fast-food-outline", "pizza-outline", "beer-outline", "fast-food-outline", "pizza-outline", "beer-outline", "fast-food-outline", "pizza-outline"]
    const backgroundTop = useRef(new Animated.Value(0)).current;
    const [triggerAppUpdates, setTriggerAppUpdates] = useState<any | null>(null);
    const [triggerServices, setTriggerServices] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    const alignment = (InDex: number) => {
        if(InDex % 3 === 0){
            return 'flex-end'
        }
        if(InDex % 2 === 0){
            return 'center'
        }
        if(InDex % 1 === 0){
            return 'flex-start'
        }
    }
    const navigationHome = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeNavigation' }],
        });
      };
    // useEffect(() => {
    //     console.log(3 % 3 === 0)
    // }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(backgroundTop, {
                toValue: fullHeight * -2,
                duration: 1000,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                Animated.timing(backgroundTop, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                }).reset()
            }, 1000)
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.navigate('Login')
    //     }, 5000)
    // }, [])

  // TODO: Check if the access token is expired or not
  const tokenCheck = async() => {
    try {
      const key_chain = await Keychain.getGenericPassword();
      if(key_chain){
        const key = await KeyChainGet()
        // const data = await RUNNING({bearer_token:key.access_token})
        const data = await RUNNING({bearer_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYW1faWQiOiI0ZGY5MWI2Ni1iNDkyLTQzNTgtYmQyMC1iZjFlM2ZiZTliYWEiLCJ1c2VyX2lkIjozOTQsInVzZXJfdHlwZSI6InJhcGlkb28tcmlkZXIiLCJ1c2VyX3JvbGUiOiJyaWRlciIsInBuc190b2tlbiI6ImFzZGZhc2RmYXNkZmFzc2Zhc2RmYXNkZmQiLCJ1c2VybmFtZSI6InJhMjAyNTAxMTYwMjQ5MDQ0ODExNjkwIiwiZGlzcGxheV9uYW1lIjoiUm9nZXIgbW9vcmUgbW9vcmUiLCJkZXZpY2VfaWQiOiJhZDg2NzRlYy1iNWIwLTQ5OTItOTU1Mi0xOTI2N2E4ZTFlNTMiLCJzdGF0dXMiOiJSRUdJU1RFUkVEIiwiZXhwIjoxNzQyMDA1NTkxLCJzdWIiOiJodHRwczovL3JhcGlkb28ucGgifQ.0k-7bVrjw_v9puBLx3MVEhtTANtexpSitPjN4RG7w6I"})
        console.log("\n\n data", data);
        
        if(data == 401|| data == undefined){
          console.log("\n\n expired");
          const new_data = await RefreshRequest({bearer_token:key.refresh_token})
          console.log("\n\n new data", new_data);
          
          if(new_data){
            if(new_data.code){
              const token_keychain = await Keychain.setGenericPassword("tokens",JSON.stringify({"access_token":new_data.data, "refresh_token": key.refresh_token, "username": key.username}) )
            }else if(new_data.status_code == "400"){
              console.log("Expired Refresh Token");
              deleteAll()
              navigation.navigate('Login');
              Keychain.resetGenericPassword()
            }else if(new_data == "401"){
              setIsExpired(true)
            }
          }else{
            console.log("\n\n ====== expired");
            
          } 
        }
        console.log("\n\n ___________________- key",key);
        
        navigationHome()
      }else{
        navigation.navigate('Login') 
      }
    } catch (error:any) {
      console.log("\n\n error", error.message.slice(0,4));
    //   if(error.message.slice(0,4))
      
    }
  }

      // TODO: UPDATE SERVICES
const updateServices = async() => {
  console.log("\n\nfetching services ");
  const services = await Services()
  console.log("\n\n\n services ", services);
  
  // if (services) {
  //   (services).forEach((res: any, index: number) => {
  //     console.log("index: ", index);
  //     const services_parmas = {
  //       service_id: res.id,
  //       name: res.name,
  //       key: res.key,
  //       is_active: res.is_active,
  //       status: res.status,
  //       img: res.img,
  //       version: res.version,
  //     }
  //     // postServices(services_parmas);
  //     setTriggerServices(true);
  //   })
  // }
  const resultArray = services.map((res: any, index: number) => {
    return { index, res };
});
const string_resultArray = JSON.stringify(resultArray)
postServices({"services": string_resultArray})
  console.log("\n\n\n\n result Array -------- ", resultArray[0].res.status);
  
}

// FETCHING LOGIC - When appupdates table version not match with the local version fetch the data save to local
const fecthingUpdates = async() => {
  const update_data_local = await getUpdateConfig({"config_name": "parcel_api"}) // Get the data in watermelon
  const update_data_db = await GetUpdateConfig({"config_name": "parcel_api"}) // Get the data in database
  const update_version_local = update_data_local[0]._raw.update_version // from watermelon
  const config_name_local = update_data_local[0]._raw.config_name // from watermelon
  const update_version_db = update_data_db.data.update_version // from database
  const config_name_db = update_data_db.data.config_name // from database
  
  if (!(update_version_local == update_version_db)){
    updateServices()
    createUpdateConfig({"config_name": config_name_db, "update_version": update_version_db}) //save the data from database into watermelon
    console.log("\n\n\n\n not matched-------=-=-=-=-=-=-=-=-=-=-=-=-");
    
  }
}

fecthingUpdates()



// TODO: FETCHING THE APP UPDATES
const fetching = async() => {
  // PARAMS
  const get_app_updates = {
    phone_number: "0999"
  }

  const post_app_updates = {
    phone_number: "0999",
    app_services: "1",
    app_merchants: "1",
    app_sku_foods: "1"
  }

  //  INITIALIZE FUNCTIONS
  const app_updates = await getAppUpdates();
  const app_updates_db = await GetAppUpdates(get_app_updates);

  if (!app_updates[0]) {
    if (!app_updates_db) {
      const update_app_updates = await PostAppUpdates(post_app_updates)
      updateServices()
      if (update_app_updates) {
        postAppUpdates(post_app_updates)
      }
    } else {
      const create_app_update = {
        phone_number: JSON.stringify(app_updates_db.phone_number),
        app_services: JSON.stringify(app_updates_db.app_services),
        app_merchants: JSON.stringify(app_updates_db.app_merchants),
        app_sku_foods: JSON.stringify(app_updates_db.app_sku_foods)
      }
      updateServices()
      postAppUpdates(create_app_update)
    }

  } else {
    console.log("data of", JSON.stringify(app_updates[0], null, 5))
    if (app_updates_db.app_services == app_updates[0].app_services) {
      console.log("No Updates");
      // const data = await Services()
      // console.log("services data",data)
    } else {
      await deleteAppUpdates()
      const update = {
        phone_number: JSON.stringify(app_updates_db.phone_number),
        app_services: JSON.stringify(app_updates_db.app_services),
        app_merchants: JSON.stringify(app_updates_db.app_merchants),
        app_sku_foods: JSON.stringify(app_updates_db.app_sku_foods)
      }
      postAppUpdates(update)
      updateServices()
      console.log("\n\nupdate services");

    }
  }
}
  
    useEffect(() => {
      tokenCheck()    

  
      if (!(triggerAppUpdates && triggerServices)) {
        fetching();
      }

      }, []);


      const navigationLogin = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      };

      const Expired_Session = async() => {
        const delete_profile = await deleteAll();
        const reset = Keychain.resetGenericPassword()
        navigationLogin()
      }


    return(
        <View style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            backgroundColor: colors.mustard,
            overflow: 'hidden',
            position: 'relative'
        }}>
          <View style={{position:'absolute'}}>
            <AlertModal modalVisibile={isExpired} alertMessage={"Session Expired.."} yesOnpress={Expired_Session} noOnpress={Expired_Session}/>
          </View>
            <Animated.View style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              paddingHorizontal: '10%',
              transform: [{
                  translateY: backgroundTop
              }]
            }}>
              {
                iconVariants.map((icon, index) => <Icon key={index} type="ionicon" name={icon} style={{
                    alignSelf: alignment(index),
                    height: fullHeight / 3
                }} color={colors.mustardOpacity} size={fullWidth / 3}/>)
              }
            </Animated.View>
            <Text style={{
                fontSize: 48,
                fontWeight: '900',
                color: colors.violet
            }}>
                Rapidoo Super
            </Text>
            <Text style={{
                fontSize: 24,
                fontWeight: '500',
                color: colors.grayText
            }}>
                We Do It Rapid
            </Text>
        </View>
    )
}

export default Loading