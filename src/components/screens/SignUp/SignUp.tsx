import { SafeAreaView, StyleSheet, View, useWindowDimensions, Text, ScrollView, Alert, BackHandler, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
// import Stepper from "../../components/Stepper";
// import InputText from "../../components/InputText";
// import MyButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { SharedElement } from "../../navigator/ScreenNavigation";
import { SharedElement } from "../../navigations/Navigation";
import { SignUpElement } from "../../navigations/SignupNavigation";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SetStateAction, useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
// import { colors, spacing, text, verticalScale } from "../../constants/theme";
// import { colors, spacing, text, verticalScale } from "../../../app/constants/theme";


// import SignUpTemplate from "../../components/Template/SignUpTemplate";

import BtnBack from "../../common/BtnBack";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store";
// import { genderList } from "../../assets/data/data";
import { Dropdown } from "react-native-element-dropdown";
// import {  setNumber, setSignUp } from "../../redux/Slice/registrationSlice";
// import { FindID, getAllPosts, updateRegistration } from "../../watermelonDB/model/model";
// import LoaderComponents from "../../components/Loader";
// import { insertRequirements, sampleCreate } from "../../watermelonDB/model/requirementsModel";
import React from "react";
import SignUpTemplate from "../../templates/SignUpTemplate";
import Stepper from "../../common/Stepper";
import InputText from "../../common/InputText";
import OrangeButton from "../../common/OrangeButton";
import { cityList, genderList } from "../../../app/assets/data/data";
import { FindID, patchAppInfo, createRegistration } from "../../../app/watermelonDB/model/model";
import { RootState } from "../../../app/redux/store";
import { AlertModal, ConfirmAlertModal } from "../../../app/constants/AlertModal";
import { empty_fields, singup_back, singup_changeNumber, wrong_confirmation } from "../../../app/constants/AlertMsg";
import BirthdayValidation from "../../../utils/BirthdayValidation";
import EmailValidation from "../../../utils/EmailValidation";
import HelperText from "../../common/HelperText";
import ConfirmValidation from "../../../utils/ConfirmValidation";
import uuid from 'react-native-uuid';
import CrashlyticsErrorHandler from "../../../utils/Crashlytics/CrashlyticsErrorHandler";
import axios from "axios";
import { z_app, z_app_type, z_app_version, z_app_code, SIGN_APP_KEY, SIGN_APP_SECRET } from "../../../Config";
// import { SignInRequest } from "../../../../services/api_services";
import { SignInRequest, SignUpRequest } from "../../../services/api_services";
import * as Keychain from "react-native-keychain";
import { colors, spacing, text, verticalScale } from "../../../app/constants/theme";
import { background_steps } from "../../../app/assets/img/images";
import CustomModal from "../../common/CustomModal";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;




export default function SignUp() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationSignup = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDropDown, setShowDropDown] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const number_register = useSelector((state: RootState) => state.registrationCounter.regNumber);
    const [isFetchID, setIsFetchID] = useState<string | undefined>();
    const [isWarning, setIsWarning] = useState(false);
    const [dialogWarning, setDialogWarning] = useState(false);
    // const tableID = useSelector((state:RootState) =>state.appInfo.id);
    // const token = useSelector((state: RootState) => state.sendOTP.token);
    const register_number = useSelector((state: RootState) => state.registrationCounter.regNumber);
    const regDeviceID = useSelector((state: RootState) => state.registrationCounter.regDeviceID);
    const signup_id = useSelector((state: RootState) => state.registrationCounter.signup_id);
    const token = useSelector((state: RootState) => state.registrationCounter.token);

    const numberRegister = {
        regNum: number_register
    }

    const [isForm, setIsForm] = useState({
        register_number: "",
        referral_code: "",
        firstname: "",
        lastname: "",
        email: "",
        cemail: "",
        password: "",
        confirmPassword: "",
        gender: "",
        city: "",
        account_status: "",
    })
    const [isFormValid, setIsFormValid] = useState({
        register_number: false,
        referral_code: false,
        firstname: false,
        lastname: false,
        email: false,
        cemail: false,
        password: false,
        confirmPassword: false,
        gender: false,
        city: false,
        account_status: false,
    })

    //? Save to local db
    const create_registration_params = {
        register_number: register_number,
        // device_id: regDeviceID,
        profile: "sample",
        referral_code: isForm.referral_code,
        firstname: isForm.firstname,
        lastname: isForm.lastname,
        email: isForm.email,
        // password:isForm.password,
        gender: isForm.gender,
        city: isForm.city,
        // account_status:"REGISTERED"

    }

    //? Send to Api for validation
    const create_registration_request = {
        firstname: isForm.firstname,
        lastname: isForm.lastname,
        email: isForm.email,
        password: isForm.password,
        confirm_password: isForm.confirmPassword,
        referral_code: isForm.referral_code,
        pns_token: "",
        city: isForm.city,
        gender: isForm.gender,
        uuid: signup_id,
        bearer_token: token
    }


    const [alertMsg, setAlertMsg] = useState('');

    const onSubmit = async () => {
        if ((isForm.firstname === "") || (isForm.lastname === "") || (isForm.email === "") || (isForm.password === "") || (isForm.confirmPassword === "") || (isForm.cemail === "") || (isForm.gender === "") || (isForm.city === "") || ConfirmValidation(isForm.email, isForm.cemail) || ConfirmValidation(isForm.password, isForm.confirmPassword)) {
            navigationSignup.navigate("AlertModalError", { message: "empty" })

            if (isForm.firstname === "") {
                setIsFormValid({ ...isFormValid, firstname: true, })
                setAlertMsg("Maglagay ng Firstname")
                navigationSignup.navigate("AlertModalError", { message: "firstname" })
            } else if (isForm.lastname === "") {
                setIsFormValid({ ...isFormValid, lastname: true, })
                setAlertMsg("Maglagay ng Lastname")
                navigationSignup.navigate("AlertModalError", { message: "lastname" })
            } else if (isForm.email === "") {
                setIsFormValid({ ...isFormValid, email: true, })
                setAlertMsg("Maglagay ng Email")
                navigationSignup.navigate("AlertModalError", { message: "email" })
            } else if (isForm.password === "") {
                setIsFormValid({ ...isFormValid, password: true, })
                setAlertMsg("Maglagay ng Password")
                navigationSignup.navigate("AlertModalError", { message: "password" })
                // }else if(isForm.birthday === ""){
                //     setIsFormValid({...isFormValid, birthday:true,})
            } else if (isForm.gender === "") {
                setIsFormValid({ ...isFormValid, gender: true, })
                setAlertMsg("Maglagay ng Gender")
                navigationSignup.navigate("AlertModalError", { message: "gender" })
            } else if (isForm.city === "") {
                setIsFormValid({ ...isFormValid, city: true })
                setAlertMsg("Maglagay ng City")
                navigationSignup.navigate("AlertModalError", { message: "city" })
            }
        }
        else {
            // onSubmitData(isForm); // setting the loader and timeout
            try {
                const response = await SignUpRequest(create_registration_request)
                if (response.code == '200') {
                    console.log("data submitted", create_registration_params);
                    const access_token = response.data.access_token;
                    const refresh_token = response.data.refresh_token;
                    const tokens = {
                        access_token: access_token,
                        refresh_token: refresh_token
                    }
                    createRegistration(create_registration_params);
                    navigationStart()
                }
                else {
                    if (response.code) {
                        navigation.navigate('AlertModalError', { message: response.code })
                    } else {
                        if (response.status_code){
                            navigation.navigate('AlertModalError', { message: response.status_code })
                        }else{
                            navigation.navigate('AlertModalError', { message: "email_exist" })
                        }
                    }
                }

            } catch (error: any) {
                navigationSignup.navigate('AlertModalError', { message: error.code })
                console.log(error.response.data)
            }
            // // patchAppInfo(app_info_params);
            // navigation.navigate('Login');
        }
    }

    const referral_codeOnChange = (value: any) => {
        setIsForm({ ...isForm, referral_code: value })
    }
    const firstnameOnChange = (value: any) => {
        setIsForm({ ...isForm, firstname: value })
        setIsFormValid({ ...isFormValid, firstname: false })
    }
    const lastnameOnChange = (value: any) => {
        setIsForm({ ...isForm, lastname: value })
        setIsFormValid({ ...isFormValid, lastname: false })
    }
    const emailOnChange = (value: any) => {
        setIsForm({ ...isForm, email: value })
        setEmail(value)
        setIsFormValid({ ...isFormValid, email: false })
    }
    const cemailOnChange = (value: any) => {
        setIsForm({ ...isForm, cemail: value })
        setIsFormValid({ ...isFormValid, cemail: false })
    }
    const passwordOnChange = (value: any) => {
        setIsForm({ ...isForm, password: value })
        setIsFormValid({ ...isFormValid, password: false })
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        if (!passwordRegex.test(value)) {
        setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&.)');
        } else {
        setPasswordError('');
        }
    }
    const genderOnChange = (value: any) => {
        setIsForm({ ...isForm, gender: value.value })
        setIsFormValid({ ...isFormValid, gender: false })
    }
    const cityOnChange = (value: any) => {
        setIsForm({ ...isForm, city: value.value })
        setIsFormValid({ ...isFormValid, city: false })
    }
    const cpassOnChange = (value: any) => {
        setIsForm({ ...isForm, confirmPassword: value })
        setIsFormValid({ ...isFormValid, confirmPassword: false })
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

    const navigationStart = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const [passwordError, setPasswordError] = useState('');
    const [showError, setShowError] = useState(false); // Controls delayed visibility
    // Delay helper text visibility by 500ms
    useEffect(() => {
        const timer = setTimeout(() => {
        setShowError(!!passwordError); // Convert to boolean
        }, 500);

        return () => clearTimeout(timer); // Cleanup timeout on re-render
    }, [passwordError]);
    
    const navigationBack = () => {
        navigationSignup.reset({
            index:0,
            routes: [{name: 'Send_OTP'}],
        })
    }

    const [email, setEmail] = useState(isForm.email);
    const [showHelperText, setShowHelperText] = useState(false);

    useEffect(() => {
        setShowHelperText(false); // Hide helper text while typing

        const timer = setTimeout(() => {
            setShowHelperText(true); // Show helper text after 500ms of no typing
        }, 500);

        return () => clearTimeout(timer); // Clear timeout if user types again
    }, [email]);

    useEffect(() => {
        PreventBack();
        FindID(numberRegister).then((data) => {
            setIsFetchID(data.toLocaleString());
        })
    }, [])

    return (
        <>

            <ImageBackground source={background_steps}>
                {/* <SignUpTemplate onSubmit={onSubmit} submitName={"Sign Up"} submitEnable={false} backSubmit={() => {}}> */}
                {/* <LoaderComponents showComp={isLoader}/> */}
                <ScrollView>
                <ConfirmAlertModal modalVisibile={isWarning} alertMessage={singup_changeNumber} yesOnpress={navigationBack} noOnpress={() => setIsWarning(false)} />

                {/* <BtnBack btnName={"Back"} onPress={() => navigationSignup.navigate("AlertModalError", { message: "signup_required" })} /> */}
                <View style={styles.contentBackground}>
                        <View>
                            <Text style={[text.largePlus, styles.titleText]}>Sign Up</Text>
                            <View style={{ height: '10%' }}>
                                <View style={{ position: 'absolute', alignSelf: 'center' }}>
                                    <Stepper StepActive={2} />
                                </View>
                            </View>
                            <Text style={[styles.description, text.mediumLarge, { fontWeight: '700', color: colors.grayText }]}>Enter Details</Text>
                            <View style={{ paddingHorizontal: spacing.m }}>
                                <View style={styles.spacingH}>
                                    <Text style={[styles.headerText, text.medium, { fontWeight: '700', color: colors.black }]}>Account Details</Text>
                                    <View style={{margin:10}}/>
                                    <InputText InputLabel="Firstname*" keyboardType="default" secureTextEntry={false} Editable={true} Value={isForm.firstname} onChangeText={firstnameOnChange} isPhoneNumber={false} Placeholder={"Enter your First Name"} maxLength={50} />
                                    <HelperText visibility={isFormValid.firstname} caption={alertMsg} />
                                </View>
                                <View style={styles.spacingH}>
                                    <InputText InputLabel="Lastname*" keyboardType="default" secureTextEntry={false} Editable={true} Value={isForm.lastname} onChangeText={lastnameOnChange} isPhoneNumber={false} Placeholder={"Enter your Last Name"} maxLength={50} />
                                    <HelperText visibility={isFormValid.lastname} caption={alertMsg} />
                                </View>
                                <View style={styles.spacingH}>
                                    <InputText InputLabel="Email" keyboardType="email-address" secureTextEntry={false} Editable={true} Value={isForm.email} onChangeText={emailOnChange} isPhoneNumber={false} Placeholder={"Enter your Email"} maxLength={50} />
                                    {showHelperText &&
                                        (
                                        <HelperText visibility={EmailValidation(isForm.email)} caption={"Invalid Email format. (ex. email@email.com)"} />
                                        )}

                                    <HelperText visibility={isFormValid.email} caption={alertMsg} />
                                </View>
                                <View style={styles.spacingH}>
                                    <InputText InputLabel="Confirm Email" keyboardType="default" secureTextEntry={false} Editable={true} Value={isForm.cemail} onChangeText={cemailOnChange} isPhoneNumber={false} Placeholder={"Confirm your Email"} maxLength={50} />
                                    <HelperText visibility={ConfirmValidation(isForm.email, isForm.cemail)} caption={"Hindi magkapareho ang mga email address"} />
                                </View>
                                <View style={styles.spacingH}>
                                    <InputText InputLabel="Password" keyboardType="default" secureTextEntry={true} Editable={true} Value={isForm.password} onChangeText={passwordOnChange} isPhoneNumber={false} Placeholder={"Enter your Password"} maxLength={50} />
                                    {/* <HelperText visibility={isFormValid.password} caption={empty_fields} /> */}
                                    {showError ? <HelperText visibility={passwordError} caption={passwordError} /> : null}
                                </View>
                                <View style={styles.spacingH}>
                                    <InputText InputLabel="Confirm Password" keyboardType="default" secureTextEntry={true} Editable={true} Value={isForm.confirmPassword} onChangeText={cpassOnChange} isPhoneNumber={false} Placeholder={"Confirm your Password"} maxLength={50} />
                                    <HelperText visibility={isFormValid.confirmPassword} caption={alertMsg} />
                                    <HelperText visibility={ConfirmValidation(isForm.password, isForm.confirmPassword)} caption="Hindi magkapareho ang password." />

                                </View>
                                {/* <View style={styles.spacingH}>
                                    <TouchableOpacity onPress={showDatepicker}>
                                        <TextInput style={styles.inputText}
                                            label={"Birthday"}
                                            value={isForm.birthday}
                                            mode='outlined'
                                            secureTextEntry={false}
                                            editable={false}
                                            underlineColorAndroid={'rgba(0,0,0,0)'}
                                            theme={{ colors: { primary: 'black' }, roundness: 20 }}
                                            keyboardType={"default"}
                                        />
                                    </TouchableOpacity>
                                    <HelperText visibility={BirthdayValidation(isForm.birthday)} caption={"Your age must be 18 above!"}/>
                                    <HelperText visibility={isFormValid.birthday} caption={"Your age must be 18 above!"}/>
                                </View> */}
                                <View style={styles.spacingH}>
                                        {/* <Dropdown
                                            data={genderList}
                                            maxHeight={300}
                                            style={styles.dropdown}
                                            itemTextStyle={{ color: colors.black }}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            placeholder={"Gender"}
                                            value={isForm.gender}
                                            onFocus={() => setShowDropDown(true)}
                                            onBlur={() => setShowDropDown(false)}
                                            onChange={genderOnChange}
                                            valueField={'value'} labelField={"key"} /> */}
                                            <CustomModal
                                                label={'Gender'}
                                                onChangeText={(value: any) => setIsForm({ ...isForm, gender: value })}
                                                datas={genderList}
                                                value={isForm.gender}
                                                placeholder="Please select a gender"
                                                />
                                    <HelperText visibility={isFormValid.gender} caption={alertMsg} />
                                </View>
                                <View style={styles.spacingH}>
                                        {/* <Dropdown
                                            data={cityList}
                                            maxHeight={300}
                                            style={styles.dropdown}
                                            itemTextStyle={{ color: colors.black }}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            placeholder={"City"}
                                            value={isForm.city}
                                            onFocus={() => setShowDropDown(true)}
                                            onBlur={() => setShowDropDown(false)}
                                            onChange={cityOnChange}
                                            valueField={'value'} labelField={"value"} /> */}
                                            <CustomModal
                                                label={'City'}
                                                onChangeText={(value: any) => setIsForm({ ...isForm, city:value })}
                                                datas={cityList}
                                                value={isForm.city}
                                                placeholder="Please select a city"
                                            />
                                    <HelperText visibility={isFormValid.city} caption={alertMsg} />
                                </View>
                                {/* <View style={styles.spacingH}>
                                    <InputText InputLabel="City" keyboardType="default" secureTextEntry={false} Editable={true} Value={isForm.city} onChangeText={cityOnChange} />
                                    <Text style={[styles.Passdescription, text.small,{}]}>Sa pag-click sa Sign Up, sumasang-ayon ka sa aming mga </Text>
                                </View> */}
                                <View style={styles.spacingH}>
                                    {/* <Text style={[styles.headerText, text.medium, { fontWeight: '700', color: colors.black, marginBottom: spacing.s }]}>Did someone refer you?</Text> */}
                                    <Text style={[styles.headerText, text.medium, { fontWeight: '700', color: colors.black, marginBottom: spacing.s }]}>Got a referral code?</Text>
                                    {/* <Text style={[styles.headerText, text.small, { fontWeight: '600', marginBottom: spacing.s, color: colors.grayText }]}>Enter the referral code for exclusive promos and Lightning Points!</Text> */}
                                    <InputText InputLabel="Referral Code" keyboardType='default' secureTextEntry={false} Editable={true} Value={isForm.referral_code} onChangeText={referral_codeOnChange} isPhoneNumber={false} Placeholder={"Enter Referral Code"} maxLength={50} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: spacing.s, marginBottom: "40%" }}>
                            {/* <MyButton btnTitle="Submit" onPress={() => { onSubmit() }} /> */}
                            <OrangeButton 
                                btnTitle={"Sign up"} 
                                onPress={onSubmit} 
                                disable={
                                    !isForm.firstname
                                    || !isForm.lastname
                                    || !isForm.email
                                    || !isForm.cemail
                                    || EmailValidation(isForm.email)
                                    || EmailValidation(isForm.cemail)
                                    || ConfirmValidation(isForm.email, isForm.cemail)
                                    || !isForm.password
                                    || !!passwordError
                                    || ConfirmValidation(isForm.password, isForm.confirmPassword)
                                    || !isForm.gender
                                    || !isForm.city
                                } 
                                />
                        </View>
                    </View>
                </ScrollView>
                {/* </SignUpTemplate> */}
            </ImageBackground>

        </>
    )
}


