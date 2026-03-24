import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Icon } from '@rneui/base';

// Screens
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Transaction from '../screens/Transaction';
import Wallet from '../screens/Wallet';

import { Image, StyleSheet, Text } from 'react-native';
import { Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Coupon from '../screens/Profile/Coupon';
import Referrals from '../screens/Profile/Referrals';
import { View } from 'react-native';
import { colors, moderateScale, sizes, spacing, text } from '../../app/constants/theme';
import { getAllPosts } from '../../app/watermelonDB/model/model';


//Screen names

const tabs = [
  {
    name: 'home',
    screen: Home,
    screenName: 'Home'
  },
  {
    name: 'transaction',
    screen: Transaction,
    screenName: 'Transaction'
  },
  {
    name: 'wallet',
    screen: Wallet,
    screenName: 'Wallet'
  },
  {
    name: 'notification',
    screen: Notification,
    screenName: 'Notification'
  },
  {
    name: 'profile',
    screen: Profile,
    screenName: 'Profile'
  },
];

type iconName = 'home' | 'transaction' | 'wallet' | 'notification' | 'profile';

type iconType = {
  active: File | string | any,
  inactive: File | string | any
}

const iconMap:Record<iconName,iconType> = {
  home: {
    active: require('../../app/assets/img/navbar/home-selected.png'),
    inactive: require('../../app/assets/img/navbar/home.png'),
  },
  transaction: {
    active: require('../../app/assets/img/navbar/transaction-selected.png'),
    inactive: require('../../app/assets/img/navbar/transaction.png'),
  },
  wallet: {
    active: require('../../app/assets/img/navbar/wallet-selected.png'),
    inactive: require('../../app/assets/img/navbar/wallet.png'),
  },
  notification: {
    active: require('../../app/assets/img/navbar/notification-selected.png'),
    inactive: require('../../app/assets/img/navbar/notification.png'),
  },
  profile: {
    active: require('../../app/assets/img/navbar/profile-selected.png'),
    inactive: require('../../app/assets/img/navbar/profile.png'),
  },
};

const Tab = createBottomTabNavigator();

function MainContainer() {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  
  
  return (
    <>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.mustard,
          headerShown: false,
          tabBarStyle: {
            // paddingTop: 7,
            height: 60,
          }
        }}>
        {tabs.map(({ name, screen, screenName }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={screenName}
              component={screen}
              options={{
                tabBarIcon: ({ focused }) => {
                  const iconSource = focused
                    ? iconMap[name].active
                    : iconMap[name].inactive;
                  return (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={iconSource}
                        style={{
                          width: moderateScale(18),
                          height: moderateScale(18),
                          tintColor: focused ? colors.mustard : colors.grayText,
                        }}
                      />
                    </View>
                  );
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
            />
          );
        })}

      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default MainContainer;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 40,
    height: 3,
    left: sizes.width / tabs.length / 2.5 - 7,
    bottom: 60,
    backgroundColor: colors.mustard,
    zIndex: 100,
  }
})