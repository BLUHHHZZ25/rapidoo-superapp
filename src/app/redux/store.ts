import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from './reducers/counterSlice';
import { registrationSlice } from './reducers/registrationSlice';
import { maplocationSlice } from './reducers/maplocation';
import {appInfoSlice} from './reducers/appInfoSlice';
import { sendOTPSlice } from './reducers/sendOTPSlice';
import {signInSlice} from './reducers/signInSlice';
import { otpEnterSlice } from './reducers/otpEntrySlice';
import {TransactionOrderSlice} from './reducers/transactionOrder';
import {historySlice} from './reducers/historySlice';
import {walletSlice} from './reducers/walletSlice';


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    registrationCounter:registrationSlice.reducer,
    maplocation: maplocationSlice.reducer,
    appInfo: appInfoSlice.reducer,
    sendOTP: sendOTPSlice.reducer,
    otpEntry: otpEnterSlice.reducer,
    signIn: signInSlice.reducer,
    transactionOrder: TransactionOrderSlice.reducer,
    history: historySlice.reducer,
    wallet: walletSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
