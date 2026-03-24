// 
// jest.config.js
module.exports = {
  runner: "jest-runner", // default runner
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-keychain' + // 👈 ADD THIS
      '|react-native-config' + // 👈 ADD THIS
      '|react-native-device-info' + // 👈 ADD THIS
      ')/)',
  ],
};
