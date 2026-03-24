import { Text } from "react-native-paper"
import { SafeAreaView, StatusBar, ScrollView, View, useColorScheme, Dimensions, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faChevronDown, faChevronUp, faClose } from "@fortawesome/free-solid-svg-icons";
// import { colors, spacing, text } from "../constants/theme";
import { colors, spacing, text } from "../../app/constants/theme";

const fullHeight = Dimensions.get('window').height;

type DataProps = {
    key: string,
    value:string
}

type Props = {
    label: string,
    onChangeText: ( value:string) => void,
    datas: DataProps[]
    value: string,
    editable?: boolean
}

const DropDown = ({ onChangeText, label, datas, value, editable = true }: Props) => {
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [search, setSearch] = useState('');
    const [borderColor, setBorderColor] = useState(colors.inputBorder);
    return (
        <SafeAreaView>
            <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    editable={false}
                    style={{
                        width: '100%',
                        height: 48,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor,
                        borderRadius: 20,
                        color:colors.black,
                        paddingHorizontal: 20,}}/>
                <Text style={[text.small,{
                    position: 'absolute',
                    backgroundColor: 'white',
                    left: '4%',
                    paddingHorizontal: 10,
                    color:colors.black,
                    fontWeight:'700',
                    top: '-24%',
                    paddingLeft:20}]}>
                    {label}
                </Text>
                {
                    // toggleDropDown ? <Pressable style={{
                    //         position: 'absolute',
                    //         right: 20
                    //     }} 
                    //     onPress={() => setToggleDropDown(false)}><FontAwesomeIcon icon={faChevronUp} />
                        
                    //     </Pressable> 
                    //     : 
                    //     <Pressable style={{
                    //         position: 'absolute',
                    //         right: 20,
                    //     }} onPress={() => setToggleDropDown(true)}>
                    //     {editable && <FontAwesomeIcon icon={faChevronDown} />}
                    //     </Pressable>
                }

                {
                    toggleDropDown && 
                    datas.map((data, index) => {
                        return(
                        <Pressable 
                            key={index} 
                            onPress={() => {
                                onChangeText(data.value)
                                setToggleDropDown(false)
                            }}
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                height: 48,
                                position: 'absolute',
                                top: (index + 1) * 48,
                                zIndex: 10}}>
                            <View
                                style={{
                                    height: 50,
                                    width: '100%',
                                    justifyContent: 'center',
                                    paddingLeft: 50,
                                    borderStyle: 'solid',
                                    backgroundColor:colors.light,
                                    borderLeftWidth: 1,
                                    borderRightWidth: 1,
                                    }}>
                                <Text>
                                    {data.key}
                                </Text>
                            </View>
                        </Pressable>
                        )}
                    )}
            </View>
        </SafeAreaView>
    )
}

export default DropDown;