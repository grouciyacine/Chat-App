import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}from 'firebase/firestore'
import {getAuth, initializeAuth,getReactNativePersistence}from 'firebase/auth'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
apiKey: "AIzaSyCA-mRTVZU9Rp7jbjeiGyijPtvglrjdqSU",
authDomain: "wp-clone-d202d.firebaseapp.com",
projectId: "wp-clone-d202d",
storageBucket: "wp-clone-d202d.appspot.com",
messagingSenderId: "144502338824",
appId: "1:144502338824:web:4210a310714a9b71e4a8bd",
measurementId: "G-ZY8898Y4FQ"
};

export const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
const auth = initializeAuth(app
    /*, {
    persistence: getReactNativePersistence(AsyncStorage)
}*/);
const db=getFirestore()
const storage2=getStorage(app)
export { auth,storage2 };
export default {db}
/*const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=initializeFirestore(app,{experimentalForceLongPolling:true})
export function signIn(email,password){
return signInWithEmailAndPassword(auth,email,password)
}
export const signUp=(email,password)=>{
return createUserWithEmailAndPassword(auth,password,email)
}*/
