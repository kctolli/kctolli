const initializeApp = require('firebase-admin/app');
const getFirestore = require('firebase-admin/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyD_nYHkWxZnMqN65E7mW6R8iALstphLxeY",
    authDomain: "kctolli-github.firebaseapp.com",
    databaseURL: "https://kctolli-github-default-rtdb.firebaseio.com",
    projectId: "kctolli-github",
    storageBucket: "kctolli-github.appspot.com",
    messagingSenderId: "190805931323",
    appId: "1:190805931323:web:f4086f461fdea54da6331e"
};

const app = initializeApp(firebaseConfig);
const db = database();

module.exports = {app, db};
