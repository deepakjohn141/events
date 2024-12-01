import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_SGrInjAwZ_b1IdRaX4TklOBhTlA8PXg",
    authDomain: "events-d70d7.firebaseapp.com",
    projectId: "events-d70d7",
    storageBucket: "events-d70d7.firebasestorage.app",
    messagingSenderId: "737357222958",
    appId: "1:737357222958:web:2a4f32b7870b559a4c3bbf"
  };
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

