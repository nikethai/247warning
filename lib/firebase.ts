// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH2wRvSXQTcMV4kDEbl6WOU0wuO0hbOZE",
  authDomain: "hwarning-48c7e.firebaseapp.com",
  projectId: "hwarning-48c7e",
  storageBucket: "hwarning-48c7e.appspot.com",
  messagingSenderId: "387300993165",
  appId: "1:387300993165:web:72c74aaa57b8f7a2979ac4",
  measurementId: "G-8QLN7WBLWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: Analytics;
if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
