import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { HomeElement } from "../../navigations/HomeNavigation";
import { spacing, colors, text } from "../../../app/constants/theme";
import { AppDispatch } from "../../../app/redux/store";
import { GetPaymentOptions } from "../../../services/api_services";
import { setPaymentMethod } from "../../../app/redux/reducers/walletSlice";
import ViewTemplate from "../../templates/ViewTemplate";
import { WalletElement } from "../../navigations/WalletNavigation";


export function PaymentMethod() {
    const navigation = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigationWallet = useNavigation<NativeStackNavigationProp<WalletElement>>();
    const [isBank, setBank] = useState(false)
    const [paymentOptions, setPaymentOption] = useState()
    const [isSub, setSub] = useState<any>()
    const [subType, setSubType] = useState("")
    const usedispatch = useDispatch<AppDispatch>();

    useEffect(() => {
    const payment_options = async () => {
        const data = await GetPaymentOptions()
        console.log("\n\n data ",data);
    

        //? REFRESH TOKEN EXPIRED
        if (data.code) {
        setPaymentOption(data.data)
        // Find the PayMongo object
        const paymongoData = data.data.find((item:any) => item.key === "paymongo");
        console.log("\n\n ---- ",paymongoData.sub);
        
        const sub = JSON.parse(paymongoData.sub);
        setSub(sub)
        } else {
        if (data.code) {
            navigation.navigate('AlertModalError', { message: data.code })
        } else {
            navigation.navigate('AlertModalError', { message: data.status_code })
        }
        }
    }
    payment_options();
    }, [])


    const subComponent = ({item}:{item:any}) => {
        return(
            <View key={item.id} style={{marginLeft:spacing.m, marginTop:spacing.m}}>
                <TouchableOpacity onPress={() => chooseSub({option:"paymongo",type:item.value, img:item.img, rate: item.rate})} style={{flexDirection:'row', width:'100%',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Image source={{ uri: (item.img) }} style={{ width: 20, aspectRatio: 1, marginRight:spacing.s }} />
                        <View style={{alignSelf:'center', flexDirection:"row"}}>
                            <Text style={[text.normal,{color:colors.blackText}]}>{item.name}</Text>
                            <Text style={[text.smallPlus,{color:colors.green, alignSelf:'center', marginLeft:spacing.s}]}>{item.rate}%</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", alignSelf:'center'}}>
                        <RadioButton 
                        value={item.value}
                        status={subType == item.value ? "checked" : "unchecked"}
                        onPress={() => chooseSub({option:"paymongo",type:item.value, img:item.img, rate: item.rate})}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const chooseSub = ({option, type, img, rate}:{option:string, type:string, img:string, rate:number}) => {
        usedispatch(setPaymentMethod({option,type,img, rate}))
        setSubType(type)
      console.log(" item");
    }

    const chooseOption = ({option, img, type}:{option:any, img:any, type:any}) => {
        const params = {
            option: option,
            type: "",
            img: img,
            rate: 0
        }
        usedispatch(setPaymentMethod(params))
        setSubType(option)
      console.log(" item");
      
    }    

    const navigationBack = () => {
    navigationWallet.reset({
        index: 0,
        routes: [{ 
        name: 'Home',
        state: {
            routes: [{ name: 'Wallet' }],
            index: 0
        }
        }],
    });
    };

    const navigationTopUp = () => {
        navigationWallet.reset({
          index: 0,
          routes: [{ name: 'CashInModal',
           }],
        });
      };

    return(
        <>
        {/* <BackHeader title={"Payment Method"} onPress={() => { navigationBack()}}/>
        <View style={{paddingHorizontal:spacing.s}}> */}
        <ViewTemplate 
        headerTitle={"Payment Method"} 
        headerOnpress={()=> { navigationBack()}} 
        buttonTitle={"Select Payment Method"} 
        buttonOnpress={() => navigationTopUp()} 
        >
        <View style={{marginHorizontal:spacing.s}}>
            <View style={[{backgroundColor:colors.white,padding:spacing.s, borderRadius:10, marginTop:spacing.m, flexDirection:'row'}]}>
                <View style={{borderRadius:100, backgroundColor:colors.orange, width:14, height:14, alignSelf:'center', marginHorizontal:spacing.s}}>
                    <Icon type="ionicon" name="alert" color={colors.light} size={14}/>
                </View>
                <Text style={{color:colors.blackText}}>Please select other payment method.</Text>
            </View>
            <FlatList
            data={paymentOptions}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'fast'}
            style={{ width: "100%", marginBottom: spacing.m }}
            // horizontal
            renderItem={({item, index}) => {
                return(
                    <View style={[{backgroundColor:colors.white,paddingHorizontal:spacing.m, paddingTop:spacing.m, paddingBottom:spacing.m, borderRadius:10, marginTop:spacing.s}]}>
                        <TouchableOpacity disabled={item.sub ? true : false} onPress={() => chooseOption({option:"union-bank",type:"", img: item.image})} style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <View style={{flexDirection:'row', alignSelf:'center'}}>
                                <Image source={{ uri: (item.image) }} style={{ width: 20, aspectRatio: 1, marginRight:spacing.s }} />
                                <Text style={[text.normal,{color:colors.blackText, alignSelf:'center'}]}>{item.name}</Text>
                            </View>
                            {
                            item.sub ?                    
                                <View style={{marginHorizontal:spacing.s}}>
                                    {
                                        true ?
                                        <Icon type="ionicon" name="chevron-down-outline" size={18}/>
                                        :
                                        <Icon type="ionicon" name="chevron-forward-outline" size={18}/>
                                    }
                                </View>
                            :
                                <RadioButton 
                                value={item.key}
                                status={subType == item.key ? "checked" : "unchecked"}
                                onPress={() => chooseOption({option:"union-bank",type:"", img:item.image})}
                                />
                            }
                        </TouchableOpacity>
                        {
                            item.sub && isSub &&
                            <FlatList
                            data={isSub}
                            keyExtractor={(item, index) => item.name}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={'fast'}
                            style={{ width: "100%" }}
                            renderItem={subComponent}
                            />
                        }
                    </View>
                )
            }}/>
        </View>
        </ViewTemplate>
        </>
    )
}