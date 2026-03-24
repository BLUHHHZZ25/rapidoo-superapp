import { NativeModules } from 'react-native';

// import { getUniqueIdSync } from 'react-native-device-info';
import VersionInfo from 'react-native-version-info';

const { RNBuildConfig } = NativeModules;

const { PRODUCTION, APP, X_APP_TYPE } = RNBuildConfig;

const production = PRODUCTION;
const app = APP;
const APP_HTTP_HEADERS = {
  'x-rapidooph-version': VersionInfo.appVersion,
  'x-rapidooph-build': VersionInfo.buildVersion,
  'x-rapidooph-app': 'customer',
  // uuid: getUniqueIdSync(),
  'x-app-type': X_APP_TYPE,
};

export { production, app, APP_HTTP_HEADERS };
