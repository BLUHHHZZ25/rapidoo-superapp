import crashlytics from '@react-native-firebase/crashlytics';

function CrashlyticsErrorHandler(error: any, screenName: any, methodName: any) {
  const crashReport = JSON.stringify({
    screen: screenName,
    function: methodName,
    description: error,
  });
  crashlytics().log(crashReport);
  crashlytics().recordError(error);
}

export default CrashlyticsErrorHandler;
