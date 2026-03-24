import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "@rneui/themed"
import React from "react"
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';


const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

type Props = {
    titlePointers: string,
    descriptionPointers: string
}


const Pointers = ({titlePointers,descriptionPointers}:Props) => { // used in Referral

    return (
        <View style={{ flexDirection: 'row', width:320}}>
            <View style={{marginHorizontal:spacing.s}}>
                <Icon type="ionicon" name="ellipse" color={colors.mustard} />
            </View>
            <View>
                <Text style={[text.smallPlus,styles.pointDescription]}><Text style={[text.normal,styles.pointTitle]}>{titlePointers}</Text>{descriptionPointers}</Text>
            </View>

        </View>
    )
}

export default Pointers;


const styles = StyleSheet.create({
    pointTitle:{
        fontWeight:'700',
        color:colors.grayText
    },
    pointDescription:{
        fontWeight:'400',
        color:colors.grayText,
        width:'auto'
    }
})