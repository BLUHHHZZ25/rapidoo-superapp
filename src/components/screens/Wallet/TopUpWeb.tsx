import React, { Component, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import queryString from 'query-string'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { SuccessPayment } from '../Wallet/SuccessPayment';
import { SharedElement } from '../../navigations/Navigation';
import { RootState } from '../../../app/redux/store';
import { KeyChainGet } from '../../../utils/KeyChain/GetKeyChain';
import { CashInPaymentRequest } from '../../../services/api_services';
import { spacing } from '../../../app/constants/theme';
import BackHeader from '../../common/BackHeader';
import OrangeButton from '../../common/OrangeButton';
import { WALLET_BASE_URL } from '../../../Config';
// ...
const TopUpWeb = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const [currentURl, setCurrentURL] = useState("");
  const [isCode, setIsCode] = useState<string | any>("")
  const [paymongo, setPaymongo] = useState<boolean>(false)
  const [goback, setGoBack] = useState<boolean>(false)
  const cashin_url = useSelector((state: RootState) => state.wallet.redirect_url);
  const reference_id = useSelector((state: RootState) => state.wallet.reference_id);
  const payment_reference_id = useSelector((state: RootState) => state.wallet.payment_reference_id);
  const redirect_uri = useSelector((state: RootState) => state.wallet.redirect_uri);
  const code = useSelector((state: RootState) => state.wallet.code);

  const WalletNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{
          name: 'HomeNavigation',
          state: {
              routes: [{
                  name: 'Home',
                  state: {
                    routes:[{ name:'Wallet'}] 
                  }
              }]
          }
      }],
  });
  }

  const handleNavigationChange = (navState: { url:string}) => {
    const pending_url = `${WALLET_BASE_URL}/v1/app-provider/transaction/pending`;
    const failed_url = `${WALLET_BASE_URL}/v1/app-provider/transaction/failed`;
    if (navState.url == pending_url){
      console.log("success======");
      setPaymongo(true)
    }
    else if(navState.url == failed_url){
      setGoBack(true)
    }
    
    setCurrentURL(navState.url)
    const url = navState.url;
    const parsed = queryString.parseUrl(url);
    const params_value = parsed.query.code;
    setIsCode(params_value)
  }

  const PaymentProceed = async() => {
    const token = await KeyChainGet()
    const params = {
      refernce_id :reference_id,
      payment_reference_id: payment_reference_id,
      redirect_uri: redirect_uri,
      code: code,
      bearer_token: token.access_token
    }
    const data = await CashInPaymentRequest(params)
    
    if(data.data.status == "SUCCESSFUL"){
      navigation.navigate('SuccessPayment')
      // WalletNavigation()
    }else{
      navigation.navigate('FailedPayment')
    }
  }

  const cashInPayment = async() => {
    const token = await KeyChainGet()
    const params = {
      refernce_id :reference_id,
      payment_reference_id: payment_reference_id,
      redirect_uri: redirect_uri,
      code: isCode,
      bearer_token: token.access_token
    }
    const data = await CashInPaymentRequest(params)
    if(data.code == "200"){
      navigation.navigate('Home')
    }else{
      if(data.code){
        navigation.navigate('AlertModalError',{message:data.code})
      }else{
        navigation.navigate('AlertModalError',{message:data.status_code})
      }
      // setIsLoader(false)
    }
  }

  const handleNav = (event:any) => {
    if (event.url.startsWith('gcash://')) {
      Linking.openURL(event.url)
      return false; // Prevent WebView from handling it
    }
    return true;
  };

  const navigationBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation',
        state:{
            routes:[{ name: 'Home',
                 state:{
                    routes: [{ name: 'Wallet'}]
                 }
            }]
        }
       }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{marginBottom:spacing.s}}>
        <BackHeader title={'Back'} onPress={() => { navigationBack()}}/>
      </View>
      <WebView
        source={{ uri: cashin_url }}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest ={handleNav}
        onNavigationStateChange={handleNavigationChange}
        onMessage={handleNav}
      />
      {
        isCode &&
        <View style={{marginBottom:spacing.s}}>
          <OrangeButton btnTitle={"Proceed caash"} onPress={() => cashInPayment()} disable={false} />
        </View>
      }

      {
        paymongo &&
        <View style={{marginBottom:spacing.s}}>
          <OrangeButton btnTitle={"Confirm Payment"} onPress={PaymentProceed} disable={false} />
        </View>
      }
      {
        goback &&
        <View style={{marginBottom:spacing.s}}>
          <OrangeButton btnTitle={"Go Back"} onPress={WalletNavigation} disable={false} />
        </View>
      }
    </SafeAreaView>
  )
}

export default TopUpWeb