import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { HistoryElement } from "../components/navigations/HistoryNavigation";


type navigateType = {
    navigationTo : any,
    params: {
        message: any,
        yesFunction: () => void
    }
}

const useHardwareBack = (navigationTo:any, params:object) => {
    const navigationHistory = useNavigation<NativeStackNavigationProp<HistoryElement>>();

    useEffect(() => {
    const backAction = () => {
        navigationHistory.navigate(navigationTo, params)
        return true;
        }
    
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)
        return () => backHandler.remove()
    },[])

}

export default useHardwareBack;
