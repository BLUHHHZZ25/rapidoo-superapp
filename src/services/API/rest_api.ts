import axios from "axios";
import Config from 'react-native-config';

async function postRequeest(
    custom_headers : any, 
    data:any, 
    params:any, 
    url:any,
    bearer_token:any,
    uuid: any
){
    let default_header = {
        'Authorization': `Bearer ${bearer_token}`,
        'z-app': 'rapidoo-superapp',
        'z-app-type': Config.z_app_type,
        'z-app-version': Config.z_app_version,
        'z-app-code': Config.z_app_code,
        'uuid': uuid
    }
    const post = await axios.post(
        url,
        data,
        {
            headers:{
                ...default_header,custom_headers
            }
        }
    )
}