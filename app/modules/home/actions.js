import { Actions } from 'react-native-router-flux';
import { database } from '../../config/firebase';

export const eventsFetch = () => {

  return (dispatch) => {
    database.ref(`/events`)
      .on('value', snapshot => {
        dispatch({ type: 'events_fetch', payload: snapshot.val() });
      });
  };
};
