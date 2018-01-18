import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyD3UlJ-pNRona1CnEK2MYO9LaGTm6Va7t8",
  authDomain: "todolist-23919.firebaseapp.com",
  databaseURL: "https://todolist-23919.firebaseio.com",
  projectId: "todolist-23919",
  storageBucket: "todolist-23919.appspot.com",
  messagingSenderId: "330915887032"
};

firebase.initializeApp(config);

const database = firebase.database()

export { database };
