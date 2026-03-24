import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { colors, spacing, sizes, text, verticalScale, } from "../../../app/constants/theme";
import RatingCustom from "../../common/RatingCustom";
import { SharedElement } from "../../navigations/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import OrangeButton from "../../common/OrangeButton";
import { AlertModal, AlertModalSuccess } from "../../../app/constants/AlertModal";
import { RatingRequest } from "../../../services/api_services";
import { KeyChainGet } from "../../../utils/KeyChain/GetKeyChain";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { ParcelElement } from "../../navigations/ParcelNavigation";
import React from "react";
import DriverRatingTemplate from "../../templates/DriverRatingTemplate";

export default function DriverRating() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    const [defaultRating, setdefaultRating] = useState(5);
    const [comment, setComment] = useState<string>("");
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
    const [isAlert, setAlert] = useState(false)

    const imageFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const imageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

    const transaction = useSelector((state: RootState) => state.transactionOrder.accept_transaction)
    const riderProfile = useSelector((state: RootState) => state.transactionOrder.riderPic)
    const riderDetails: any = useSelector(
        (state: RootState) => state.transactionOrder.riderDetails,
      );
    console.log("sadsadasdsad", riderDetails);
    
    const onSubmit = async() => {
        // TODO: UNCOMMENT WHEN YOU DONE 

        try {
            // TODO: UNCOMMENT BELOW WHEN YOU FINISH ADD THE COLUMNS IN TRANSACTION 
            const key = await KeyChainGet();
            const params = {
                rider_username: key.username,
                rider_account_id: String(riderDetails.rider_account_id),
                reference_id: riderDetails.reference_id,
                rating: defaultRating,
                comment: comment,
                bearer_token: key.access_token
            }
            const data = await RatingRequest(params)
            if(data){
                setAlert(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const navigationTrackMyOrder = () => {
        navigationParcel.reset({
            index:0,
            routes: [{name: 'HomeNavigation',
                state:{
                    routes:[
                        {
                            name:'Home'
                        }
                    ]
                }
            }],
        })
    }

    const onAlertSubmit = () => {
        navigationTrackMyOrder()
        setAlert(false)
    }

    return (
        <>
            <AlertModalSuccess modalVisibile={isAlert} alertMessage={"Thank you for choosing Rapidoo.PH"} yesOnpress={onAlertSubmit} noOnpress={() => {}}/>
            <DriverRatingTemplate onSubmit={onSubmit} submitName={"Done"} submitEnable={false}>
                {
                    riderProfile ?
                    <Image style={styles.profileStyle} source={{uri:riderProfile}} />
                    :
                    <Image style={styles.profileStyle} source={require('../../../app/assets/img/sProfile.jpg')} />
                }
                <Text style={[text.large, styles.profileTitle]}> How was the delivery?</Text>
                <Text style={[text.normal, styles.profileDescription]}> Help us to improve our service by rating this delivery</Text>
                {/* <RatingCustom /> */}
                <View style={{flexDirection:"row", alignSelf:'center'}}>
                    {
                        maxRating.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={item}
                                    style={{        
                                        flexDirection: 'row',
                                        padding: spacing.s,
                                        marginVertical: spacing.l
                                    }}
                                    onPress={() => { 
                                        setdefaultRating(item)
                                     }}
                                >
                                    <Image
                                        style={styles.imageSize}
                                        source={
                                            item <= defaultRating
                                                ? { uri: imageFilled }
                                                : { uri: imageCorner }
                                        }
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <Text style={[text.normal, styles.commentTitle]} >Comments and Suggestions:</Text>
                <TextInput
                    placeholder="Type your comments and suggestion here.."
                    editable
                    numberOfLines={3}
                    multiline
                    maxLength={50}
                    onChangeText={(text) => setComment(text)}
                    value= {comment}
                    style={{ backgroundColor: colors.gray, paddingHorizontal:spacing.s, height: 80, width: "90%", alignSelf:'center', borderRadius:10 }}
                />
            </DriverRatingTemplate>
        </>
    )
}


const styles = StyleSheet.create({
    profileStyle: {
        height: verticalScale(140),
        aspectRatio: 1 / 1,
        borderRadius: 100,
        alignSelf: 'center',
    },
    profileTitle: {
        fontWeight: '700',
        color: colors.black,
        marginVertical: spacing.m,
        alignSelf: 'center'
    },
    profileDescription: {
        fontWeight: '400',
        color: colors.grayText,
        alignSelf: 'center',
        textAlign: 'center'
    },
    commentTitle: {
        fontWeight: '400',
        color: colors.grayText,
        margin: spacing.s
    },
    buttonSpacing: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        width: "100%"
    },
    imageSize: {
        width: 50,
        height: 50,

    },
    starSpacing: {
        flexDirection: 'row',
        padding: spacing.s,
        marginVertical: spacing.l

    }
})