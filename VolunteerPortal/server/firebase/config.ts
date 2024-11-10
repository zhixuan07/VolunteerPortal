import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAM6iDbWpqKhVsRKkqzL-JD5PteIf4IfyA",
    authDomain: "vconnect-39a24.firebaseapp.com",
    databaseURL: "https://vconnect-39a24-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vconnect-39a24",
    storageBucket: "vconnect-39a24.appspot.com",
    messagingSenderId: "18530802096",
    appId: "1:18530802096:web:2b4b4a0809f5ba85bc5e75"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)