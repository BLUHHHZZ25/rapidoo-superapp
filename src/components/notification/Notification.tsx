import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';

export const foregroundAction = () => {
  // Handle displaying of Notification while application is open
  return notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification?.data);
        break;
      case EventType.PRESS:
        console.log('User pressedd notification', detail.notification?.data);
        // NavigationService.navigation(detail.notification?.data?.redirect_to);
        Linking.openURL(`rapidoo://superapp/history/`);
        break;
    }
  });
};
