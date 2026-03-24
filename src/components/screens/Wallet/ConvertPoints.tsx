import { Image, Text, TouchableOpacity } from "react-native";
import { lightning } from "../../../app/assets/img/images";
import { View } from "react-native";
import { colors, sizes, spacing, text } from "../../../app/constants/theme";
import LinearGradient from "react-native-linear-gradient";
import InputOrange from "../../common/InputOrange";
import { ScrollView } from "react-native";
import { Icon } from "@rneui/base";
import { useState } from "react";

export default function ConvertPoints() {
    const [isRapidooWallet, setIsRapidooWallet] = useState(true);

    const toggleWallet = () => { setIsRapidooWallet(!isRapidooWallet) };
    return (
        <>
            <ScrollView style={{ paddingHorizontal: spacing.m }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: lightning }} style={{ width: 50, aspectRatio: 1 / 1, alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[text.extraL, { fontWeight: '700', color: colors.black }]}>500</Text>
                        <Text style={[text.large, { fontWeight: '600', color: colors.grayText, textAlignVertical: 'bottom', marginLeft: spacing.s }]}>Points</Text>
                    </View>
                </View>

                <View style={{ marginTop: spacing.m, flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                    <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "42%", height: 120, borderRadius: sizes.sradius }} colors={[colors.orange, colors.yellow]}>
                        <View style={{ alignSelf: 'center', marginTop: spacing.s }}>
                            <Text style={[text.medium, { color: colors.black }]}>Lightning Points</Text>
                        </View>
                        <View style={{ marginTop: spacing.l, marginLeft: spacing.m }}>
                            <Text style={[text.mediumLarge, { color: colors.black, fontWeight: '700' }]}>10</Text>
                        </View>
                    </LinearGradient>
                    <View style={{ alignSelf: 'center' }}>
                        <Icon type="ionicon" name="swap-horizontal-outline" />
                    </View>
                    <TouchableOpacity onPress={toggleWallet} style={{ width: "42%" }} >
                        <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "100%", height: 120, borderRadius: sizes.sradius }} colors={[colors.grayText, colors.gray]}>
                            <View style={{ alignSelf: 'center', marginTop: spacing.s }}>
                                {
                                isRapidooWallet == true ?
                                <Text style={[text.medium, { color: colors.black }]}>E-Money</Text>
                                :
                                <Text style={[text.medium, { color: colors.black }]}>Rapidoo Wallet</Text>
                                }
                            </View>
                            <View style={{ marginTop: spacing.l, marginLeft: spacing.m }}>
                                <Text style={[text.medium, { color: colors.black, fontWeight: '700' }]}>Php 10</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {
                    isRapidooWallet &&
                    <View>
                        <View style={{ marginVertical: spacing.m }}>
                            <Text style={[text.mediumLarge, { fontWeight: '700', color: colors.black }]}>Bank Details</Text>
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.medium, { fontWeight: '600', marginBottom: spacing.s, color: colors.black }]}>Type of Bank</Text>
                            <InputOrange keyboardType={"default"} editable={true} onChange={() => { }} value={""} placeholder={"Select Type of Bank here.."} />
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.medium, { fontWeight: '600', marginBottom: spacing.s, color: colors.black }]}>Bank Name</Text>
                            <InputOrange keyboardType={"default"} editable={true} onChange={() => { }} value={""} placeholder={"Enter your Bank name here.."} />
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.medium, { fontWeight: '600', marginBottom: spacing.s, color: colors.black }]}>Email</Text>
                            <InputOrange keyboardType={"default"} editable={true} onChange={() => { }} value={""} placeholder={"Enter your Email here"} />
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.medium, { fontWeight: '600', marginBottom: spacing.s, color: colors.black }]}>Account Number</Text>
                            <InputOrange keyboardType={"default"} editable={true} onChange={() => { }} value={""} placeholder={"Enter your Account Number here.."} />
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.medium, { fontWeight: '600', marginBottom: spacing.s, color: colors.black }]}>Confirm Account Number</Text>
                            <InputOrange keyboardType={"default"} editable={true} onChange={() => { }} value={""} placeholder={"Confirm Account Number here.."} />
                        </View>

                    </View>
                }

                <View style={{ marginVertical: spacing.m }}>
                    <Text style={[text.mediumLarge, { fontWeight: '700', color: colors.black }]}>Points History</Text>
                </View>
                <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "100%", height: "auto", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.s, paddingVertical: spacing.s, borderRadius: sizes.sradius, marginBottom: spacing.m }} colors={[colors.orange, colors.yellow]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: colors.light, borderRadius: 100, paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginHorizontal: spacing.s }}>
                            <Image source={{ uri: lightning }} style={{ width: 48, aspectRatio: 1 / 1 }} />
                        </View>
                        <View>
                            <Text style={[text.medium, { fontWeight: '700', color: colors.black }]}>Lightning Points</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.black }]}>Transaction #0123456789</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.white }]}>January 7, 2024</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginRight: spacing.s }}>
                        <Text style={[text.medium, { fontWeight: '600', color: colors.black }]}>10 Pts</Text>
                    </View>
                </LinearGradient>
                <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "100%", height: "auto", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.s, paddingVertical: spacing.s, borderRadius: sizes.sradius, marginBottom: spacing.m }} colors={[colors.orange, colors.yellow]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: colors.light, borderRadius: 100, paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginHorizontal: spacing.s }}>
                            <Image source={{ uri: lightning }} style={{ width: 48, aspectRatio: 1 / 1 }} />
                        </View>
                        <View>
                            <Text style={[text.medium, { fontWeight: '700', color: colors.black }]}>Lightning Points</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.black }]}>Transaction #0123456789</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.white }]}>January 7, 2024</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginRight: spacing.s }}>
                        <Text style={[text.medium, { fontWeight: '600', color: colors.black }]}>10 Pts</Text>
                    </View>
                </LinearGradient>
                <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "100%", height: "auto", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.s, paddingVertical: spacing.s, borderRadius: sizes.sradius, marginBottom: spacing.m }} colors={[colors.orange, colors.yellow]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: colors.light, borderRadius: 100, paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginHorizontal: spacing.s }}>
                            <Image source={{ uri: lightning }} style={{ width: 48, aspectRatio: 1 / 1 }} />
                        </View>
                        <View>
                            <Text style={[text.medium, { fontWeight: '700', color: colors.black }]}>Lightning Points</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.black }]}>Transaction #0123456789</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.white }]}>January 7, 2024</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginRight: spacing.s }}>
                        <Text style={[text.medium, { fontWeight: '600', color: colors.black }]}>10 Pts</Text>
                    </View>
                </LinearGradient>
                <LinearGradient start={{ x: 1, y: 0.1 }} style={{ width: "100%", height: "auto", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.s, paddingVertical: spacing.s, borderRadius: sizes.sradius, marginBottom: spacing.m }} colors={[colors.orange, colors.yellow]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: colors.light, borderRadius: 100, paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginHorizontal: spacing.s }}>
                            <Image source={{ uri: lightning }} style={{ width: 48, aspectRatio: 1 / 1 }} />
                        </View>
                        <View>
                            <Text style={[text.medium, { fontWeight: '700', color: colors.black }]}>Lightning Points</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.black }]}>Transaction #0123456789</Text>
                            <Text style={[text.smallPlus, { fontWeight: '600', color: colors.white }]}>January 7, 2024</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginRight: spacing.s }}>
                        <Text style={[text.medium, { fontWeight: '600', color: colors.black }]}>10 Pts</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    )
}