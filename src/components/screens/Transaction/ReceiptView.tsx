import { Text, TouchableOpacity, Linking, View, Alert, StyleSheet, Dimensions, StatusBar } from "react-native";
import WebView from "react-native-webview";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { useEffect, useRef, useState } from "react";
import { colors, spacing, text } from "../../../app/constants/theme";
import DefaultHeader from "../../common/DefaultHeader";
import { useSelector } from "react-redux";
import Share from 'react-native-share';
import { RootState } from "../../../app/redux/store";
import { DateFormatted } from "../../../utils/DateFormats/DateFormat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../../navigations/Navigation";
import OrangeButton from "../../common/OrangeButton";
import { Icon } from "@rneui/themed";
import Pdf from "react-native-pdf";
import { formatAmount } from "../../../utils/FormatAmount";
import { ACTIVITY_BASE_URL } from "../../../Config";

export default function ReceiptView() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const pickup_address = useSelector((state: RootState) => state.history.pickup_address);
  const isMultipleDrop = useSelector((state: RootState) => state.history.isMultipleDrop);
  const dropoff_address = useSelector((state: RootState) => state.history.dropoff_address);
  const transaction_created_at = useSelector((state: RootState) => state.history.transaction_created_at);
  const app_transaction_id = useSelector((state: RootState) => state.history.app_transaction_id);
  const rider_name = useSelector((state: RootState) => state.history.rider_name);
  const total_amount = useSelector((state: RootState) => state.history.total_amount);
  // Extracting only the multipleAddress values
  const [isDownload, setDownload] = useState('')
  const multipleAddresses = isMultipleDrop.map(item => item.multipleAddress.replace(/,/g, ""));
  const strAddresses = JSON.stringify(multipleAddresses).replace(/[\[\]"]/g, "");

  // const url = `https://staging.rapidooph.com/activity/v1/app-service/receipt?name=Roger+Moore&total=1000&payment_method=Rapidoo+Wallet&referenceNumber=${app_transaction_id}&date=${DateFormatted({date:transaction_created_at})}&paymentMethod=Cash&isMultiples=CMI Bldg 315 Commonwealth Ave Quezon City 1128 Metro Manila,CMI Bldg 315 Commonwealth Ave Quezon City 1128 Metro Manila,service+3,CMI Bldg 315 Commonwealth Ave Quezon City 1128 Metro Manila,CMI Bldg 315 Commonwealth Ave Quezon City 1128 Metro Manila&pickup=${pickup_address}&dropoff=${dropoff_address}`
  const url = `${ACTIVITY_BASE_URL}/v1/app-service/receipt?name=${rider_name}&total=${formatAmount(total_amount.toString())}&payment_method=Rapidoo+Wallet&referenceNumber=${app_transaction_id}&date=${DateFormatted({ date: transaction_created_at })}&paymentMethod=Cash&isMultiples=${encodeURIComponent(strAddresses)}&pickup=${pickup_address}&dropoff=${dropoff_address}`
  const webViewRef = useRef(null);

  console.log("\n\nis multiple", isMultipleDrop);

  const shareFunction = async () => {
    const url = `${ACTIVITY_BASE_URL}/v1/app-service/receipt?name=${rider_name}&total=${formatAmount(total_amount.toString())}&payment_method=Rapidoo+Wallet&referenceNumber=${app_transaction_id}&date=${DateFormatted({ date: transaction_created_at })}&paymentMethod=Cash&isMultiples=${encodeURIComponent(strAddresses)}&pickup=${pickup_address}&dropoff=${dropoff_address}`
    const url_string = url.replace(/\s/g, '+');
    const shareOptions = {
      title: 'Share via',
      message: 'Check this out!',
      url: url_string, // Replace with your file's URI
      subject: 'Here is your receipt',
    };
    const result = await Share.open(shareOptions);
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar
          hidden={true}
      />
      <DefaultHeader titleName={"Receipt"} onPress={navigation.goBack} />
      <WebView
        originWhitelist={['*']}
        source={{ uri: url }}
        style={{ width: "100%", height: "60%" }}
      />
      <TouchableOpacity 
        onPress={shareFunction} 
        style={{ 
          position: 'absolute', 
          borderRadius: 50, 
          backgroundColor: colors.mustard, 
          elevation: 5, 
          bottom: spacing.xl, 
          right: spacing.l 
        }}
      >
        <Icon 
          type="ionicon" 
          name="share-social-outline" 
          size={25} 
          color={colors.light} 
          style={{ margin:spacing.s+4}} 
        />
      </TouchableOpacity>
    </View>
  )
}
