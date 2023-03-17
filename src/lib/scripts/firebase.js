import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
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
export let messaging = isSupported().then(r => getMessaging(app));
//export let messaging = (await isSupported()) ? getMessaging(app) : null;
