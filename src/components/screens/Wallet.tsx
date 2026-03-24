import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl, StatusBar } from "react-native";
import { View } from "react-native";
import { colors, horizontalScale, moderateScale, shadow, sizes, spacing, text } from "../../app/constants/theme";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";
import { Donation, FinancialHistory } from "../../app/assets/data/data";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../navigations/Navigation";
// import RequestWithdraw from "../Home/RequestWithdraw";
import { donation, logo, walletCard } from "../../app/assets/img/images";
import PayWallet from "./Wallet/PayWallet";
import { KeyChainGet } from "../../utils/KeyChain/GetKeyChain";
import { Transactions, WalletAccount } from "../../services/api_services";
import { useEffect, useState } from "react";
import { HomeElement } from "../navigations/HomeNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import Header from "../common/Header";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { formatAmount } from "../../utils/FormatAmount";
import HeaderPlain from "../HeaderPlain";
import { WalletElement } from "../navigations/WalletNavigation";
// import TopUpRequest from "../Home/TopUpRequest";
// import TransferEmoney from "./TransferEmoney";
// import Bank from "./Bank";
// import { logo, walletCard } from "../../assets/img/images";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

const DonationCardW = 250;
const DonationCardH = 110;




export default function Wallet() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigationWallet = useNavigation<NativeStackNavigationProp<WalletElement>>();
    const cardH = horizontalScale(200);
    const cardW = horizontalScale(340);
    const [walletBalance, setWalletBalance] = useState<String | Number>("-- --")
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const [isTransactions, setTransactions] = useState<any>([])
    const userFirstName = useSelector((state: RootState) => state.registrationCounter.regFirstname);
    const userLastName = useSelector((state: RootState) => state.registrationCounter.regLastname);
    const regNumber = useSelector((state: RootState) => state.registrationCounter.regNumber);

    const account_wallet = async () => {
        const key = await KeyChainGet()
        const params = {
            username: key.username,
            bearer_token: key.access_token
        }
        const result = await WalletAccount(params);
        console.log("\n\n Wallet> ", result);
        setWalletBalance(Number(result.data.amount_available))
    }

    const navigationCashInModal = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WalletNavigation',
          state:{
            routes:[{ name: "CashInModal"}]
            }
          }],
        });
      };

    const get_transactions = async () => {
        const key = await KeyChainGet()
        const params = {
            bearer_token: (key.access_token).toLocaleString(),
            limit: 10,
            status: ""
        }
        const result = await Transactions(params);

        setTransactions(result.data)
    }

    useEffect(() => {
        setTimeout(() => {
            setRefreshing(false)
        }, 5000);
    }, [])

    useEffect(() => {
        account_wallet()
        get_transactions()
    }, [isFocused])
    return (
        <View style={{ flex: 1 }}>

            {/* <View style={[{ width: "100%", justifyContent: 'center', marginTop:spacing.xl, marginBottom:spacing.s }]}>
                <Text style={[styles.titleHeader,text.mediumLarge, { alignSelf: 'center', fontWeight:'700' }]}>Rapidoo Wallet</Text>
            </View> */}
            {/* <Header title={"Wallet"} backBtn={false} settingBtn={false} backFunc={function (): void {
                throw new Error("Function not implemented.");
            } } settingFunc={function (): void {
                throw new Error("Function not implemented.");
            } }/> */}
            <StatusBar
                hidden={true}
            />
            <View style={{}}>
                <HeaderPlain title={"My Transactions"} back_button={false} back_function={() => {}}/>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={account_wallet} />}>
                <View style={[styles.container, { height: "100%" }]}>
                    <View>
                        <Image source={{ uri: (walletCard) }} style={{ width: cardW, height: cardH, resizeMode: 'cover', borderRadius: 10, backgroundColor: 'rgba(00, 00, 00, 10)', }} />
                        <Image source={{ uri: (logo) }} style={{ width: cardW / 2, height: cardH / 3, position: 'absolute', top: cardH / 9 - 20 }} />
                        <View style={{ position: 'absolute', top: wWidth / 3.1, left: 20 }}>
                            {/* <Text style={[styles.cardTxt, text.smallPlus, { color: colors.light, fontWeight: '600', marginVertical: spacing.s }]}>JUAN DELA CRUZ</Text> */}
                            <Text style={[styles.cardTxt, text.smallPlus, { color: colors.light, fontWeight: '600', marginVertical: spacing.s }]}>{`${userFirstName} ${userLastName}`}</Text>
                            <Text style={[styles.cardTxt, text.smallPlus, { color: colors.light, fontWeight: '600' }]}>{`+63 ${regNumber}`}</Text>
                        </View>
                        <View style={{ position: 'absolute', top: wHeight / 13 - 12, alignSelf: 'center' }}>
                            <Text style={[text.smallPlus, { color: colors.light, alignSelf: 'center', fontWeight: '600' }]}>Current Balance</Text>
                            <Text style={[styles.priceTxt, text.extraL]}>₱ {walletBalance.toLocaleString()}</Text>
                        </View>
                    </View>
                    <ScrollView horizontal={true} style={{ alignSelf: 'center' }} showsHorizontalScrollIndicator={false}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.m }}>
                            
                            <RequestWithdraw children={undefined} childrenTwo={undefined} name={""} iconName={""} fromWSreen={"wallet"}/>
                            <TopUpRequest children={undefined} childrenTwo={undefined} name={""} iconName={""} fromWSreen={"wallet"}/>
                            <TransferEmoney children={undefined} childrenTwo={undefined} name={""} iconName={""} fromWSreen={"wallet"}/>
                            <Bank children={undefined} childrenTwo={undefined} name={""} iconName={""} fromWSreen={""}/>
                        </View> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.m, marginHorizontal:spacing.s }}>
                            {/* TODO: CashIN */}
                            {/* <TouchableOpacity> */}
                            <TouchableOpacity onPress={() => navigationCashInModal()}>
                                <View style={[styles.walletOptions, styles.iconSpacing]}>
                                    <Icon type="ionicon" name="wallet-outline" color={colors.grayText} size={35} />
                                </View>
                                <Text style={[text.smallPlus, styles.cardTxt, styles.cardTxtStyle]}>Cash In</Text>
                            </TouchableOpacity>
                            <PayWallet name={""} iconName={""} fromWSreen={""} />
                            {/* <TouchableOpacity onPress={() => { navigation.navigate("ConvertPoints")}}> */}
                            <TouchableOpacity>
                                <View style={[styles.walletOptionsDisable, styles.iconSpacing]}>
                                    <Icon type="ionicon" name="swap-vertical-outline" color={colors.grayText} size={35} />
                                </View>
                                <Text style={[text.smallPlus, styles.cardTxt, styles.cardTxtStyle]}>Convert</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => {navigation.navigate('Points')}}> */}
                            <TouchableOpacity>
                                <View style={[styles.walletOptionsDisable, styles.iconSpacing]}>
                                    <Icon type="ionicon" name="flash-outline" color={colors.grayText} size={35} />
                                </View>
                                <Text style={[text.smallPlus, styles.cardTxt, styles.cardTxtStyle]}>Points</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={[styles.walletOptionsDisable, styles.iconSpacing,]}>
                                    <Icon type="ionicon" name="grid-outline" color={colors.grayText} size={35} />
                                </View>
                                <Text style={[text.smallPlus, styles.cardTxt, styles.cardTxtStyle]}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={[{ marginTop: spacing.m }]}>
                        <View>
                            <Text style={[styles.titleHistory, text.medium, { color: colors.black, padding: spacing.s, fontWeight: '700' }]}>Rapidoo Cares</Text>
                        </View>
                        <FlatList
                            data={Donation}
                            horizontal
                            renderItem={({ item, index }) => {

                                return (
                                    <View>
                                        <View style={{ marginHorizontal: spacing.s }}>
                                            <Image source={{ uri: (donation) }} style={[styles.imgDonation]} />
                                        </View>
                                        <View style={[styles.donationCard, { backgroundColor: colors.light, elevation: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginHorizontal: spacing.s, padding: spacing.s }]}>
                                            <Text style={[styles.smallNormalTxt, text.normal, { color: colors.black }]}>{item.donationName}</Text>
                                            <Text style={[styles.smallTxt, text.small]}>{item.contents}</Text>
                                        </View>
                                        <View>
                                            <Text style={[text.normal, { textAlignVertical: 'bottom', zIndex: 1, color: colors.orange, top: DonationCardH / 10 - 45, left: 25 }]}>
                                                {item.points} <Text style={[text.normal, { color: colors.black }]}> points</Text>
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: spacing.m }}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:spacing.s, marginBottom:spacing.s}}>
                            <Text style={[styles.titleHistory, text.medium, { color: colors.black, fontWeight: '700' }]}>Financial History</Text>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('WalletHistory')} 
                                style={{flexDirection:'row', gap:spacing.s}}
                            >
                                <Text style={[styles.titleHistory, text.normal, { color: colors.grayText, fontWeight: '600', alignSelf:'center'}]}>See all</Text>
                                <View style={{flexDirection:'row', alignSelf:'center'}}>
                                    <Icon type="ionicon" name={"chevron-forward-outline"} size={20} color={colors.grayText} style={{alignSelf:'center'}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={isTransactions}
                            style={{ width: "100%", height: 'auto', marginBottom: spacing.xl }}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                console.log("---- ",item.type);
                                
                                return (
                                    <>
                                        <View style={[shadow.dark, { elevation: 10, marginHorizontal:spacing.s }]}>
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
                                                <View style={{ justifyContent: 'center', width: "52%" }}>
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
                    </View>
                </View>
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
    bigTxt: {
        fontWeight: '700',
    },
    normalTxt: {
        fontWeight: '400',
    },
    imgDonation: {
        height: 140,
        width: DonationCardW,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    donationCard: {
        height: DonationCardH,
        width: DonationCardW,
    },
    smallNormalTxt: {
        fontWeight: '400',
    },
    smallTxt: {

    },
    walletOptions: {
        height: 53,
        width: 53,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.gray
    },
    walletOptionsDisable: {
        height: 53,
        width: 53,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.grayTwo
    },
    walletOptionsSelected: {
        height: 60,
        width: 60,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.orange
    },
    iconSpacing: {
        justifyContent: 'center'
    },
    titleHistory: {
        fontWeight: '500',
    },
    titleHeader: {
        fontWeight: '500',
        color: colors.black
    },
    historyListCredited: {
        // justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
        padding: spacing.s,
        marginVertical: spacing.s,
        backgroundColor: colors.light,
        borderRightColor: colors.green,
        borderRightWidth: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    historyListDebited: {
        // justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
        padding: spacing.s,
        marginVertical: spacing.s,
        backgroundColor: colors.light,
        borderRightColor: colors.red,
        borderRightWidth: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    historyListTransfer: {
        // justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
        padding: spacing.s,
        marginVertical: spacing.s,
        backgroundColor: colors.light,
        borderRightColor: colors.orange,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }

})