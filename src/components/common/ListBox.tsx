import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "@rneui/themed"
import React from "react"
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

type Props = {
    titleList: string,
    onPress: () => void
}


const ListBox = ({ titleList, onPress }: Props) => { // used in profile 

    return (
        <TouchableOpacity style={styles.directionItemsRow} onPress={onPress}>
            <View style={styles.directionItemsColumns}>
                <Text style={[text.normal,{color:colors.black, fontWeight:'500'}]}>{titleList}</Text>
            </View>
            <View style={styles.arrowStyle} >
                <Icon type="ionicon" color={colors.grayText} name="chevron-forward" size={30} />
            </View>
        </TouchableOpacity>
    )
}

export default ListBox;


const styles = StyleSheet.create({
    directionItemsColumns: {
        alignSelf:'center',
        left:spacing.s
    },
    directionItemsRow: {
        justifyContent:'space-between',
        flexDirection: 'row',
        marginVertical:spacing.s
    },
    iconStyle: {
        marginLeft: 50,
        marginRight: 20,
    },
    itemStatus: {
        fontSize: wHeight / 60,
        fontWeight: '400',
        color: '#cf9c13',
        fontFamily: 'OpenSans-Regular'
    },
    arrowStyle: {
        alignSelf:'center'
    },
})