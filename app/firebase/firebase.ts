// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWEt4Rh6_6daKaCyS1Ad5e_dyFOWmG090",
  authDomain: "nailo-mobile2.firebaseapp.com",
  projectId: "nailo-mobile2",
  storageBucket: "nailo-mobile2.firebasestorage.app",
  messagingSenderId: "769887719301",
  appId: "1:769887719301:web:13df8194c0193c28ad7eec"
};

// Evita múltiplas inicializações no Next
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
