import { Animated, Dimensions, Image, Text, View } from "react-native"
import { colors } from "../../app/constants/theme"
import { Icon } from "@rneui/themed"
import { useEffect, useRef } from "react"

const fullHeight = Dimensions.get('screen').height
const fullWidth = Dimensions.get('screen').width

const NoInternet = () => {
    const iconVariants = ["alert-circle-outline", "alert-outline", "warning-outline"]
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    const alignment = (InDex: number) => {
        if(InDex % 3 === 0){
            return 'flex-end'
        }
        if(InDex % 2 === 0){
            return 'center'
        }
        if(InDex % 1 === 0){
            return 'flex-start'
        }
    }
    useEffect(() => {
        Animated.timing(backgroundOpacity, {
            toValue: .75,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, [])
    return(
        <View style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            backgroundColor: colors.mustard,
            overflow: 'hidden',
            position: 'relative'
        }}>
            <View style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                paddingHorizontal: '10%',
            }}>
                {
                    iconVariants.map((icon, index) => <Icon key={index} type="ionicon" name={icon} style={{
                        alignSelf: alignment(index),
                        height: fullHeight / 3,
                    }} color={colors.mustardOpacity} size={fullWidth / 3}/>)
                }
            </View>
            <Animated.View
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: '#111',
                    opacity: backgroundOpacity
                }}
            >
            </Animated.View>
            <Text style={{
                fontSize: 48,
                fontWeight: '900',
                color: colors.violet,
            }}>
                No Internet
            </Text>
            <Text style={{
                fontSize: 24,
                fontWeight: '500',
                color: colors.mustard
            }}>
                Cannot serve you, my bad luv
            </Text>
        </View>
    )
}

export default NoInternet