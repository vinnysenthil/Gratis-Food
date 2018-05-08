import { auth, database, provider } from "../../config/firebase";

//Get the user object from the realtime database
export function getEvents(event, callback) {
    database.ref('events').once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}
