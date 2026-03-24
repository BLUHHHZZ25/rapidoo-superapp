import { FlatList, Image, ImageProps, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, text, verticalScale, horizontalScale, sizes } from "../../app/constants/theme";
import { cartPayment, parcel } from "../../app/assets/img/images";
import { useState } from "react";

type Props = {
    list: any,
}

export default function AddTip({ list }: Props) {
    const [isSelectedTip, setIsSelectedTip] = useState(0);
    return (
        <>
            <FlatList
                data={list}
                decelerationRate="fast"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={i => i.id}
                renderItem={({ item, index }) => {
                    const backgroundColor = index === isSelectedTip ? colors.mustard : colors.white;
                    const color = item.id === isSelectedTip ? 'white' : colors.grayText;
                    return (
                        <TouchableOpacity onPress={() => setIsSelectedTip(index)} style={{
                            borderWidth: 1,
                            borderColor: colors.mustard,
                            height: 60,
                            width:"auto",
                            backgroundColor:backgroundColor,
                            marginHorizontal:spacing.s,
                            paddingHorizontal:spacing.m,
                            paddingVertical:spacing.s,
                            borderRadius: sizes.small,
                            marginTop: spacing.s,
                            flexDirection: 'row',
                        }}>
                            <View style={{ alignSelf: 'center' }}><Text style={[text.normal, { fontWeight: '600', color: colors.black }]}>{item.amount}</Text></View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    )
}


const styles = StyleSheet.create({
    additionalSerBorder: {
        borderWidth: 1,
        borderColor: colors.mustard,
        height: 48,
        width:"auto",
        marginHorizontal:spacing.s,
        paddingHorizontal:spacing.s,
        paddingVertical:spacing.s,
        borderRadius: sizes.small,
        padding: spacing.s,
        marginTop: spacing.s,
        flexDirection: 'row',
    },
})