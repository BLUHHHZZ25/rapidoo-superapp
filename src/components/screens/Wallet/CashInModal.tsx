import React, { useEffect, useState } from "react";
import { Button, Dimensions, StatusBar, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import Modal from "react-native-modal";
// import { colors, horizontalScale, shadow, sizes, spacing, text } from ../../../constants/theme";
import { colors, horizontalScale, shadow, sizes, spacing, text } from "../../../app/constants/theme";
import { Icon } from "@rneui/themed";
import OrangeButton from "../../common/OrangeButton";
import { single_logo, walletCard } from "../../../app/assets/img/images";
import { KeyChainGet } from "../../../utils/KeyChain/GetKeyChain";
import { CashInRequest, GetPaymentOptions } from "../../../services/api_services";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setCashInURL, setPaymentData } from "../../../app/redux/reducers/walletSlice";
import { SharedElement } from "../../navigations/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { HomeElement } from "../../navigations/HomeNavigation";
import InputText from "../../common/InputText";
import queryString from "query-string";
import InputTextAmount from "../../common/InputTextAmount";
import { WalletElement } from "../../navigations/WalletNavigation";
// import { SnackbarComponentsRed } from "../../components/Template/SnackBar";
const walletRate = 2;

export default function CashInModal() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigateWallet = useNavigation<NativeStackNavigationProp<WalletElement>>();

    const [isModalVisible, setModalVisible] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState("");
    const [selectPayment, setSelectPayment] = useState("");
    const [paymentOption, setPaymentOption] = useState([]);
    const [gcashRef, setGcashRef] = useState("");
    const [amount, setAmount] = useState("")
    const usedispatch = useDispatch<AppDispatch>();
    const walletOption = useSelector((state: RootState) => state.wallet.option);
    const walletType = useSelector((state: RootState) => state.wallet.type);
    const walletImg = useSelector((state: RootState) => state.wallet.img);
    const walletRate = useSelector((state: RootState) => state.wallet.rate);

    const onSubmit = async () => {
        if(walletOption && topUpAmount){
          const key = await KeyChainGet()
          
          const params = {
            "amount": Number(topUpAmount),
            "option": walletOption,
            "bearer_token": key.access_token,
            "type": walletType
          }
          const cashin = await CashInRequest(params)
          
          if (cashin.code == "200") {
            const url = cashin.data.redirect_url
            const parsed = queryString.parseUrl(url);
            const code = parsed.query.id; // Output: src_x855kVfjoVsN4KbvVmQJh9Hv
            
            const params = {
              reference_id: cashin.data.reference_id,
              payment_reference_id: cashin.data.payment_reference_id,
              redirect_uri: cashin.data.redirect_uri,
              code: code
            }
            usedispatch(setCashInURL(cashin.data.redirect_url))
            usedispatch(setPaymentData(params))
            // openBrowser(cashin.data.redirect_url)
            navigationTopUpWeb()
            console.log("success")
          } else {
            if (cashin.code) {
              navigateWallet.navigate('AlertModalError', { message: cashin.code })
            } else {
              navigateWallet.navigate('AlertModalError', { message: cashin.status_code })
            }
          }
        }else{
          navigateWallet.navigate('AlertModalError', { message: "Please choose a payment option and specify the amount"})
        }
        
      }

    const navigationTopUpWeb = () => {
        navigateWallet.reset({
        index: 0,
        routes: [{ name: 'TopUpWeb' }],
        });
    };

    const totalAmount = (amount:number, rate:number) => {
        const convert_rate = 1-(rate/100)
        const total = amount/convert_rate
        setTopUpAmount(total.toFixed(2).toString())
      }

    const AmountValue = (e:any) => {
        setAmount(e)
        totalAmount(Number(e.replace(/,/g, '')),walletRate)
      }

    const navigationWallet = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Home',
        state:{
            routes:[{ name: 'Wallet',
            }]
        }
        }],
    });
    };

    useEffect(() => {
        const payment_options = async () => {
            const data = await GetPaymentOptions()
            const data_string = data.data
            setPaymentOption(data_string)
            console.log("data here", data_string)
        }
        payment_options();
    }, [])
    console.log("data", paymentOption)
    return (
        <View>
            <Modal
                onBackdropPress={() =>  navigationWallet()}
                onBackButtonPress={() =>  navigationWallet()}
                isVisible={true}
                swipeDirection="down"
                onSwipeComplete={() => navigationWallet()}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.center}>
                        <View style={{ width: '100%', height: "auto", paddingHorizontal: spacing.m, }}>
                            <Text style={[styles.titleLabel, text.mediumPlus]}>Cash-In</Text>
                            <Image source={{ uri: (walletCard) }} style={{ width: "100%", height: 100, borderRadius: 15 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignItems: 'center', position: 'absolute', top: 80 / 1.2, left: 80 / 2.6 }}>
                                <View>
                                    <Image source={{ uri: (single_logo) }} style={{ width: 80, height: 80 }} />
                                </View>
                                <View style={{ flexDirection: 'row', position: 'absolute', right: spacing.l }}>
                                    <Text style={[text.medium, { fontWeight: '600', color: colors.light, alignSelf: 'center' }]}>Php </Text>
                                    <Text style={[text.extraL, { fontWeight: '700', color: colors.light }]}>{topUpAmount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={{ width: '100%', height: "auto", paddingHorizontal: spacing.m, }}>
                            <Text style={[{ color: colors.black, fontWeight: '700', marginHorizontal: spacing.s, marginVertical: spacing.s }, text.medium]}>Enter Top Up amount (Php)</Text>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', gap: spacing.s }}>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("200")
                                            totalAmount(200, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "200" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "200" ? colors.light : colors.grayText }, text.normal]}>200</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("300")
                                            totalAmount(300, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "300" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "300" ? colors.light : colors.grayText }, text.normal]}>300</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("400")
                                            totalAmount(400, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "400" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "400" ? colors.light : colors.grayText }, text.normal]}>400</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("500")
                                            totalAmount(500, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "500" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "500" ? colors.light : colors.grayText }, text.normal]}>500</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', gap: spacing.s, marginVertical: spacing.s }}>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("600")
                                            totalAmount(600, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "600" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "600" ? colors.light : colors.grayText }, text.normal]}>600</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("700")
                                            totalAmount(700, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "700" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "700" ? colors.light : colors.grayText }, text.normal]}>700</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("800")
                                            totalAmount(800, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "800" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "800" ? colors.light : colors.grayText }, text.normal]}>800</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { 
                                            setAmount("900")
                                            totalAmount(900, walletRate)
                                         }}
                                        style={{
                                            padding: spacing.s,
                                            borderColor: colors.mustard,
                                            borderWidth: 2,
                                            borderRadius: spacing.s,
                                            width: "20%",
                                            alignItems: 'center',
                                            backgroundColor: topUpAmount == "900" ? colors.mustard : colors.light
                                        }}>
                                        <Text style={[{ color: topUpAmount == "900" ? colors.light : colors.grayText }, text.normal]}>900</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={{ width: '100%', height: "auto", paddingHorizontal: spacing.m, }}>
                            <Text style={[{ color: colors.black, fontWeight: '700', marginHorizontal: spacing.s, marginVertical: spacing.s }, text.medium]}>Other Amount</Text>
                            <InputTextAmount 
                                keyboardType={"numeric"} 
                                secureTextEntry={false} 
                                Editable={true} 
                                Value={amount} 
                                isPhoneNumber={false} 
                                Placeholder={""} 
                                onChangeText={AmountValue}
                            />
                            </View>
                    </View>

                    <View style={styles.center}>
                        <View style={{ width: '100%', height: "auto", paddingHorizontal: spacing.m, }}>
                        <Text style={[{ color: colors.black, fontWeight: '700', marginHorizontal: spacing.s, marginVertical: spacing.s }, text.medium]}>Select Payment Option</Text>
                            <View>
                                <TouchableOpacity
                                key={1}
                                onPress={() => {
                                    navigateWallet.navigate('PaymentMethod')
                                }}
                                style={{
                                    flexDirection: 'row',
                                    borderWidth: 2,
                                    borderColor: colors.mustard,
                                    padding: spacing.s,
                                    borderRadius: spacing.s,
                                    gap: spacing.m,
                                    justifyContent:'space-between',
                                    // backgroundColor: selectPayment == item.key ? colors.mustard : colors.light
                                    backgroundColor: colors.light
                                }}>
                                <View style={{flexDirection:'row', gap:spacing.s, marginLeft:spacing.s}}>
                                {
                                    walletImg ?
                                    <Image source={{ uri: (walletImg) }} style={{ width: 20, aspectRatio: 1 }} />
                                    :
                                    <Icon type="ionicon" name="chevron-forward" color={colors.orange} size={20}/>
                                }
                                    <Text style={[text.normal, { color: colors.grayText  }]}>{walletType ? walletType.toUpperCase() :walletOption ? walletOption.toUpperCase():"Choose Payment Method"}</Text>
                                </View>
                                {
                                    walletImg ?
                                    <Text style={[text.smallPlus,{color:colors.green, fontWeight:'700', marginRight:spacing.m, alignSelf:'center'}]}>{walletRate}%</Text>
                                    :
                                    null
                                }
                                </TouchableOpacity> 
                            </View>
                        </View>
                    </View>

                    <View style={{}}>
                        <Text style={{ color: colors.black, justifyContent: 'center', paddingHorizontal: spacing.m, marginVertical: spacing.m }}>
                            By selecting "Continue", I agree to Rapidoo's Privacy Policy and Terms and Conditions
                        </Text>
                    </View>

                    <View>
                        <OrangeButton btnTitle={"Continue"} onPress={() => onSubmit()} disable={false} />
                        <TouchableOpacity onPress={navigationWallet} style={{ marginVertical: spacing.s }}>
                            <Text style={[text.medium, { color: colors.black, alignSelf: 'center' }]}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: "white",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "#fff",
        paddingHorizontal: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 200,
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#000",
        borderRadius: 3,
    },
    text: {
        color: "#bbb",
        fontSize: 24,
        marginTop: 100,
    },
    navText: {
        fontWeight: '500',
        color: colors.black,
        marginHorizontal: spacing.m
    },
    btnContainer: {
        position: 'absolute',
        width: "100%"
    },
    borderStyle: {
        borderColor: colors.mustard,
        color: colors.black,
        borderWidth: 1,
        height: 54,
        width: "90%",
        alignSelf: 'center',
        paddingHorizontal: spacing.m,
        fontSize: sizes.h3 - 2
    },
    inputLabel: {
        fontWeight: '400',
        color: colors.black,
        margin: spacing.s
    },
    titleLabel: {
        fontWeight: '700',
        color: colors.black,
        margin: spacing.s,
        alignSelf: 'center',
        marginBottom: spacing.m
    },
    infoLabel: {
        fontWeight: '400',
        color: colors.grayText,
        marginHorizontal: spacing.m,
        marginVertical: spacing.s,
        textAlign: 'center',
        alignSelf: 'center'
    },
    walletOptions: {
        height: 53,
        width: 53,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.gray
    },
    iconSpacing: {
        justifyContent: 'center'
    },
    cardTxt: {
        fontWeight: '400',
    },
    cardTxtStyle: {
        alignSelf: 'center',
        color: colors.grayText
    },
});