import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
//import admin from 'firebase-admin';

// @ts-ignore
//let serviceAccount = require('firebase-adminsdk-4vovk@sveltetaxi.iam.gserviceaccount.com');

const firebaseConfig = {
	//credential: admin.credential.cert(serviceAccount),
	apiKey: 'AIzaSyBHEhtO7AtePj-X045LXPL4XS8AC_FDB2Q',
	authDomain: 'sveltetaxi.firebaseapp.com',
	databaseURL: 'https://sveltetaxi-default-rtdb.firebaseio.com',
	projectId: 'sveltetaxi',
	storageBucket: 'sveltetaxi.appspot.com',
	messagingSenderId: '824838237845',
	appId: '1:824838237845:web:3571ca0de5114b0e34f59c',
	measurementId: 'G-38BQCT4E4Q',
};

const app = initializeApp(firebaseConfig);
export let db = getDatabase(app);
export let auth = getAuth(app);
auth.languageCode = 'ru';
/**
 * @type {import("@firebase/messaging").Messaging}
 */
export let messaging;
isSupported().then(r => {
	if (r) messaging = getMessaging(app);
});
