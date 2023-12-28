import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAlyQqV2k7tSojJxxNZJowmJ4BpQJ-_PvY",
    authDomain: "dropbox-c-38d54.firebaseapp.com",
    projectId: "dropbox-c-38d54",
    storageBucket: "dropbox-c-38d54.appspot.com",
    messagingSenderId: "797532661294",
    appId: "1:797532661294:web:2728d055eabc7cc8a6e1bf",
  };
  

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app) ;
export { db, storage };
