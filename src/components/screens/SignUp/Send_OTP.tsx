import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import InputText from "../../components/InputText";
import InputText from "../../common/InputText";
import Stepper from "../../common/Stepper";
import { sizes, colors, spacing, text } from "../../../app/constants/theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store";
import BtnBack from "../../common/BtnBack";
// import SignUpTemplate from "../../components/Template/SignUpTemplate";
import SignUpTemplate from "../../templates/SignUpTemplate";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../../navigations/Navigation";
import { SignUpElement } from "../../navigations/SignupNavigation";
// import { setDeviceID, setNumber } from "../../redux/Slice/registrationSlice";
import DeviceInfo from "react-native-device-info";
// import OrangeButton from "../../components/OrangeButton";
import OrangeButton from "../../common/OrangeButton";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { setDeviceID, setNumber, setOTP, setUUID } from "../../../app/redux/reducers/registrationSlice";
import InputTextNumber from "../../common/inputTextNumber";
import NumberValidation from "../../../utils/NumberValidation";
import HelperText from "../../common/HelperText";
import { empty_fields, invalid_number } from "../../../app/constants/AlertMsg";
import { existNumber, getCountAppUpdates, getCountServices } from "../../../app/watermelonDB/model/model";
import appInfoSlice from "../../../app/redux/reducers/appInfoSlice";
import { SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type, z_app_version } from "../../../Config";
import axios from "axios";
import uuid from 'react-native-uuid';
import { sendOTPFetch, setToken } from "../../../app/redux/reducers/sendOTPSlice";
import { json } from "@nozbe/watermelondb/decorators";
import { FetchData, SendOTPRequest } from "../../../services/api_services";
import OtpEntry from "./OtpEntry";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Send_OTP() {
    const navigation = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const navigationMain = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const [androidID, setAndroidID] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [isDuplicated, setIsDuplicated] = useState<string>();
    const [isWarning, setIsWarning] = useState(false);
    const usedispatch = useDispatch<AppDispatch>();

    const [isForm, setIsForm] = useState({
        register_number: "",
    })

    const register_number_params = {
        register_number: isForm.register_number,
    }

    DeviceInfo.getAndroidId().then((androidId) => {
        setAndroidID(androidId);
    });

    const numberOnChange = (value: any) => {
        setPhoneNumber(value)
        setIsForm({ ...isForm, register_number: value });
    }

    // todo: request send to the api
    const send_otp_request_params = {
        register_number: isForm.register_number,
        uuid: uuid.v4()
    }

    const navigationStart = () => {
        navigationMain.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      };

    useEffect(() => {
        existNumber(register_number_params).then(value => {
            // console.log("\n\n\nvalue =",value);
        })
        async function numberExist() {
            const exist = await existNumber(register_number_params);
            return exist
        }
        async function enableButton(data: { register_number: string, }) {
            const exist = await existNumber(register_number_params);
            const enableB = new Promise((resolve, reject) => {
                if (((data.register_number === "") || (data.register_number === null) || (exist == 1) || (NumberValidation(isForm.register_number) ))) {
                    setIsVisible(true);
                    (exist == 1) ? setIsWarning(true)
                        : (NumberValidation(isForm.register_number)) ? setIsWarning : setIsWarning(false)
                } else {
                    setIsVisible(false);
                    setIsWarning(false);
                }
            })
        }
        enableButton(isForm)
    }, [isForm])

    //? Save the data to the redux
    //? register number and device id
    const onSubmit = async() => {
        try {
            const response = await SendOTPRequest(send_otp_request_params)
            console.log("\n\n response data", response)
            if(response.status_code == '200' || response.code == '200'){
                usedispatch(setDeviceID(androidID));
                usedispatch(setNumber(isForm.register_number));
                usedispatch(setUUID(response.data.token));
                usedispatch(setOTP(response.data.otp));
                navigation.navigate('OtpEntry');
            }else{
                if(response.code){
                    navigation.navigate('AlertModalError',{message:response.code})
                    }else{
                        navigation.navigate('AlertModalError',{message: "already_registered"})
                    }
            }
        } catch (error:any) {
            navigation.navigate('AlertModalError',{message: "Error in SendOTPRequest"})
            console.log(error.response)
        }
    }

    async function count() {
        const data = await getCountServices();
        const data_app_updates = await getCountAppUpdates();
        return console.log("services count", data, "appupdates", data_app_updates);
    }
    const isPhoneNumberValid = (number: string) => {
        return /^9[0-9]{9}$/.test(number); // Starts with 9 and has exactly 10 digits
    };

    const [phoneNumber, setPhoneNumber] = useState(isForm.register_number);
    const [showHelperText, setShowHelperText] = useState(false);

    useEffect(() => {
        setShowHelperText(false); // Hide helper text while typing

        const timer = setTimeout(() => {
            setShowHelperText(true); // Show helper text after 500ms of no typing
        }, 500);

        return () => clearTimeout(timer); // Clear timeout if user types again
    }, [phoneNumber]);

    count();

    return (
        <>
            <SignUpTemplate 
                onSubmit={onSubmit} 
                backSubmit={navigationStart}
                // backSubmit={() =>{}}
                submitName={"Continue"} 
                // submitEnable={isVisible}
                submitEnable={!isPhoneNumberValid(isForm.register_number)}
                >
                <ScrollView>
                    {/* <BtnBack btnName={"Back"} onPress={() => { navigation.navigate('Login') }} /> */}
                    <View style={styles.contentBackground}>
                        <View>
                            <Text style={[styles.titleText, text.extraL]}>Sign Up</Text>
                            <Text style={[text.normal, styles.description, { color: colors.grayText }]}> Join for exclusive convenience and savings!.</Text>
                            <View style={{height:"15%"}}>
                                <View style={{ position: 'absolute', alignSelf: 'center' }}>
                                    <Stepper StepActive={0} />
                                </View>
                            </View>
                            <Text style={styles.otpTitle}>OTP Verification</Text>
                            {/* <Text style={[styles.otpdescription, text.medium]}>Padadalhan ka namin ng one-time code sa iyong mobile number.</Text> */}
                            <Text style={[styles.otpdescription, text.smallPlus]}>Magpapadala kami ng one-time code sa iyong phone number para laging safe ang iyong account.</Text>
                            <View style={{ paddingHorizontal: spacing.m, marginVertical: spacing.l }}>
                                {/* <InputTextNumber InputLabel="Ibigay ang Contact Number" keyboardType='numeric' secureTextEntry={false} Editable={true} Value={isForm.register_number} onChangeText={numberOnChange} /> */}
                                <InputText InputLabel={"Phone Number:"} keyboardType={"numeric"} secureTextEntry={false} Editable={true} Value={isForm.register_number} isPhoneNumber={true} onChangeText={numberOnChange} Placeholder={""} maxLength={10} />
                                <View style={{ position: 'absolute', top: spacing.xxl - 15, left: spacing.m }}>
                                    {/* <HelperText visibility={NumberValidation(isForm.register_number)} caption={"Invalid number format"} /> */}
                                    {showHelperText && !isPhoneNumberValid(phoneNumber) && (
                                    <HelperText visibility={!isPhoneNumberValid(isForm.register_number)} caption={"Ilagay ang iyong 10-digit mobile number. (ex. 9xxxxxxxxx)"} />
                                    )}
                                    {/* <HelperText visibility={isWarning} caption={"The mobile number you enter is already registered"} /> */}
                                </View>
                            </View>
                        </View>
                        {/* <View style={{ marginTop: wHeight / 3 - 50, position: 'relative', bottom: 65, width: "100%" }}>
                            <OrangeButton btnTitle={"Send OTP"} onPress={onSubmit} disable={isVisible} />
                        </View> */}
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
        color: '#171717',
        fontWeight: '700',
    },
    subTitle: {
        color: '#FFAC13',
        fontWeight: '700',
        fontFamily: 'OpenSans-Regular'
    },
    description: {
        fontWeight: '600',
        textAlign: 'center',

    },
    otpTitle: {
        marginTop: 25,
        fontSize: sizes.Large,
        fontWeight: '700',
        textAlign: 'center',
        color: '#171717',
        fontFamily: 'OpenSans-Regular'
    },
    otpdescription: {
        fontWeight: '600',
        color: colors.grayText,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    btnBack: {
        color: 'white',
        marginTop: 25,
        marginLeft: 20,
        marginBottom: 0,

    },
    contentBackground: {
        height: wHeight- wHeight/11,
        width: wWidth,
        backgroundColor: '#FDFDFD',
        marginTop: wHeight / 30,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
})