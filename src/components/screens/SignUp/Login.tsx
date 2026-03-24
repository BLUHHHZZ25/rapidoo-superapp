import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import Cone_Background from '../components/Cone_Background';
// import InputText from '../components/InputText';
import InputText from '../../common/InputText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../../navigations/Navigation';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import OrangeButton from '../../common/OrangeButton';
// import ModalBottomUp from '../components/Template/ModalBottomUp';
import { ScrollView } from 'react-native';
import { OtpInput } from "react-native-otp-entry"
import {
  colors,
  moderateScale,
  sizes,
  spacing,
  text,
  verticalScale,
} from '../../../app/constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import CheckBoxComponent from '../../common/CheckBox';
import Cone_Background from '../../common/Cone_Background';
import { GetAccountID, clearBooking, createRegistration, deleteAllAccounts, deleteAppUpdates, findAccount, getAllBooking, getAllPosts, getAppInfo, getAppUpdates, getCountAppInfo, getCountAppUpdates, getCountServices, getIDAppUpdates, getIDServices, getIdAppInfo, getLatestBooking, getServices, patchAppUpdates, patchServices, postAppUpdates, postBooking, postServices } from '../../../app/watermelonDB/model/model';
import RecoverPassComponent from '../../common/RecoverPassComponent';
import { LoaderComponents } from '../../common/LoaderComponents';
import { setAccountId } from '../../../app/redux/reducers/registrationSlice';
import InputOrange from '../../common/InputOrange';
import { AlertModal, ConfirmAlertModal } from '../../../app/constants/AlertModal';
import { empty_fields, invalid_number, wrong_credentials } from '../../../app/constants/AlertMsg';
// import { HelperText } from 'react-native-paper';
import EmailValidation from '../../../utils/EmailValidation';
import HelperText from '../../common/HelperText';
import HelperTextGreen from '../../common/HelperTextGreen';
import SuperAppBackground from '../../common/SuperAppBackground';
import CrashlyticsErrorHandler from '../../../utils/Crashlytics/CrashlyticsErrorHandler';
import { setDeviceID, setTableID } from '../../../app/redux/reducers/appInfoSlice';
import Onload from '../Onload';
import ReportIssues from '../../../utils/Fetch/ReportIssues';
import axios from 'axios';
import { ForgotPassUpdate, ForgotPassVerify, GetAppUpdates, PostAppUpdates, SendOTPForgotPass, Services, SignInEmailRequest, SignInRequest } from '../../../services/api_services';
import * as Keychain from 'react-native-keychain'
import InputTextNumber from '../../common/inputTextNumber';
import ResendComponent from '../../common/CountDown';
import ConfirmValidation from '../../../utils/ConfirmValidation';
import NumberValidation from '../../../utils/NumberValidation';
import Config from 'react-native-config';
import { NotificationPermission, requestNotificationPermission } from '../../notification/NotificationPermission';
import Loading from '../Loading';
import { EMPTY_FIELDS, ERR_BAD_NETWORK, PHONE_NOT_EXIST, TRY_AGAIN, WRONG_CREDENTIALS } from '../../../app/constants/contants';
import SignupNavigation from '../../navigations/SignupNavigation';
import RedButton from '../../common/RedButton';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();

  //Add variable for the fields
  const [forgetpassword, setForgetPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const usedispatch = useDispatch<AppDispatch>();
  const [isExist, setIsExist] = useState<number | undefined>();
  const [isLoader, setIsLoader] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isWarningMSG, setIsWarningMSG] = useState(false);
  const [isWarningCaption, setIsWarningCaption] = useState("");
  
  const [isWarningMsg, setIsWarningMsg] = useState("");
  // TRIGGERS
  const [triggerAppUpdates, setTriggerAppUpdates] = useState<any | null>(null);
  const [triggerServices, setTriggerServices] = useState(false);

  // FORGOT PASSWORD
  const [isSendOTP, setISSendOTP] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [passSucess, setPassSuccess] = useState(false);

  const [phoneExist, setPhoneExist] = useState(false);

  const [pnsToken, setPnsToken] = useState<string | undefined>("");

  const [recoverPass, setRecoverPass] = useState({
    phone_number: "",
    otp: "",
    token: "",
    password: "",
    confirm_password: ""
  })

  const [formData, setFormData] = useState({
    regEmail: '',
    regPassword: '',
  });

  const [formDataValid, setFormDataValid] = useState({
    regEmail: false,
    regPassword: false
  });

  const emailParams = {
    email: formData.regEmail,
  }

  const findAccparams = {
    email: formData.regEmail,
    password: formData.regPassword
  }

  const signin_params_request = {
    email: formData.regEmail,
    password: formData.regPassword,
    pns_token: pnsToken
  }

  GoogleSignin.configure({
    webClientId: '222785080267-ju32c28etsevfmurrdfh7k5s1dtnqe00.apps.googleusercontent.com',
  });

  // On changText
  const onChangeCheck = () => setIsChecked(!isChecked);

  const onChangeEmail = (value: any) => {
    setFormData({ ...formData, regEmail: value })
    setFormDataValid({ ...formDataValid, regEmail: false });
  }

  const onChangePassword = (value: any) => {
    setFormData({ ...formData, regPassword: value });
    setFormDataValid({ ...formDataValid, regPassword: false });
  }

  const onChangeForgetPassword = (value: any) => {
    setForgetPassword(value);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleWarningMSG = () => {
    setIsWarningMSG(!isWarningMSG)
  }

  const navigationSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignupNavigation' }],
    });
  };

  const navigationHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation' }],
    });
  };

  // TODO: GENERATE PNS TOKEN
  useEffect(() => {
    async function getPns() {
      try {
        const data = await NotificationPermission()
        setPnsToken(data)
        console.log("____________", data)
      } catch (error) {
        console.log("get pns error", error);
      }
    }
    getPns()
    requestNotificationPermission()
  }, [])

  // TODO: FORGOT PASS >>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // const sendOTPFunc = async () => {
  //   try {
  //     if (recoverPass.phone_number == "") {
  //       console.log('Phone_number empty')
  //     } else {

  //       const send_otp_params = {
  //         phone_number: recoverPass.phone_number
  //       }
  //       const sendOTP = await SendOTPForgotPass(send_otp_params)

  //       console.log("send otp value", sendOTP);
  //       // console.log("send otp params",send_otp_params);

  //       if (sendOTP.code == "200") {
  //         setRecoverPass({ ...recoverPass, token: sendOTP.token })
  //         setISSendOTP(false)
  //         setIsOTP(true)
  //       } else if (sendOTP.code == "401") {
  //         console.log("message not exist")
  //         setPhoneExist(true)
  //       }
  //     }
  //   } catch (error: any) {
  //     console.log("error", error)
  //   }
  // }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const google_response = await GoogleSignin.signIn();
      console.log("response ");
      
      if (isSuccessResponse(google_response)) {
        console.log("\n\n ======== ",google_response.data.idToken);
        
        
        try {
          setIsLoader(true)
          const response = await SignInEmailRequest({idToken:google_response.data.idToken})
          // const response = await SignInRequest(signin_params_request)
          console.log("data_exist")
          const data_exist = await getAllPosts();
  
          // Error handler
          setIsLoader(false)
          console.log("\n\n response login", response)
          
          // navigation.navigate("AlertModalError",{message: response.status_code})
          if(response){
            if(response.code != "200"|| (response.status_code == "401")){
              const signout = await GoogleSignin.signOut()
              navigation.navigate("AlertModalError",{message: response.detail})

            }
          }
  
          if (!data_exist[0]) {
  
            if (response.code == '200') {
              setIsLoader(false)
              console.log("\n\ndata here", response.data);
              const access_token = response.data.access_token;
              const refresh_token = response.data.refresh_token;
              const tokens = {
                access_token: access_token,
                refresh_token: refresh_token,
                username: response.data.username
              }
              const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username }))
              if (token_keychain) {
                const save_profile_params = {
                  register_number: response.data.phone_number,
                  profile: response.data.profile_pic,
                  referral_code: "",
                  firstname: response.data.firstname,
                  lastname: response.data.lastname,
                  email: response.data.email,
                  gender: response.data.gender,
                  city: response.data.city
                }
                console.log("save profile", save_profile_params);
                const save_profile = await createRegistration(save_profile_params)
                navigationHome()
              }
            }
  
          } else {
            console.log("clicked")
            const number_db = response.data.phone_number;
            if (data_exist[0].register_number == number_db) {
  
              if (response.code == '200') {
                console.log("\n\ndata here", response.data);
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username, "account_id": response.data.id }))
                if (token_keychain) {
                  navigationHome()
                }
              }
  
            } else {
  
              const delete_accounts = await deleteAllAccounts()
              console.log("delete all accounts", delete_accounts);
  
              if (response.code == '200') {
                console.log("\n\ndata here", response.data);
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username }))
                if (token_keychain) {
  
                  const save_profile_params = {
                    register_number: response.data.phone_number,
                    profile: response.data.profile_pic,
                    referral_code: "",
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    gender: response.data.gender,
                    city: response.data.city
                  }
                  const save_profile = await createRegistration(save_profile_params)
                  // navigation.navigate("Home");
                    console.log("save profile", save_profile);
                  }
                }
              }
            }
  
          } catch (error) {
            console.log(error)
            setIsWarningMsg(empty_fields);
          setIsWarning(true)
        }
        
      }
    } catch (error) {
      console.log("erorr ", error);
    }
  };
  

  const sendOTPFunc = async () => {
    setRecoverPass({ ...recoverPass, phone_number: '' }); // Clear input field
    setIsLoader(true)
    try {
      if (recoverPass.phone_number == "") {
        setIsWarningCaption(EMPTY_FIELDS)
        toggleWarningMSG()
        console.log('Phone_number empty')
        setIsLoader(false)
      } else {
        const send_otp_params = {
          phone_number: recoverPass.phone_number
        }
        const sendOTP = await SendOTPForgotPass(send_otp_params)

        console.log("send otp value", sendOTP);
        // console.log("send otp params",send_otp_params);

        if (sendOTP.code == "200") {
          setRecoverPass({ ...recoverPass, token: sendOTP.token })
          setISSendOTP(false)
          setIsOTP(true)
          setIsLoader(false)
        } else{
          if(sendOTP.code){
            navigation.navigate('AlertModalError',{message: "unregister_number"})
          }else{
            navigation.navigate('AlertModalError',{message:sendOTP.status_code})
          }
          setIsLoader(false)
        }
      }
    } catch (error: any) {
      console.log("error", error)
      setIsWarningCaption(TRY_AGAIN)
      toggleWarningMSG
    }
  }

  const verifyOTPFunc = async () => {
    setIsLoader(true)
    try {
      if (recoverPass.otp == "") {
        console.log("OTP is empty")
        setIsLoader(false)
        setIsWarningCaption(EMPTY_FIELDS)
        toggleWarningMSG()
      } else {
        console.log('recover', recoverPass.otp)
        const verify_params = {
          phone_number: recoverPass.phone_number,
          otp: recoverPass.otp,
          token: recoverPass.token
        }
        const verify_data = await ForgotPassVerify(verify_params)
        console.log("verify", verify_data)

        if (verify_data.code == "200") {
          setRecoverPass({ ...recoverPass, token: verify_data.token })
          setISSendOTP(false)
          setIsOTP(false)
          setIsLoader(false)
          setIsPassword(true)
        } else if (verify_data == "400") {
          console.log("Wrong pin");
          setIsWarningCaption(WRONG_CREDENTIALS)
          toggleWarningMSG()
          setIsWarning(true)
          setIsLoader(false)
        }
        else if (verify_data == 'ERR_NETWORK') {
          setIsLoader(false)
          setIsWarningCaption(ERR_BAD_NETWORK)
          toggleWarningMSG()
        }
        else if (verify_data == 'ERR_BAD_NETWORK') {
          setIsLoader(false)
          setIsWarningCaption(ERR_BAD_NETWORK)
          toggleWarningMSG()
        }
        else {
          console.log("wrong otp")
          setIsWarningCaption(WRONG_CREDENTIALS)
          toggleWarningMSG()
          setIsLoader(false)
        }
      }
    } catch (error) {
      // console.log("error", error)
      // setIsWarning(true)
      setIsWarningCaption(TRY_AGAIN)
      toggleWarningMSG
      // setIsWarningMsg("The OTP you entered is wrong, please try again")
    }
  }

  const updateOTPFunc = async () => {
    setIsLoader(true)
    setRecoverPass({ ...recoverPass, password: '', confirm_password: '' })
    try {
      if ((recoverPass.password == "") && (recoverPass.password == "")) {
        console.log("fields are empty")
        setIsWarningCaption(EMPTY_FIELDS)
        toggleWarningMSG()
        // setIsWarning(true)
        // setIsWarningMsg("Make sure the fields are not empty")
      } else {

        const update_params = {
          phone_number: recoverPass.phone_number,
          token: recoverPass.token,
          password: recoverPass.password
        }
        const update_data = await ForgotPassUpdate(update_params)
        console.log("update_status", update_data)
        console.log("\n params", update_params)

        if (update_data.code == "200") {
          setISSendOTP(false)
          setIsPassword(false)
          setISSendOTP(false)
          setPassSuccess(true)
          setIsLoader(false)
        }
        else if (update_data == 'ERR_NETWORK') {
          setIsLoader(false)
          setIsWarningCaption(ERR_BAD_NETWORK)
          toggleWarningMSG()
        }
        else if (update_data == 'ERR_BAD_NETWORK') {
          setIsLoader(false)
          setIsWarningCaption(ERR_BAD_NETWORK)
          toggleWarningMSG()
        }else{
          setIsLoader(false)
          setIsWarningCaption(TRY_AGAIN)
          toggleWarningMSG()
        }
      }
    } catch (error) {
      setIsWarningCaption(TRY_AGAIN)
      toggleWarningMSG()
      console.log("error", error)
    }
  }

  // TODO: END FORGOT PASS <<<<<<<<<<<<<<<<<<<<<<

  const handleSubmit = async () => {
    setIsLoader(true)
    if (formData.regEmail === '' || formData.regPassword === '') {
      navigation.navigate("AlertModalError", {message:"empty"})
      if (formData.regEmail === '') {
        setFormDataValid({ ...formDataValid, regEmail: true })
      } else {
        setFormDataValid({ ...formDataValid, regPassword: true })
      }
      // Alert.alert('Error', 'Please fill in all fields');
    } else {
      try {
        setIsLoader(true)
        const response = await SignInRequest(signin_params_request)
        console.log("data_exist")
        const data_exist = await getAllPosts();

        // Error handler
        setIsLoader(false)
        console.log("\n\n response login", response)
        
        // navigation.navigate("AlertModalError",{message: response.status_code})
        if(response){
          if(response.code != "200"|| (response.status_code == "401")){
            navigation.navigate("AlertModalError",{message: response.status_code})
          }
        }

        if (!data_exist[0]) {

          if (response.code == '200') {
            setIsLoader(false)
            console.log("\n\ndata here", response.data);
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            const tokens = {
              access_token: access_token,
              refresh_token: refresh_token,
              username: response.data.username
            }
            const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username }))
            if (token_keychain) {
              const save_profile_params = {
                register_number: response.data.phone_number,
                profile: response.data.profile_pic,
                referral_code: "",
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                gender: response.data.gender,
                city: response.data.city
              }
              console.log("save profile", save_profile_params);
              const save_profile = await createRegistration(save_profile_params)
              navigationHome()
            }
          }

        } else {
          console.log("clicked")
          const number_db = response.data.phone_number;
          if (data_exist[0].register_number == number_db) {

            if (response.code == '200') {
              console.log("\n\ndata here", response.data);
              const access_token = response.data.access_token;
              const refresh_token = response.data.refresh_token;
              const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username, "account_id": response.data.id }))
              if (token_keychain) {
                navigationHome()
              }
            }

          } else {

            const delete_accounts = await deleteAllAccounts()
            console.log("delete all accounts", delete_accounts);

            if (response.code == '200') {
              console.log("\n\ndata here", response.data);
              const access_token = response.data.access_token;
              const refresh_token = response.data.refresh_token;
              const token_keychain = await Keychain.setGenericPassword("tokens", JSON.stringify({ "access_token": access_token, "refresh_token": refresh_token, "username": response.data.username }))
              if (token_keychain) {

                const save_profile_params = {
                  register_number: response.data.phone_number,
                  profile: response.data.profile_pic,
                  referral_code: "",
                  firstname: response.data.firstname,
                  lastname: response.data.lastname,
                  email: response.data.email,
                  gender: response.data.gender,
                  city: response.data.city
                }
                const save_profile = await createRegistration(save_profile_params)
                // navigation.navigate("Home");
                  console.log("save profile", save_profile);
                }
              }
            }
          }

        } catch (error) {
          console.log(error)
          setIsWarningMsg(empty_fields);
        setIsWarning(true)
      }
    }
    const response = await SignInRequest(signin_params_request)
    if (response == 400) {
      setIsWarning(true)
      setIsWarningMsg("Wrong Email/Password, Please Try again![1]")
    }
    
  }
    // const isValidLength = recoverPass.password.length >= 8 && recoverPass.password.length <= 16;
    const isValidLength = recoverPass.password.length >= 8;
    // const isValidCharacters = /^[A-Za-z0-9@#$%^&*()_+\-={}[\]:;"'<>,.?/~`!|\\]*$/.test(recoverPass.password);
    const isValidCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(recoverPass.password);
    
    const isPasswordValid = isValidLength && isValidCharacters;
    
    // Only check if confirm password matches when password length is 8 or more
    const shouldValidateConfirmPassword = recoverPass.password.length >= 8;
    const isConfirmPasswordValid = shouldValidateConfirmPassword && ConfirmValidation(recoverPass.password, recoverPass.confirm_password);
  
    const isPhoneNumberValid = (number: string) => {
      return /^9[0-9]{9}$/.test(number); // Starts with 9 and has exactly 10 digits
    }

    // Function to determine if input is an email or a phone number
    const detectInputType = (input) => {
      if (/^[0-9]+$/.test(input)) {
        return "phone"; // User is typing a phone number
      } else if (input.includes("@") || input.includes(".")) {
        return "email"; // User is typing an email
      }
      return "unknown"; // No clear detection yet
    };
  ;

  // Email & Phone Validation Functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const noConsecutiveSpecialChars = !/([@._-])\1{1,}/.test(email); // Prevents 3 or more consecutive special characters
    return emailRegex.test(email) && noConsecutiveSpecialChars;
  };  const isValidPhone = (phone) => /^9[0-9]{9}$/.test(phone);

  const inputType = detectInputType(formData.regEmail);
  const isEmailValid = isValidEmail(formData.regEmail);
  const isPhoneValid = isValidPhone(formData.regEmail);
  const isValidInput = isEmailValid || isPhoneValid; // True if valid email or phone

  const [delayedConfirmPasswordValidation, setDelayedConfirmPasswordValidation] = useState(false);

  useEffect(() => {
    if (shouldValidateConfirmPassword && recoverPass.confirm_password) {
      const timeout = setTimeout(() => {
        setDelayedConfirmPasswordValidation(true);
      }, 500);

      return () => clearTimeout(timeout); // Cleanup to prevent memory leaks
    } else {
      setDelayedConfirmPasswordValidation(false);
    }
  }, [recoverPass.confirm_password, shouldValidateConfirmPassword]);

  return (
    <View style={styles.container}>      
      <StatusBar hidden={true} />
      <View>
        <LoaderComponents showComp={isLoader} labelComp={''} />
        <AlertModal modalVisibile={isWarningMSG} alertMessage={isWarningCaption} yesOnpress={() => setIsWarningMSG(false)} noOnpress={() => setIsWarningMSG(false)} />
      </View>
      <ScrollView >
        {/* <Cone_Background /> */}
        <View style={{ top: 0 }}>
          <SuperAppBackground />
        </View>
        <View style={{ marginTop: spacing.xl, marginBottom: spacing.l }}>
          <Text style={[styles.title, text.largePlus]}>Welcome!</Text>
          <Text style={[styles.subText, text.smallPlus]}>
            Delivering convenience at your fingertips.
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.l }}>
          <View style={{ marginBottom: spacing.s }}>
            <InputText
              InputLabel="Log In"
              keyboardType="default"
              secureTextEntry={false}
              Editable={true}
              Value={formData.regEmail}
              onChangeText={onChangeEmail} isPhoneNumber={false} Placeholder={'Enter your email or phone number'} maxLength={50} />
            {/* <HelperText visibility={EmailValidation(formData.regEmail)} caption={"Email/Phone number format is invalid!"} /> */}
            
            {/* Only show helper text if input is NOT empty */}
            {formData.regEmail !== "" && (
              <>
                {/* Show "typing detection" message when invalid */}
                {inputType === "email" && !isEmailValid && (
                  <HelperText visibility={true} caption={"Looks like an email, but format is incorrect!"} />
                )}
                {inputType === "phone" && !isPhoneValid && (
                  <HelperText visibility={true} caption={"Looks like a phone number, but it's not valid!"} />
                )}

                {/* Show confirmation message when valid */}
                {/* {isEmailValid && (
                  <HelperText visibility={true} caption={"✅ Valid email format."} />
                )}
                {isPhoneValid && (
                  <HelperText visibility={true} caption={"✅ Valid phone number format."} />
                )} */}
              </>
            )}
          </View>

          <View style={{ marginTop: spacing.s }}>
            <InputText
              InputLabel="Password"
              keyboardType="default"
              secureTextEntry={true}
              Editable={true}
              Value={formData.regPassword}
              onChangeText={onChangePassword} isPhoneNumber={false} Placeholder={'Enter your password'} maxLength={50} />
            <HelperText visibility={formDataValid.regPassword} caption={empty_fields} />
          </View>
        </View>
        <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={[styles.row, { alignItems: 'center', alignContent: 'flex-start' }]}>
            <View style={{ marginEnd: -30 }}>
              <CheckBoxComponent
                onPress={onChangeCheck}
                checked={isChecked}
                chekcboxName={''}
              />
            </View>
            <Text>
              <TouchableOpacity onPress={onChangeCheck}>
                <Text style={[text.small, styles.remember, isChecked && { color: colors.mustard }]}>
                  Remember Me
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={{ marginEnd: 20 }}>
            <Text style={{}}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={[text.small, styles.forgetPass]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        <OrangeButton
          btnTitle={'Sign in'}
          onPress={() => {
            // Check if username and password are not empty
            if (formData.regEmail.trim() !== '' && formData.regPassword.trim() !== '') {
              handleSubmit();
            } else {
              // Show an alert or perform any action to indicate that username or password is empty
              Alert.alert('Please enter username and password');
            }
          }}
          disable={formData.regEmail.trim() === '' || formData.regPassword.trim() === ''} // Disable the button if either username or password is empty
        />
        {/* <View style={{marginTop:spacing.s}}>
          <RedButton
            btnTitle={'Continue with Google'}
            onPress={() => signIn()}
            disable={false} 
          />
        </View> */}
        
        <View style={styles.rowReg}>
          <Text
            style={[
              {
                textAlign: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                color: colors.grayText,
                fontWeight: '500',
              },
              text.small,
            ]}>
            {' '}
            Don't have an account?
          </Text>
          <Text>
            <TouchableOpacity onPress={navigationSignup}>
              <Text style={[styles.applyRider, text.small]}>
                {" "}Sign Up Now!
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        <RecoverPassComponent
          toggleModal={toggleModal}
          toggleModalVisible={isModalVisible}>
          <View>

            {
              isSendOTP &&
              <View>
                <Text style={[text.largePlus, styles.forgetTitle]}>
                  Forgot Password
                </Text>

                <Text style={[text.small, styles.subforgetTitle]}>
                  Magpapadala kami ng one-time password (OTP) sa iyong registered mobile number
                </Text>
                <View style={{ height: 60, paddingHorizontal: spacing.m, marginTop: spacing.l }}>
                  <InputTextNumber InputLabel="Ilagay ang Mobile Number" keyboardType='numeric' secureTextEntry={false} Editable={true} Value={recoverPass.phone_number} onChangeText={(data) => { setRecoverPass({ ...recoverPass, phone_number: data }); setPhoneExist(false) }} />
                </View>
                <View style={{ paddingHorizontal: spacing.m }}>
                  <HelperText visibility={phoneExist} caption={"The mobile number you enter is not exist"} />
                  <HelperText visibility={NumberValidation(recoverPass.phone_number)} caption={invalid_number} />
                </View>
                <View style={{ marginTop: spacing.xxl, marginHorizontal: spacing.s }}>
                  <View style={{}}>
                    <OrangeButton
                      btnTitle={'Forgot Password'}
                      onPress={sendOTPFunc}
                      disable={
                        !recoverPass.phone_number
                        || !isPhoneNumberValid(recoverPass.phone_number)
                        

                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.buttonBack]}
                    onPress={() => {
                      setRecoverPass({ ...recoverPass, phone_number: '' }); // Clear input field
                      setPhoneExist(false); // Reset phone exist state
                      setModalVisible(false); // Close modal
                    }}>
                    <Text style={[text.normal, styles.buttonBack]}>
                      Back to Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }

            {
              isOTP &&
              <View>
                <Text style={[text.largePlus, styles.forgetTitle]}>
                  Enter OTP
                </Text>

                <Text style={[text.normal, styles.subforgetTitle]}>
                  Enter the one-time code send to your personal mobile number
                </Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor='#FFAC13'
                  focusStickBlinkingDuration={500}
                  onTextChange={(text) => setRecoverPass({ ...recoverPass, otp: text })}
                  onFilled={(text) => console.log(`OTP is ${text}`)}
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
                  <Text style={[text.normal, { color: colors.grayText }]}>Walang natanggap na code?</Text>
                  <ResendComponent />
                  {/* <TouchableOpacity><Text style={[styles.resend, text.normal]}> Resend</Text></TouchableOpacity> */}
                </View>
                <View style={{ marginTop: spacing.xxl, marginHorizontal: spacing.s }}>
                  <View style={{}}>
                    <OrangeButton
                      btnTitle={'Enter OTP'}
                      onPress={verifyOTPFunc}
                      disable={false}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.buttonBack]}
                    onPress={() => {
                      setISSendOTP(true)
                      setIsOTP(false)
                    }
                    }>
                    <Text style={[text.normal, styles.buttonBack]}>
                      Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }

            {
              isPassword &&
              <View>
                <Text style={[text.largePlus, styles.forgetTitle]}>
                  Change Password
                </Text>

                

                <Text style={[text.small, styles.subforgetTitle]}>
                 Maglagay ng password na naiiba sa mga dati nang nagamit na password.
                </Text>

                <View>
                  <InputText InputLabel="Password" keyboardType="default" secureTextEntry={true} Editable={true} Value={recoverPass.password} onChangeText={(data: any) => setRecoverPass({ ...recoverPass, password: data })} isPhoneNumber={false} Placeholder={''} maxLength={50} />
                  {/* <HelperText visibility={ConfirmValidation(isForm.email, isForm.cemail)} caption={"The email not match"} /> */}
                  
                  {/* Password Validation Messages */}
                  {recoverPass.password ? (
                  <>
                      {!isValidLength && (
                        <HelperText visibility={true} caption="Password must be at least 8 characters long" />
                      )}
                      {!isValidCharacters && (
                        <HelperText visibility={true} caption="Password can only contain letters, numbers, and special characters (@#$%^&* etc.), no emojis!" />
                      )}
                    </>
                  ) : null}
                  </View>
                {/* Password Validation Messages */}
                
                <View style={{ marginTop: spacing.s }}>
                  <InputText InputLabel="Confirm Password" keyboardType="default" secureTextEntry={true} Editable={true} Value={recoverPass.confirm_password} onChangeText={(data: any) => setRecoverPass({ ...recoverPass, confirm_password: data })} isPhoneNumber={false} Placeholder={''} maxLength={50} />
                  {/* <HelperText visibility={isFormValid.password} caption={empty_fields} /> */}
                  {/* Confirm Password Validation */}
                  {shouldValidateConfirmPassword && recoverPass.confirm_password ? (
                  <>
                    {delayedConfirmPasswordValidation && (
                      <>
                        <HelperText
                          visibility={isConfirmPasswordValid}
                          caption="Hindi magkapareho ang mga password"
                        />
                        <HelperTextGreen
                          visibility={!isConfirmPasswordValid}
                          caption="The password matched!"
                        />
                      </>
                    )}
                  </>
                ) : null}
                </View>
                
                <View style={{ marginTop: spacing.l }}>
                  <View style={{}}>
                    <OrangeButton
                      btnTitle={'Confirm Changes'}
                      onPress={updateOTPFunc}
                      disable={
                        !recoverPass.password || 
                        !recoverPass.confirm_password || 
                        !isPasswordValid || 
                        (shouldValidateConfirmPassword && isConfirmPasswordValid) // Ensure match check happens only when password is 8+ chars
                      }                     
                      />
                  </View>
                  {/* <TouchableOpacity
                    style={[styles.buttonBack]}
                    onPress={() => {
                      setIsPassword(false)
                      setIsOTP(true)
                    }
                    }>
                    <Text style={[text.normal, styles.buttonBack]}>
                      Back
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            }

            {
              passSucess &&
              <View>
                <Text style={[text.largePlus, styles.forgetTitle]}>
                  Password Changed!
                </Text>
                <Text style={[text.normal, styles.subforgetTitle]}>
                  Alright! You have successfully changed your password
                </Text>

                <View style={{ marginTop: spacing.xxl, marginHorizontal: spacing.s }}>
                  <View style={{}}>
                    <OrangeButton
                      btnTitle={'Continue'}
                      onPress={() => {
                        setPassSuccess(false)
                        setIsPassword(false)
                        setISSendOTP(true)
                        setModalVisible(false)
                      }
                      }
                      disable={false}
                    />
                  </View>
                </View>
              </View>
            }


          </View>
        </RecoverPassComponent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: colors.light,
    flex:1
  },
  applyRider: {
    flex: 1,
    color: colors.mustard,
    fontWeight: '700',
  },
  rowReg: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center'
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  forgetPass: {
    margin: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    color: colors.mustard,
  },
  remember: {
    margin: 15,
    // fontWeight: 'bold',
    textAlign: 'right',
    color: colors.grayText,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.mustard,
  },
  subText: {
    margin: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.grayText,
  },
  forgetTitle: {
    marginTop: verticalScale(30),
    textAlign: 'center',
    color: colors.mustard,
    fontWeight: '700',
  },
  subforgetTitle: {
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: spacing.m,
    paddingHorizontal: spacing.m,
    color: colors.grayText,
  },
  buttonBack: {
    height: 50,
    marginTop: 10,
    borderRadius: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});


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