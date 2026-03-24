import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import ListItems from "../../common/ListItems";
import { Coupons } from "../../../app/assets/data/data";
import DefaultHeader from "../../common/DefaultHeader";
import { colors, sizes, spacing } from "../../../app/constants/theme";
import { ProfileElement } from "../../navigations/ProfileNavigation";
import HeaderPlain from "../../HeaderPlain";
import { useEffect, useState } from "react";
import { GetCoupons } from "../../../services/api_services";
import { KeyChainGet } from "../../../utils/KeyChain/GetKeyChain";
import { log } from "@react-native-firebase/crashlytics";
import InputOrange from "../../common/InputOrange";
import InputField from "../../common/InputField";
import InputText from "../../common/InputText";
import { TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import { ParcelElement } from "../../navigations/ParcelNavigation";

export default function Coupon() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const parcelNavigation = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    const navigationProfile = useNavigation<NativeStackNavigationProp<ProfileElement>>();
    const [coupons, setCoupons] = useState<string | null>(null)
    const [isCode, setIsCode] = useState<string>("")

    useEffect(() => {
        const getCoupons = async () => {
            const key = await KeyChainGet()
            console.log("\n\n key", key.access_token);

            const response = await GetCoupons({ bearer_token: key.access_token, coupon_code:"" });
            if (response) {
                setCoupons(response)
            }
        }
        if (coupons == null) {
            getCoupons()
        }

    }, [coupons])

    useEffect(() => {
        const getCoupons = setTimeout( async () => {
            console.log("\n\n key---------");
            const key = await KeyChainGet()
            console.log("\n\n key---------", key.access_token);

            const response = await GetCoupons({ bearer_token: key.access_token,coupon_code: isCode });
            if (response) {
                setCoupons(response)
            }
        }, 1000)

        return () => clearTimeout(getCoupons)
    },[isCode])

    const navigationBack = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'HomeNavigation',
                state: {
                    routes: [
                        {
                            name: 'Home',
                            state: {
                                routes: [
                                    {
                                        name: 'Profile'
                                    }
                                ]
                            }
                        }
                    ]
                }
            }],
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <View style={{ marginBottom:spacing.m }}>
                <HeaderPlain title={"Coupons"} back_button={true} back_function={() => parcelNavigation.navigate('ReviewOrder')} />
            </View>
            <View
                style={{ paddingHorizontal: spacing.m, paddingBottom:spacing.m }}
            >
                <TextInput
                    value={isCode}
                    placeholder="Enter Voucher Code"
                    maxLength={50}
                    style={{ 
                        height: 50, 
                        color:colors.grayText,
                        fontSize: sizes.body,
                        backgroundColor:colors.mustardOpacity, 
                        borderRadius: spacing.m,
                        paddingLeft:spacing.xl+10,
                        paddingRight:spacing.s
                     }}
                    onChangeText={(value) => {
                        setIsCode(value)
                        setCoupons("")
                    }}
                />
                <View style={{position:'absolute', top:10, left:30}}>
                    <Icon type="ionicon" name="search-outline" size={25} color={colors.grayText} style={{}} />
                </View>
            </View>
            {
            !isCode && 
            <View style={{ width: '100%', height: "92%" }}>
                <ListItems list={coupons} />
            </View>
            }

            {
            coupons && // if coupon exist
            <View style={{ width: '100%', height: "92%" }}>
                <ListItems list={[coupons]} />
            </View>
            }
        </View>
    )
}