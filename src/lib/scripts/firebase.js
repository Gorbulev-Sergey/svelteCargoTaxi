import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
//import admin from 'firebase-admin';

// @ts-ignore
//let serviceAccount = require('firebase-adminsdk-4vovk@sveltetaxi.iam.gserviceaccount.com');

const firebaseConfig = {
	apiKey: "AIzaSyD-wJSPHNYP-2673ZjTR_RkdZTT3r0gUus",
	authDomain: "cargotaxi-b713f.firebaseapp.com",
	databaseURL: "https://cargotaxi-b713f-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "cargotaxi-b713f",
	storageBucket: "cargotaxi-b713f.appspot.com",
	messagingSenderId: "257543309523",
	appId: "1:257543309523:web:ca2dc3d2694c5148b6ec26"
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
