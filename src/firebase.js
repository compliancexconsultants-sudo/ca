import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your existing firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtjta9Q4RYxhNybUxTgyOsvlGgUUoPHzA",
  authDomain: "compliancexconsultants-adedc.firebaseapp.com",
  projectId: "compliancexconsultants-adedc",
  storageBucket: "compliancexconsultants-adedc.firebasestorage.app",
  messagingSenderId: "898997600044",
  appId: "1:898997600044:web:7925851e58a07551d73689",
  measurementId: "G-KLVJ4F3GC3"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