const styles = StyleSheet.create({
    spacingH: {
        marginTop: spacing.m
    },
    viewBackground: {
        backgroundColor: '#FFAC13',
        width: wWidth,
        height: wHeight,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.black
    },
    selectedTextStyle: {
        fontSize: 16,
        color: colors.black
    },
    dropdown: {
        width: "100%",
        height: verticalScale(48),
        alignSelf: 'center',
        borderColor: colors.black,
        borderWidth: 0.5,
        backgroundColor: colors.light,
        borderRadius: 20,
        padding: 12,
        color: colors.black,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    contentBackground: {
        marginBottom: -20,
        height: 'auto',
        width: wWidth,
        backgroundColor: '#FDFDFD',
        borderTopRightRadius: 50,
        marginTop: wHeight / 30,
        borderTopLeftRadius: 50
    },
    titleText: {
        marginTop: 30,
        textAlign: 'center',
        color: '#171717',
        fontWeight: '700',
    },
    description: {
        // margin: 20,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular'
    },
    headerText: {
        marginLeft: spacing.s,
        fontFamily: 'OpenSans-Regular'
    },
    Passdescription: {
        marginTop: 5,
        textAlign: 'justify',
        width: "100%",
        paddingHorizontal: spacing.s,
        alignSelf: 'center'
    },

    inputText: {
        backgroundColor: colors.light,
        borderRadius: 40,
        fontFamily: 'OpenSans-Regular'
    },
})

function setDate(currentDate: any) {
    throw new Error("Function not implemented.");
}
