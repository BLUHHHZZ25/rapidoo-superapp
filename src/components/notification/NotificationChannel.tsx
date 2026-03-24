import notifee from '@notifee/react-native';

//Notifee Display Notification
async function onDisplayNotification(body: any, title: any, data: any) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      smallIcon: 'ic_stat_name',
      color: '#9F75FF',
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

//Notifee Display Notification
async function onDisplayNotificatio(body: any, title: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
  
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

export default onDisplayNotification;
export {onDisplayNotificatio} //export multiple Channels