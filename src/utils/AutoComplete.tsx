import axios from 'axios';
import {
  GOOGLE_API_KEY,
  GOOGLE_AUTOCOMPLETE_URL,
} from '../app/constants/config';
import { useRef } from 'react';
import CrashlyticsErrorHandler from './Crashlytics/CrashlyticsErrorHandler';

//CHECK IF CHARACTER IS > 4 TO DISPLAY SUGGESTIONS
const AutoComplete = async (text: string, isLoading: any) => {
  if (text.length >= 3) {
    try {
      isLoading(true);
      const result = await axios.get(GOOGLE_AUTOCOMPLETE_URL, {
        params: {
          input: text,
          location: '14.7086732, 120.9927788', //CURRENT LOCATION
          radius: 400,
          components: 'country:ph',
          key: GOOGLE_API_KEY,
        },
      });

      if (result) {
         setInterval(() => {
          isLoading(false);
        }, 500);

        console.log(result.data.predictions);
        //   setPlace(result.data.predictions);
        return result.data.predictions;
      }
      console.log(text.length);
      console.log(text);
      console.log(isLoading);
    } catch (error) {
      CrashlyticsErrorHandler(error, 'AutoComplete.tsx', 'AutoComplete');
      console.log(error);
    }
  } else if (text.length < 4) {
    //   setPlace([]);
    console.log('Nothing');
    return undefined;
  }
};

export default AutoComplete;
