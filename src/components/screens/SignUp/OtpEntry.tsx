import { Alert, BackHandler, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Stepper from "../../common/Stepper"
import { OtpInput } from "react-native-otp-entry"
import { colors, sizes, spacing, text } from "../../../app/constants/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OrangeButton from "../../common/OrangeButton";
import { useNavigation } from "@react-navigation/native";
import { SetStateAction, useEffect, useRef, useState } from "react";
import React from "react";
import { SignUpElement } from "../../navigations/SignupNavigation";
import SignUpTemplate from "../../templates/SignUpTemplate";
import BtnBack from "../../common/BtnBack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { getServices } from "../../../app/watermelonDB/model/model";
import { ConfirmAlertModal } from "../../../app/constants/AlertModal";
import { singup_changeNumber } from "../../../app/constants/AlertMsg";
import ResendComponent from "../../common/CountDown";
import { SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type, z_app_version } from "../../../Config";
import axios from "axios";
import { OTPEntryRequest } from "../../../services/api_services";
import { setSignupID, setToken } from "../../../app/redux/reducers/registrationSlice";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function OtpEntry() {
    // const navigation = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const navigation = useNavigation();
    const navigationSignUp = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const deviceID = useSelector((state: RootState) => state.registrationCounter.regDeviceID);
    const register_number = useSelector((state: RootState) => state.registrationCounter.regNumber);
    const generated_uuid = useSelector((state: RootState) => state.registrationCounter.uuid);
    const generated_otp = useSelector((state: RootState) => state.registrationCounter.regOTP);
    const [isWarning, setIsWarning] = useState(false);
    const [isFetchToken, setIsFetchToken] = useState<null | any>(null);
    const [isOTP, setIsOTP] = useState("");
    const default_otp = useRef<any>(null)
    const usedispatch = useDispatch<AppDispatch>();

    //? Params that will pass to function in model
    const registerNumberParams = {
        register_number: register_number,
        device_id: deviceID
    }

    //? Request if the otp  is correct
    const otp_entry_request = {
        register_number: register_number,
        otp: isOTP,
        uuid: generated_uuid
    }

    const onSubmit = async() => {
        default_otp.current.clear(); // Clear OTP input field
        try {
            const response = await OTPEntryRequest(otp_entry_request);
            console.log("\n\notp entry",response);
            if(response.code == 200){
                const save_signup_id= usedispatch(setSignupID(response.data.signup_id))
                const save_token = usedispatch(setToken(response.data.token))

                if(save_signup_id || save_token){
                    navigationSignUp.navigate("SignUp");
                }
            }
            else{
                if(response == 400){
                    navigationSignUp.navigate("AlertModalError",{message:"wrong_otp", })
                } else {
                    if(response.code){
                        navigationSignUp.navigate('AlertModalError',{message:response.code})
                      }else{
                        navigationSignUp.navigate("AlertModalError", { message: "wrong_otp" })
                      }
                }
            }
        } catch (error:any) {
            if (error){
                navigationSignUp.navigate("AlertModalError",{message: error.code})
            }
        }
    }


    const PreventBack = () => {
        // PreventBack(isRedirect);
        const backAction = () => {
            setIsWarning(true);//toggle the warning alert
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }

    const navigationBack = () => {
        navigationSignUp.reset({
            index:0,
            routes: [{name: 'Send_OTP'}],
        })
    }

    // //Prevent when get back
    React.useEffect(() => {
        PreventBack()

        default_otp.current.setValue(isOTP)
    }, []);

    return (
        <>
            <SignUpTemplate 
                onSubmit={onSubmit} 
                backSubmit={() => setIsWarning(true)} 
                submitName={"Submit"} 
                submitEnable={false} 
                >
                <ScrollView>
                <ConfirmAlertModal modalVisibile={isWarning} alertMessage={singup_changeNumber} yesOnpress={navigationBack} noOnpress={() => setIsWarning(false)} />
                    {/* <BtnBack btnName={"Back"} onPress={() => setIsWarning(true)} /> */}
                    {/* <View style={styles.contentBackground}> */}
                    <View style={{height:'auto', marginBottom:spacing.xxl}}>
                        <View>
                            <Text style={styles.titleText}>Sign up</Text>
                            <View style={{ height: "15%" }}>
                                <View style={{ position: 'absolute', alignSelf: 'center' }}>
                                    <Stepper StepActive={1} />
                                </View>
                            </View>
                            <Text style={[styles.otpTitle, text.large]}>Enter OTP</Text>
                            <Text style={[styles.otpdescription, text.normal]}>Ilagay ang one-time code na ipinadala sa iyong mobile number +63{register_number}.</Text>
                            <OtpInput
                                numberOfDigits={6}
                                focusColor='#FFAC13'
                                focusStickBlinkingDuration={500}
                                onTextChange={(text) => setIsOTP(text)}
                                // onFilled={(text) => console.log(`OTP is: ${text}`)}
                                ref={default_otp}
                                theme={{
                                    containerStyle: OTP.container,
                                    inputsContainerStyle: OTP.inputsContainer,
                                    pinCodeContainerStyle: OTP.pinCodeContainer,
                                    pinCodeTextStyle: OTP.pinCodeText,
                                    focusStickStyle: OTP.focusStick,
                                    focusedPinCodeContainerStyle: OTP.activePinCodeContainer
                                }}
                            />
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Text style={[text.normal, styles.description, { color: colors.grayText }]}>Walang natanggap na code?</Text>
                                {/* Resend Component */}
                                <ResendComponent />
                            </View>
                        </View>


                        <View style={{ marginTop: wHeight / 3, position: 'relative', bottom: 100, width: "100%" }}>
                            {/* <Text style={[text.normal, styles.description, { color: colors.red }]}>
                                {errorTxt}
                            </Text> */}
                            {/* <MyButton btnTitle="Submit" onPress={onSubmit} /> */}
                            {/* <OrangeButton btnTitle={"undefined"} onPress={() => navigation.navigate('AlertModalError', {message: "message herre"})} disable={false}/> */}
                        </View>
                    </View>
                </ScrollView>
            </SignUpTemplate>
        </>
    )
}


const styles = StyleSheet.create({
    viewBackground: {
        backgroundColor: '#FFAC13',
        width: wWidth,
        height: wHeight,
    },
    titleText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: wHeight / 20,
        color: '#171717',
        fontWeight: '700',
        fontFamily: 'OpenSans-Regular'
    },
    description: {
        fontWeight: '600',
        textAlign: 'center',
    },
    otpTitle: {
        marginTop: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: '#171717',
    },
    otpdescription: {
        fontWeight: '600',
        textAlign: 'center',
        color: colors.grayText,
        marginLeft: 20,
        marginRight: 20,
    },
    resend: {
        fontSize: sizes.Normal,
        fontWeight: '700',
        textAlign: 'auto',
        color: colors.mustard,
        textDecorationLine: 'underline',
        fontFamily: 'OpenSans-Regular'
    },
    btnSpace: {
        marginTop: 250,
        flex: 1

    },
    btnBack: {
        color: 'white',
        //fontSize: wWidth * 0.09,
        marginTop: 25,
        marginLeft: 20,
        marginBottom: 0,
    },
    contentBackground: {
        height: "100%",
        width: wWidth,
        backgroundColor: '#FDFDFD',
        marginTop: wHeight / 30,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
})

const OTP = StyleSheet.create({
    container: {
        margin: 30
    },
    inputsContainer: {
        borderColor: '#FFAC13'
    },
    pinCodeContainer: {

    },
    pinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    }
})