import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet, Text, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import Animated, { BounceIn } from 'react-native-reanimated';
// import LoaderComponents from '../components/common/LoaderComponents';
// import NoInternet from '../components/common/NoInternet';
import NoInternet from '../components/screens/NoInternet';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/redux/store';
import { setUserConnected } from '../app/redux/reducers/appInfoSlice';
// import { strings } from '../i18n';
// import { fontSize } from '../utils/fonts';
// import { Colors } from '../utils/colors';

const NetInfoComp = () => {

    const [isConnected, setIsConnected] = useState<any>(false);
    const [isVpn, setIsVpn] = useState(false);
    const usedispatch = useDispatch<AppDispatch>();
    
    useEffect(()=>{
        try {
            NetInfo.addEventListener(networkState => {
                // console.log("Connection type - ", networkState.type);
                // console.log("Is connected? - ", networkState.isConnected);
                // console.log("Is reachable? - ", networkState.isInternetReachable);
                // console.log("details? - ", networkState.details);
                // console.log("details? - ", networkState.details.strength);
                // console.log("speed? - ", details.downlink);
                if (networkState.type == "wifi") {
                    console.log("Link speed - ", networkState.details.linkSpeed, "Mbps");
                    // setLinkSpeed(networkState.details.linkSpeed);
                    // if(networkState.details.linkSpeed <= 1){
                    //     setIsConnected(false)
                    // }else
                    setIsConnected(networkState.isConnected)
                  }
                  else if(networkState.type == "cellular"){
                    setIsConnected(networkState.isInternetReachable)
                  }
              });

        } catch (error) {
            console.log("error")
        }
    },[])

    useEffect(() => {
        if(!isConnected){
            usedispatch(setUserConnected("disconnected"))
        }
        else{
            usedispatch(setUserConnected("connected"))
        }
    }, [isConnected])

      return(
        <View>
            <View>
                {
                !isConnected && <NoInternet />
                // <NoInternet />
                }
            </View>
        </View>
      )

}

export default NetInfoComp;