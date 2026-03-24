import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Text, View, useColorScheme, TextInput, KeyboardTypeOptions, Pressable } from "react-native"

const InputField = ({fieldName, state, setState, keyType = 'default', secEntry = false, isPhoneNumber = false, isEditable = true}: {fieldName: string, state: any, setState: any, keyType?: KeyboardTypeOptions, secEntry?: boolean, isPhoneNumber?: boolean, isEditable?: boolean}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const inputRef = useRef<any>(null);
    const [isShowPassword, setIsShowPassword] = useState(true);


    const handleChange = (e: string) => {
        setState({...state, [fieldName]: e});
    }

    return(
                    <View
                        style={{
                            width: `100%`,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            backgroundColor: 'white',
                        }}
                    >
                        <TextInput
                            ref={inputRef}
                            onChangeText={e => handleChange(e)}
                            style={{
                                width: '100%',
                                zIndex: 10,
                                paddingLeft: isPhoneNumber ? 40 : 10,
                                paddingRight: 10,
                                color: 'black'
                            }}
                            keyboardType={keyType}
                            secureTextEntry={secEntry ? isShowPassword : false}
                            maxLength={isPhoneNumber ? 10 : 255}
                            editable={isEditable}
                        />
                        <Text style={{
                            position: 'absolute',
                            backgroundColor: 'white',
                            zIndex: -10,
                            left: 22,
                            paddingHorizontal: 10,
                            top: '-24%',
                        }}>
                            {fieldName}
                        </Text>
                        {
                            isPhoneNumber && <View
                                style={{
                                    position: 'absolute',
                                    left: 10
                                }}
                            >
                                <Text style={{
                                    color: 'black'
                                }}>+63</Text>
                            </View>
                        }
                        {
                            secEntry && (
                                isShowPassword ? <Pressable style={{
                                    position: 'absolute',
                                    right: 10,
                                    zIndex: 20
                                }} onPress={() => setIsShowPassword(false)}><FontAwesomeIcon icon={faEyeSlash} color="#000"/></Pressable> : <Pressable style={{
                                    position: 'absolute',
                                    right: 10,
                                    zIndex: 20
                                }} onPress={() => setIsShowPassword(true)}><FontAwesomeIcon icon={faEye} color="#000"/></Pressable>
                            )
                        }
                    </View>
    )
}

export default InputField;