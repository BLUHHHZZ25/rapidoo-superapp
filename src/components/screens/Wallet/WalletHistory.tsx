import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, moderateScale, shadow, sizes, spacing, text } from "../../../app/constants/theme";
import { Transactions } from "../../../services/api_services";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeElement } from "../../navigations/HomeNavigation";
import { KeyChainGet } from "../../../utils/KeyChain/GetKeyChain";
import HeaderPlain from "../../HeaderPlain";
import { Icon } from "@rneui/themed";
import { formatDistanceToNow, parseISO } from "date-fns";
import { formatAmount } from "../../../utils/FormatAmount";
import React from "react";


const WalletHistory: React.FC = () => {
    const HomeNavigation = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const [isFilter, setFilter] = useState("All")
    const isFocused = useIsFocused();
    const [isTransactions, setTransactions] = useState<any>([])

    const datas = [{id:1 ,name: "All"},{id:2, name:"Debit"},{id:3, name:"Credit"} ]

    const get_transactions = async () => {
        const key = await KeyChainGet()
        const params = {
            bearer_token: (key.access_token).toLocaleString(),
            limit: 25,
            status: isFilter == "All" ? "" : isFilter
        }
        const result = await Transactions(params);
        console.log("\n\n result ", result.data);
        
        setTransactions(result.data)
    }

    const navigationBack = () => {
        HomeNavigation.reset({
            index: 0,
            routes: [{
                name: 'Home',
                state: {
                    routes: [
                        {
                            name: "Wallet"
                        }
                    ]
                }
            }],
        });
    };

    useEffect(() => {
        get_transactions()
    }, [isFocused, isFilter])


    return(
        <View style={{flex:1}}>
            <StatusBar hidden={true} />
            <View style={{}}>
                {/* <HeaderButton titleHeader={"Send to"} goSubmit={onSubmit} goBack={navigationBack} submitDisable={isProceed}/> */}
                <HeaderPlain title={"My Transactions"} back_button={true} back_function={navigationBack}/>
            </View>
            <View>
                <FlatList
                    data={datas}
                    style={{ paddingHorizontal:spacing.s}}
                    scrollEnabled={false}
                    horizontal={true}
                    renderItem={({item, index}) => { 

                        return(
                            <>
                                <TouchableOpacity
                                    onPress={() => setFilter(item.name)}
                                    style={{
                                        backgroundColor: item.name == isFilter ?colors.orange:colors.light,
                                        borderRadius:15,
                                        paddingHorizontal:spacing.m,
                                        paddingVertical:spacing.s,
                                        marginHorizontal:spacing.s,
                                        elevation:2,
                                        margin:2
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:item.name == isFilter ?colors.light: colors.black
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                
                />
            </View>
            <ScrollView style={{paddingHorizontal:spacing.m, marginTop:spacing.s}}>
                <FlatList
                    data={isTransactions}
                    style={{ width: "100%", height: 'auto', marginBottom: spacing.xl }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => {
                        console.log("---- ",item.type);
                        
                        return (
                            <>
                                <View style={[shadow.dark, { elevation: 10 }]}>
                                    <View style={
                                        item.type === "CREDIT" ? styles.historyListCredited
                                            : item.type === "DEBIT" ? styles.historyListDebited
                                                : item.type === "Transfer" ? styles.historyListTransfer : null
                                    }>
                                        <View style={{ justifyContent: 'center', width:"24%" }}>
                                            {
                                                item.type === "CREDIT" ? <Icon reverse type='ionicon' name="arrow-up-outline" color={colors.green} size={moderateScale(20)} />
                                                    : item.type === "DEBIT" ? <Icon reverse type='ionicon' name="arrow-down-outline" color={colors.red} size={moderateScale(20)} />
                                                        : item.type === "Transfer" ? <Icon reverse type='ionicon' name="swap-horizontal-outline" color={colors.orange} size={moderateScale(20)} /> : null
                                            }

                                        </View>
                                        <View style={{ justifyContent: 'center', width:"52%" }}>
                                            <Text style={[styles.titleHistory, text.normal, { color: colors.grayText, fontWeight: '700' }]}>
                                                {
                                                    item.remarks === "CASH_IN" ? "CASH IN WALLET"
                                                    : item.remarks === "CASH_OUT" ? "CASH OUT WALLET"
                                                    : item.remarks === "REVERT" ? "REVERT WALLET"
                                                    : item.remarks === "PAYMENT" ? "SYSTEM FEE"
                                                    : item.remarks === "INCOME" ? "INCOME"
                                                    : item.remarks === "FREE_CREDIT" ? "FREE CREDIT 10K"
                                                    : null
                                                }
                                            </Text>
                                            <Text style={[styles.cardsmallTxt, text.smallPlus, { color: colors.grayText, fontWeight: '600' }]}>Booking ID #{item.id}</Text>
                                            <Text style={[styles.cardvsmallTxt, text.small, { color: colors.grayText, fontWeight: '600' }]}>{formatDistanceToNow(parseISO(item.created_at),{ addSuffix: true})}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', marginRight: spacing.m, width:"23%" }}>
                                            <Text style={[styles.cardTxt, text.smallPlus, { color: colors.grayText, fontWeight: '700' }]}>
                                                {
                                                    item.type === "CREDIT" ? `₱ ${formatAmount(String(item.credit))}`
                                                        :  `₱ ${formatAmount(String(item.debit))}`
                                                }
                                                
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: spacing.m
    },
    cardTxt: {
        fontWeight: '400',
    },
    cardTxtStyle: {
        alignSelf: 'center',
        color: colors.grayText
    },
    cardsmallTxt: {
        fontWeight: '400',
        fontSize: sizes.h3 - 4
    },
    cardvsmallTxt: {
        fontWeight: '400',
        fontSize: sizes.body - 2
    },
    priceTxt: {
        fontWeight: '700',
        color: colors.light
    },
    titleHistory: {
        fontWeight: '500',
    },
    historyListCredited: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 1,
        padding: spacing.s,
        marginVertical: spacing.s,
        marginHorizontal: 1,
        backgroundColor: colors.light,
        borderWidth: 0.1,
        borderColor: colors.green,
        borderRightColor: colors.green,
        borderRightWidth: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    historyListDebited: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 1,
        padding: spacing.s,
        marginVertical: spacing.s,
        backgroundColor: colors.light,
        borderWidth: 0.1,
        borderColor: colors.red,
        borderRightColor: colors.red,
        borderRightWidth: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    historyListTransfer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 1,
        padding: spacing.s,
        marginVertical: spacing.s,
        backgroundColor: colors.light,
        borderWidth: 0.1,
        borderColor: colors.orange,
        borderRightColor: colors.orange,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }

})


export default WalletHistory