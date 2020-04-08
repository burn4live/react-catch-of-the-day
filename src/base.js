import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYSpaL-OiBWWenQkts4rR6hnjqqZ6unWg",
  authDomain: "catch-of-the-day-a161a.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-a161a.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

  // named export
export { firebaseApp };

// default export
export default base;