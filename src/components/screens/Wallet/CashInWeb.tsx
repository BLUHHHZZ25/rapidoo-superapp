import React, { Component, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import queryString from 'query-string'
import OrangeButton from '../../common/OrangeButton';
import { spacing } from '../../../app/constants/theme';
import { CashInPaymentRequest } from '../../../services/api_services';
import Navigation, { SharedElement } from '../../navigations/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { KeyChainGet } from '../../../utils/KeyChain/GetKeyChain';
// ...
const CashInWeb = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const [currentURl, setCurrentURL] = useState("");
  const [isCode, setIsCode] = useState<string | any>("")
  const cashin_url = useSelector((state: RootState) => state.wallet.redirect_url);
  const reference_id = useSelector((state: RootState) => state.wallet.reference_id);
  const payment_reference_id = useSelector((state: RootState) => state.wallet.payment_reference_id);
  const redirect_uri = useSelector((state: RootState) => state.wallet.redirect_uri);


  const handleNavigationChange = (navState: { url: React.SetStateAction<string>; }) => {
    setCurrentURL(navState.url)
    // const parsedURL = new URL(navState.url)
    const url = navState.url;
    const parsed = queryString.parseUrl(url);
    const params_value = parsed.query.code;
    setIsCode(params_value)
    console.log("\n\n code value", params_value)
  }

  const cashInPayment = async() => {
    const key = await KeyChainGet()
    const params = {
      refernce_id :reference_id,
      payment_reference_id: payment_reference_id,
      redirect_uri: redirect_uri,
      code: isCode,
      bearer_token: key.access_token
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
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: cashin_url }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationChange}
      />
      {
        isCode &&
        <View style={{marginBottom:spacing.s}}>
          <OrangeButton btnTitle={"Proceed"} onPress={() => cashInPayment()} disable={false} />
        </View>
        // <Text>: {currentURl}</Text>
      }
    </SafeAreaView>
  )
}

export default CashInWeb