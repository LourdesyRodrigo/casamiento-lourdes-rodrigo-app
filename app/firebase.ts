import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrl0Cyq-fgDsoAYiC1hkdGSlRktP-Kb5o",
  authDomain: "casamiento-lourdes-y-rodrigo.firebaseapp.com",
  projectId: "casamiento-lourdes-y-rodrigo",
  storageBucket: "casamiento-lourdes-y-rodrigo.firebasestorage.app",
  messagingSenderId: "691943855410",
  appId: "1:691943855410:web:a4db549cffed909202f32b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);