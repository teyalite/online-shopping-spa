// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5ZbXupj3xK-b23frpiNpsf5gAdq4d2cU",
    authDomain: "software-dev-mipt.firebaseapp.com",
    projectId: "software-dev-mipt",
    storageBucket: "software-dev-mipt.appspot.com",
    messagingSenderId: "852641093509",
    appId: "1:852641093509:web:3c3401de720487174116ec",
    measurementId: "G-M96N1XSEF3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// connectAuthEmulator(auth, "http://localhost:9099");
