import axios from 'axios';
import Config from 'react-native-config';
import uuid from 'react-native-uuid';
import { PARCEL_BASE_URL, NOMINATIM_BASE_URL } from '../Config';
import { PARCEL_ENDPOINTS, NOMINATIM_ENPOINTS } from '../app/constants/endpoints';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// Display Vehicle Option in App Start
// https://staging.rapidooph.com/parcel use when in staging
// http://10.0.2.2:8101 use when in local host

export async function getVehicles() {
  try {
    const response = await axios.get(`${PARCEL_BASE_URL+PARCEL_ENDPOINTS.VEHICLE}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

//Get Fare Matrix
export async function getServiceOption() {
  try {
    const response = await axios.get(`${PARCEL_BASE_URL+PARCEL_ENDPOINTS.GET_SERVICE_OPTION}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

//Compute Fare Matrix
export async function computeAmount(delivery_option:any, distance: any, multiple_count: any, access_token:any, dropoff_payload: any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.PAYMENT}`,
      { 
        distance: distance === 0.1 ? 0.1 : distance.split(' ')[0],
        multiple_count: multiple_count <= 1 ? 0 : multiple_count,
        delivery_option: delivery_option,
        dropoff_address: dropoff_payload
      }, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    } 
  } catch (error) {
    console.log(error);
  }
}

// Save Transaction
export async function saveTransactions(transactionData: any, access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
     `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.TRANSACTION}`,
      transactionData, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid

        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// Get Transaction by ID
export async function getTransactionById(id: any) {
  try {
    const response = await axios.get(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.TRANSACTION}/${id}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTransactionStatus(id: any) {
  try {
    const response = await axios.get(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.TRANSACTION_STATUS}`,
      {
        params: {
          transaction_id: id,
        },
      },
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function cancelTransaction(id: any, access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.TRANSACTION_CANCEL}`,
      {
          transaction_id: id,
      }, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkTransaction(status: any, access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.get(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.CHECK_TRANSACTION}`, 
      {
        params: {
          status: status,
        },
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getTransaction(access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.GET_TRANSACTION}`, {},
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function customerTransaction(transaction_id:any, access_token:any) {
  try {
    console.log("SDADADSADA", transaction_id);
    console.log("SDADADSADA", access_token);
    
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.get(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.GET_USER_TRANSACTION}`,
      {
        params: {
          transaction_id: transaction_id,
        },
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateWrongPin(transaction_id: any, index: any, status: any, access_token:any, address: string, addressName: string) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.UPDATE_ADDRESS}`, 
      {
        transaction_id: transaction_id,
        index: index,
        status: status,
        address: address,
        address_name: addressName
      }, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// SAVE ADDRESS
export async function savedAddress(params: any, access_token: any) {
  try {
    const transactionUuid: string | any = uuid.v4()

    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.CREATE_SAVE_ADDRESS}`, {
        place_id: params.placeID,
        address_name: params.addressName,
        full_address: params.fullAddress,
        contact_name: params.contact_name,
        contact_number: params.contact_number
      },
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// FETCH ALL SAVE ADDRESS
export async function getSavedAddress(access_token: any) {
  try {
    const transactionUuid: string | any = uuid.v4()

    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.GET_SAVED_ADDRESS}`, {},
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// REMOVE SAVE ADDRESS
export async function removeSavedAddress(place_id: any, access_token: any) {
  try {
    const transactionUuid: string | any = uuid.v4()

    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.REMOVE_SAVE_ADDRESS}`, {
        place_id: place_id
      },
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function favoriteRider(rider_account_id: string, rider_name: string, access_token:any){
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.ASSIGN_RIDER}`, 
      {
        rider_account_id: rider_account_id,
        rider_name: rider_name
      }, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    
  }
}

export async function getFavoriteRider(access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.get(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.FAVORITE_RIDER}`, 
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkFavoriteRider(rider_data:any, access_token:any) {
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.RIDER_STATUS}`, {
        rider_account_id: rider_data.rider_account_id,
        rider_name: rider_data.rider_name
      },
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "z-app": "rapidoo-superapp",
          'z-app-type': Config.z_app_type,
          'z-app-version': Config.z_app_version,
          'z-app-code': Config.z_app_code,
          'uuid': transactionUuid
        }
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkCurrentTransaction(transaction_id:any) {
  try {
    const response = await axios.post(
      `${PARCEL_BASE_URL+PARCEL_ENDPOINTS.CHECK_CUSTOMER_TRANSACTION}`, {
        transaction_id: transaction_id,
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function validateDropOff(action_type: any, params: any, access_token: any){
  try {
    const transactionUuid: string | any = uuid.v4()
    const response = await axios.post(`${PARCEL_BASE_URL+PARCEL_ENDPOINTS.VALIDATE_DROPOFF}`, {
      action_type: action_type,
      pickup_payload: params.pickup_payload,
      dropoff_payload: params.dropoff_payload,
      validate_dropoff: params.validate_dropoff,
    }, {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "z-app": "rapidoo-superapp",
        'z-app-type': Config.z_app_type,
        'z-app-version': Config.z_app_version,
        'z-app-code': Config.z_app_code,
        'uuid': transactionUuid
      }
    })
    if (response){
      return response.data
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCityFromCoordinates(latitude: any, longitude: any) {
  try {
    const response = await axios.get(
      `${PARCEL_BASE_URL}${PARCEL_ENDPOINTS.GET_CITY_COORDS}?lat=${latitude}&long=${longitude}`
    );
    if (response){
      return response.data
    }
  } catch (error) {
    console.log(error);
  }
}