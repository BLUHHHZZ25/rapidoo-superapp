import { useEffect, useState } from "react";
import { Text, View } from "react-native"

const Notification = ({severity, title, description} : {
    severity : string, 
    // severity : 'error' | 'warning' | 'success', 
    title: string, description: string}) => {
    const [color, setColor] = useState<'red' | 'orange' | 'green'>('green');
    useEffect(() => {
        switch (severity) {
            case 'error':
                setColor('red');
                break;
        
            case 'warning':
                setColor('orange');
                break;
        
            case 'success':
                setColor('green');
                break;
        
            default:
                break;
        }
    }, [color])
    return(
        <View style={{
            minHeight: 70,
            flexDirection: 'row',
            gap: 20,
            paddingHorizontal: '5%',
            alignItems: 'center'
        }}>
            <View style={{
                height: 16,
                width: 16,
                borderRadius: 50,
                backgroundColor: color
            }}>
            </View>
            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    color: color,
                    fontSize: 16
                }}>
                    {title}
                </Text>
                <Text style={{
                    color: 'black'
                }}>
                    {description}
                </Text>
            </View>
        </View>
    )
}

export default Notification