import { Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../common/Header";
import { Image } from "react-native";
import { colors, sizes, spacing, text, verticalScale } from "../../app/constants/theme";
import { AddTipData, NotificationData } from "../../app/assets/data/data";
import { logo, parcel } from "../../app/assets/img/images";
import NotificationComponent from "../common/Notification";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Notification() {

    return (
        <>
            <StatusBar
                barStyle="dark-content" // Or "dark-content" based on your preference
                translucent={true}
                backgroundColor="transparent"
            />
            <Header title="Notification" backBtn={false} settingBtn={false} backFunc={function (): void {
                throw new Error("Function not implemented.");
            }} settingFunc={function (): void {
                throw new Error("Function not implemented.");
            }} />

            {/* <View style={styles.contain}>
                <Image source={require('../../app/assets/img/Notifications.png')} style={styles.imageStyle} />
                <View style={styles.textStyle}>
                    <Text style={[text.medium, styles.titleDescription]}>Alerts Will be visible in this location.</Text>
                    <Text style={[text.smallPlus, styles.description]}>Stay tuned here for promotions, news,</Text>
                    <Text style={[text.smallPlus, styles.description]}>and additional information.</Text>
                </View>
            </View> */}

            <FlatList
                data={NotificationData}
                decelerationRate="fast"
                horizontal={false}
                style={{ height: 'auto' }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    // const backgroundColor = index === isSelectedTip ? colors.mustard : colors.white;
                    // const color = item.id === isSelectedTip ? 'white' : colors.grayText;
                    return (
                        <TouchableOpacity onPress={() => console.log('psst')}>
                            <NotificationComponent severity={item.status} title={item.title} description={item.description} />
                        </TouchableOpacity>
                    );
                }}
            />

        </>
    )
}

const styles = StyleSheet.create({
    contain: {
        height: wHeight,
        width: wWidth,
    },
    imageStyle: {
        marginTop: "30%",
        alignSelf: 'center',
        width: "110%",
        height: "38%",
        resizeMode: 'stretch'
    },
    titleDescription: {
        fontWeight: '700',
        color: colors.black
    },
    description: {
        fontWeight: "400",
        color: colors.black
    },
    textStyle: {
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
    }
})