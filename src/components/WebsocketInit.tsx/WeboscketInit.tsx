import {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'react-native';
import { RootState } from '../../app/redux/store';
import { initWebSocket } from '../../services/websocket/WebsocketService';

export const WebSocketInitializer = () => {
  const UserConnected = useSelector(
    (state: RootState) => state.appInfo.isUserConnected,
  );
  const isUserOnline = useSelector(
    (state: RootState) => state.appInfo.isUserOnline,
  );
  const transactionID = useSelector((state: RootState) => state.transactionOrder.transaction_id);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  
  const dispatch = useDispatch();

  // DETECT IF APP IS in background or Foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    initWebSocket(dispatch, UserConnected, transactionID);
  }, [appStateVisible, isUserOnline, UserConnected]);


  return null; // Nothing to render
};
