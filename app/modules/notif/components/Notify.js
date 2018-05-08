// Notification APIs
import { Permissions, Notifications } from 'expo';

// Firebase Imports
import * as firebase from "../../../config/firebase";

export function getUser() {
    
    let user = firebase.auth.currentUser;
    console.log(user);
    registerForPushNotificationsAsync(user);
}

// Expo Token for sending notifications
registerForPushNotificationsAsync = async ( user ) =>{
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
    
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync()

      var updates = {};
      updates['/expoToken'] = token
      firebase.database.ref('users').child(user.uid).update(updates)
} 