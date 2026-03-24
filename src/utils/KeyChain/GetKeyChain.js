import * as Keychain from 'react-native-keychain'

export async function KeyChainGet(){
    const data = await Keychain.getGenericPassword()
    const data_type = JSON.stringify(data.password)
    
    const data_string = JSON.parse(data_type)
    const data_parse = JSON.parse(data_string)

    console.log("\n\n\n data__", data_parse.access_token)
  

    return data_parse
  }