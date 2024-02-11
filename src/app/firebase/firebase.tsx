import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAT61rURxuz635pqSEm6RRoOpiD3XYrePI",
  authDomain: "rummy-app-dashboard.firebaseapp.com",
  projectId: "rummy-app-dashboard",
  storageBucket: "rummy-app-dashboard.appspot.com",
  messagingSenderId: "1013127666231",
  appId: "1:1013127666231:web:c7eb46ae33124c7e59bdb2"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };