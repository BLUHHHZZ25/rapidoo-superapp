import * as keychain from 'react-native-keychain';
// import {AppDispatch, store} from '../../redux/store';
// import {
//   setNewOrders,
//   setOrderStatus,
//   setWebsocketPayload,
// } from '../../redux/Slice/transactionSlice';

import Geolocation from '@react-native-community/geolocation';

import { setUserOnline } from '../../app/redux/reducers/appInfoSlice';
import { setWebsocketMessage } from '../../app/redux/reducers/transactionOrder';
import { IAM_WEBSOCKET_URL } from '../../Config';

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL_MS = 5000;

export const initWebSocket = async (dispatch: any, isUserConnected: any, transaction_id: any) => {
  const response: any = await keychain.getGenericPassword();
  const access_json = JSON.parse(response.password);
  
  console.log("DSDSADSADSADSAD");
  
  if (socket) {
    console.log('WebSocket already initialized.');
    return;
  }

  try {
    socket = new WebSocket(
      // "wss://staging.rapidooph.com/iam/app-service/ws",
      IAM_WEBSOCKET_URL,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${access_json.access_token}`,
        },
      },
    );

    socket.onopen = async () => {
      console.log('✅ WebSocket connection established.');

      const data = {
        action_type: 'TIME_IN',
        transaction_id: 1,
      }
      sendWebSocketMessage(data)
    };

    socket.onerror = e => {
      console.error('❌ WebSocket error:', e.message);
      dispatch(setUserOnline('offline'));
    };

    socket.onclose = e => {
      console.warn('⚠️ WebSocket closed:', e.code, e.reason);
      socket = null; // optional: allow reconnecting
      dispatch(setUserOnline('offline'));
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`🔁 Attempting to reconnect... (${reconnectAttempts})`);
        setTimeout(() => {
          initWebSocket(dispatch, isUserConnected, transaction_id); // retry connection
        }, RECONNECT_INTERVAL_MS);
      } else {
        console.warn('❌ Max WebSocket reconnection attempts reached.');
      }
    };

    socket.onmessage = event => {
      console.log('Received WebSocket messageEEEE:', event.data);
      console.log('Received WebSocket messageEEE:', typeof event.data);

      dispatch(setWebsocketMessage(event.data))   
    };
  } catch (err) {
    console.error('❌ Failed to open WebSocket:', err);
    dispatch(setUserOnline('offline'));
  }
};

export const sendWebSocketMessage = (data: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
    console.log('2144334353543543543543543');
  } else {
    console.log('WebSocket not connected, message not sent.');
  }
};
