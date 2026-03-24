import {
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import { TextInput, Button } from 'react-native-paper';
  import { Image, View } from 'react-native';
  import { colors, sizes, spacing, text, verticalScale } from '../../app/constants/theme';
  import { Icon } from '@rneui/themed';
  import { Divider } from 'react-native-paper';
  import { SharedElement } from '../navigations/Navigation';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { useNavigation } from '@react-navigation/native';
  import LinearGradient from 'react-native-linear-gradient';
  import { profile } from '../../app/assets/img/images';
  import InputText from '../common/InputText';
  import { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import { RootState } from '../../app/redux/store';
  import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
  import { getAllPosts, updateRegistration } from '../../app/watermelonDB/model/model';
  import { cityList, genderList } from '../../app/assets/data/data';
  import { pick, keepLocalCopy, types } from '@react-native-documents/picker'
  import CrashlyticsErrorHandler from '../../utils/Crashlytics/CrashlyticsErrorHandler';
  import DropDown from '../common/DropDown';
  import { KeyChainGet } from '../../utils/KeyChain/GetKeyChain';
  import { AlertModalSuccess } from '../../app/constants/AlertModal';
import { ProfileUpdate } from '../../services/api_services';
import CloseButton from '../common/CloseButton';
import { ProfileElement } from '../navigations/ProfileNavigation';
  
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;
  
  const profilesize = wWidth / 3.9;
  
  export default function EditProfile() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationProfile = useNavigation<NativeStackNavigationProp<ProfileElement>>();
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDropDown, setShowDropDown] = useState(false);
    // const userFullName = useSelector((state: RootState) => state.login.userFullName,);
    // const userFirstName = useSelector((state: RootState) => state.login.userFirstName,);
    // const userLastName = useSelector((state: RootState) => state.login.userLastName,);
        // const userEmail = useSelector((state: RootState) => state.signUp.regEmail);
    // const userCity = useSelector((state: RootState) => state.login.userCity);
        // const userGender = useSelector((state: RootState) => state.signUp.regGender);
        // const tableID = useSelector((state: RootState) => state.signUp.tableID);
        // const userProfile = useSelector((state: RootState) => state.signUp.profile_pic);
  
    interface FormData {
      profile: string | any,
      id: any| string,
      fullname: string,
      firstName: string,
      lastName: string,
      email: string,
      city: string,
      gender: string,
      address: string,
    }
  
    const [isForm, setIsForm] = useState<FormData>({
      profile: "",
      id: "",
      fullname: "userFullName",
      firstName: "userFirstName",
      lastName: "userLastName",
      email: "userEmail",
      city: "",
      gender: "userGender",
      address: "userCity",
    });
  
    const [profileDef, setProfileDef] = useState(profile)
    const [isError, setIsError] = useState(false)
    const [isErrorMsg, setIsErrorMsg] = useState("")
  
    const navigationBack = () => {
      navigation.reset({
          index:0,
          routes: [{name: 'HomeNavigation',
              state:{
                  routes:[
                      {
                          name:'Home',
                          state:{
                              routes:[
                                  {
                                      name:'Profile'
                                  }
                              ]
                          }
                      }
                  ]
              }
          }],
      })
  }
    
    useEffect(() => {
      const getProfile = async () => {
        const data = await getAllPosts()
        setIsForm({
          ...isForm,
          id: data[0].id,
          firstName: data[0].firstname,
          lastName: data[0].lastname,
          email: data[0].email,
          city: data[0].city,
          gender: data[0].gender
        })
        setProfileDef(data[0].profile);
        console.log("data", data)
      }
  
      getProfile()
  
    }, [])
  
  
    const toggleIsError = () => {
      setIsError(!isError);
    };
  
    const onChangeFirstName = (value: any) => {
      setIsForm({ ...isForm, firstName: value });
    };
    const onChangeLastName = (value: any) => {
      setIsForm({ ...isForm, lastName: value });
    };
    const onChangeEmail = (value: any) => {
      setIsForm({ ...isForm, email: value });
    };
    const onChangeGender = (value: any) => {
      setIsForm({ ...isForm, gender: value.value });
    };
    const onChangeCity = (value: any) => {
      setIsForm({ ...isForm, city: value.value });
    };
  
  
    const handleSubmit = async () => {
    console.log("clicked")
      const key = await KeyChainGet();
      try {
        const data_params = {
          "profile_pic": isForm.profile,
          "firstname": isForm.firstName,
          "lastname": isForm.lastName,
          "display_name": `${isForm.firstName} ${isForm.lastName}`,
          "email": isForm.email,
          "city": isForm.city,
          "gender": isForm.gender,
        }
        console.log("params", data_params)
        const response = await ProfileUpdate(data_params)
        console.log("\n\n response", response.code)
        console.log("\n\n response", response.data.profile_change)
  
        if (response.code == "200") {
          if (response.data.profile_change == true) {
            console.log("data heree++++++++++++==")
            const updateProfile = {
              accountID: isForm.id,
              first_name: isForm.firstName,
              last_name: isForm.lastName,
              gender: isForm.gender,
              city: isForm.city,
              profile_pic: response.data.profile
            };
            updateRegistration(updateProfile);
            toggleIsError()
            // setIsErrorMsg(`Update Successfully ${JSON.stringify(isForm)}`)
            setIsErrorMsg(`Update Successfully`)
          } else {
            toggleIsError()
            // setIsErrorMsg(`Update Successfully ${JSON.stringify(isForm)}`)
            setIsErrorMsg(`Update Successfully`)
            const updateProfile = {
              accountID: isForm.id,
              first_name: isForm.firstName,
              last_name: isForm.lastName,
              gender: isForm.gender,
              city: isForm.city,
              profile_pic: profileDef
            };
            updateRegistration(updateProfile);
            console.log("\n\n params ", updateProfile)
          }
        }else{
          if(response.code){
            navigation.navigate('AlertModalError',{message:response.code})
          }else{
            navigation.navigate('AlertModalError',{message:response.status_code})
          }
        }
  
        console.log("response data", response.data.profile_change)
        console.log("response isform", isForm)
      } catch (error) {
        // console.log("error", error)
        toggleIsError()
        setIsErrorMsg(`ERROR: ${error}`)
      }
    };
  
    const UploadPicture = async () => {
      try {
        const pickerResult = await pick({
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
          type: types.images,
          
        });

        const fileSize = pickerResult[0].size
        const maxSize = 3 * 1024 * 1024;
  
        if (!pickerResult) {
          console.log('null picker');
        }
        if (Number(fileSize) > maxSize){
          setIsError(true)
          setIsErrorMsg("The file is too large")
        }
        setIsForm({ ...isForm, profile: pickerResult[0] })
        setProfileDef(pickerResult[0].uri)

      } catch (error) {
        CrashlyticsErrorHandler(error, 'DriversLicense', 'DriversLicenseFront');
        console.log('pickerResult');
      }
    };
  
    return (
      <LinearGradient
        colors={[colors.mustard, colors.mustardOpacity, colors.orange]}
        style={{ backgroundColor: colors.mustard }}>
        <CloseButton Onpress={navigationBack} />
        <View style={{ alignSelf: 'center', marginTop: sizes.Normal }}>
          <View style={{position:'absolute'}}>
            <AlertModalSuccess modalVisibile={isError} alertMessage={isErrorMsg} yesOnpress={toggleIsError} noOnpress={toggleIsError} />
          </View>
          <Text
            style={[
              text.mediumLarge,
  
              {
                color: colors.light,
                fontWeight: '700',
                marginVertical: spacing.s - 4,
              },
            ]}>
            My Profile
          </Text>
        </View>
  
        <View
          style={{
            alignSelf: 'center',
            marginVertical: spacing.m,
          }}>
          <View>
            <View
              style={{
                backgroundColor: colors.light,
                padding: 2.5,
                borderRadius: 100,
              }}>
              <Image source={{ uri: profileDef }} style={[styles.imageStyle]} />
            </View>
            <TouchableOpacity
              onPress={UploadPicture}
              style={{
                backgroundColor: colors.light,
                left: profilesize / 1.3,
                top: profilesize / 1.4,
                position: 'absolute',
                borderRadius: 100,
                width: '30%',
                height: 30,
                justifyContent: 'center',
                padding: 0,
              }}>
              <Icon type="ionicon" name="camera" size={17} />
            </TouchableOpacity>
          </View>
        </View>
  
        <View
          style={{
            height: wHeight,
            width: wWidth,
            backgroundColor: colors.light,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 20,
          }}>
          {/* <KeyboardAvoidingView
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={280}> */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{  padding: spacing.s }}>
                <View>
                  <Text
                    style={[
                      text.medium,
                      {
                        marginBottom: 10,
                        fontWeight: '700',
                        color: colors.black,
                        marginLeft: spacing.m,
                      },
                    ]}>
                    Account Details
                  </Text>
                  <View style={{ marginHorizontal: spacing.m, gap: spacing.s }}>
                    <View style={{}}>
                      <InputText
                      InputLabel="First Name"
                      keyboardType="default"
                      secureTextEntry={false}
                      Editable={true}
                      Value={isForm.firstName}
                      onChangeText={onChangeFirstName} isPhoneNumber={false} Placeholder={''} maxLength={50} />
                      {/* <HelperText visibility={ConfirmValidation(isForm.email,isForm.cemail)} caption={"The email does not match!"} /> */}
                    </View>
                    <View style={{}}>
                      <InputText
                      InputLabel="Last Name"
                      keyboardType="default"
                      secureTextEntry={false}
                      Editable={true}
                      Value={isForm.lastName}
                      onChangeText={onChangeLastName} isPhoneNumber={false} Placeholder={''} maxLength={50} />
                      {/* <HelperText visibility={isFormValid.password} caption={"The field is empty!"} /> */}
                    </View>
                    <View style={{}}>
                      <InputText
                      InputLabel="Email"
                      keyboardType="default"
                      secureTextEntry={false}
                      Editable={false}
                      Value={isForm.email}
                      onChangeText={onChangeEmail} isPhoneNumber={false} Placeholder={''} maxLength={50} />
                      {/* <HelperText visibility={ConfirmValidation(isForm.password,isForm.confirmPassword)} caption={"The password does not match!"} /> */}
                    </View>
                    <View style={{ marginTop: spacing.s }}>
                      <View>
                        <DropDown label={'Gender'} onChangeText={(value) => setIsForm({ ...isForm, gender: value })} datas={genderList} value={isForm.gender} />
                      </View>
                    </View>
                    <View style={{ marginVertical: spacing.m }}>
                      <View>
                        <DropDown label={'City'} onChangeText={(value) => setIsForm({ ...isForm, city: value })} datas={cityList} value={isForm.city} />
                      </View>
                    </View>
  
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        borderRadius: 10,
                        backgroundColor: colors.mustard,
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          color: colors.light,
                          fontWeight: '700',
                          alignSelf: 'center',
                          fontSize: 17,
                        }}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          {/* </KeyboardAvoidingView> */}
        </View>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: spacing.m,
    },
    inputText: {
      borderRadius: 40,
      fontFamily: 'OpenSans-Regular',
    },
    nameTxt: {
      fontSize: sizes.h2 - 2,
    },
    bigTxt: {
      fontWeight: '500',
      fontSize: sizes.h3 + 1,
    },
    normalTxt: {
      fontWeight: '400',
      fontSize: sizes.h3,
      color: colors.grayText,
    },
    normalSmallTxt: {
      fontSize: sizes.h3 - 4,
    },
    smallTxt: {
      fontSize: sizes.body - 3,
      color: colors.grayText,
    },
    imageStyle: {
      width: profilesize,
      height: profilesize,
      resizeMode: 'cover',
      borderRadius: 100,
    },
    iconStyle: {
      backgroundColor: colors.mustard,
      padding: 2,
      width: 38,
      height: 38,
      justifyContent: 'center',
      borderRadius: 10,
    },
    dropdown: {
      width: '100%',
      height: verticalScale(48),
      alignSelf: 'center',
      borderColor: colors.black,
      borderWidth: 0.5,
      backgroundColor: colors.gray,
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
    placeholderStyle: {
      fontSize: 16,
      color: colors.black,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: colors.black,
    },
  });
  