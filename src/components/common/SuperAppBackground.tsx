import { View,Text, StyleSheet, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { colors, sizes, spacing } from "../../app/constants/theme";
import LinearGradient from "react-native-linear-gradient";
import { logo } from "../../app/assets/img/images";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function SuperAppBackground() {

    return (
        <SafeAreaView style={styles.viewBackground}>
            <View 
                style={styles.gradientBackground} 
            > 
                <ImageBackground
                    source={require('../../app/assets/img/background.png')} // Your image path here
                    style={styles.gradientBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover"
                    > 
                    <Image 
                        source={{ uri: logo }} 
                        style={styles.logoStyle}
                    />
                    <Text style={styles.titleText}>Superapp</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewBackground: {
        height: wHeight / 3, 
        width: wWidth*1.5,
        marginLeft: -wWidth*0.25,
        borderBottomLeftRadius: wWidth / 1.5,  // Large radius to create the curve
        borderBottomRightRadius: wWidth / 1.5, // Large radius to create the curve
    },
    gradientBackground: {
        height: wHeight / 2.7,
        width: wWidth*1.5,
        borderBottomLeftRadius: wWidth,  // Large radius to create the curve
        borderBottomRightRadius: wWidth, // Large radius to create the curve
        elevation: 5
    },
    logoStyle: {
        height: wWidth / 1.8,
        width: wWidth / 1.04,
        alignSelf: 'center',
        marginTop: spacing.l
    },
    imageStyle: {
        borderBottomLeftRadius: wWidth,
        borderBottomRightRadius: wWidth,
    },
    titleText: {
        color: colors.light,
        marginTop: -59,
        fontWeight: '900',
        alignSelf: 'center',
        fontSize: 34,
        textShadowColor: colors.grayText, // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow blur radius
        
    }
});