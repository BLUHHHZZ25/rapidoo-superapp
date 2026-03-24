import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { colors, spacing, text, sizes, verticalScale, moderateScale, horizontalScale, shadow } from '../../app/constants/theme';
import { Icon } from "@rneui/themed";
import { DateFormatted, TimeFormatted } from "../../utils/DateFormats/DateFormat";
import { GetManilaTime } from "../../utils/GetCurrentDate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { setCoupons, setDiscountedPrice, setPrice } from "../../app/redux/reducers/transactionOrder";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../navigations/Navigation";
import { ApplyCoupons, CheckCoupons } from "../../services/api_services";
import { KeyChainGet } from "../../utils/KeyChain/GetKeyChain";
import { useDiscountPercentage } from "../../utils/useDiscountPercentage";
import { useEffect } from "react";
import { HomeElement } from "../navigations/HomeNavigation";
import { ParcelElement } from "../navigations/ParcelNavigation";

type Props = {
    list: any;
}

export const CARD_WIDTH = 120;
export const CARD_HEIGHT = 120;


export default function ListItems({ list }: Props) { //use for coupons
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const homeNavigation = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const parcelNavigation = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    const Price: any = useSelector((state: RootState) => state.transactionOrder.Price);
    const usedispatch = useDispatch<AppDispatch>();
    console.log("date now :", GetManilaTime());
    
    const onSubmit = async(data:any) => {
        const key = await KeyChainGet()

        const params = {
            coupon_id: data.data.coupon_id
        }        
        const response = await CheckCoupons(params)
        console.log("response -- ", response.code);
        
        if(response){
            if(response.code == 200){
                const total = useDiscountPercentage(Number(data.data.discount), Number(Price))
                usedispatch(setCoupons(data))
                usedispatch(setDiscountedPrice(total))

                parcelNavigation.reset({
                    index: 0,
                    routes: [{ name: 'ReviewOrder'  }],
                  });
            }else{
                homeNavigation.navigate('AlertModalError', {message: response.message})
            }
        }
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>

            <FlatList data={list}

                snapToInterval={spacing.l}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyExtractor={i => i.id}
                style={{ width: '100%', backgroundColor: colors.light, marginTop: spacing.s, paddingHorizontal:spacing.s }}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{ marginBottom: spacing.m }}
                            key={index}
                        >
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', backgroundColor: item.date_exp > GetManilaTime() && GetManilaTime() > item.date_start ? colors.grayOpacity: colors.grayOpacityOne, marginHorizontal: spacing.s + 1 }}>
                                    <View style={{width: CARD_WIDTH,height: CARD_HEIGHT,backgroundColor:item.date_exp > GetManilaTime() && GetManilaTime() > item.date_start ? colors.orange: colors.grayOpacityOne}}>
                                        <View style={{ marginTop: spacing.s }}>
                                            <Icon type="ionicon" name="ticket-outline" size={60} color={colors.light} style={{ marginTop: spacing.s }} />
                                            <Text style={[text.small, { color: colors.light, alignSelf: "center", marginTop: spacing.s }]}>{item.date_exp > GetManilaTime() ? "Rapid Discount": "Expired"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderRadius: 100, backgroundColor: colors.light, width: 15, height: 15, position: 'absolute', left: 112, top: -8 }} />
                                    <View style={{ borderRadius: 100, backgroundColor: colors.light, width: 15, height: 15, position: 'absolute', left: 112, top: 110 }} />
                                    <View style={[styles.textAlign]}>
                                        <View style={{width:"90%"}}>
                                            <Text style={[text.normal, styles.couponTitle]}>{item.coupon_code}</Text>
                                            <Text style={[text.small, {color:colors.black}, { marginTop: 5 }]}>{item.coupon_id}</Text>
                                            <Text style={[text.small, {color:colors.grayText}]}>Start: {DateFormatted({ date: item.date_exp })}</Text>
                                            <Text style={[text.small, {color:colors.grayText}]}>Exp: {DateFormatted({ date: item.date_exp })}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() =>  onSubmit({data:{coupon_id:item.coupon_id, coupon_code: item.coupon_code, discount: item.discount}})} disabled = {item.date_exp > GetManilaTime() && GetManilaTime() > item.date_start ? false : true } style={{marginTop:spacing.s, position:'absolute', bottom:0, right:"5%"}}>
                                            <Text style={[text.small, styles.couponStatus, { color: item.date_exp > GetManilaTime() && GetManilaTime() > item.date_start ? colors.orange : colors.grayText, borderStyle: 'solid', borderWidth: 1, paddingVertical: 2, paddingHorizontal: 6, borderColor: item.date_exp > GetManilaTime() && GetManilaTime() > item.date_start ? colors.orange : colors.grayText }]}>Claim</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                }} />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {

    },
    couponTitle: {
        fontWeight: '600',
        color: colors.black
    },
    couponDescription: {
        fontWeight: '500',
    },
    couponStatus: {
        fontWeight: '700',
        alignSelf: 'center'
    },
    textAlign: {
        marginHorizontal: spacing.s,
        alignSelf: 'center',
        width: "65%"
    },
    statusStyle: {
        backgroundColor: colors.mustard,
        borderRadius: sizes.radius,
        width: "47%",
        marginVertical: spacing.s,
        paddingHorizontal: spacing.s,
        paddingVertical: 2
    }
})