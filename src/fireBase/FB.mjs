
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpCWy3KyjxZdeJC0c9bb_9UBYMB-NqBh0",
  authDomain: "bulkbuddy-689a7.firebaseapp.com",
  projectId: "bulkbuddy-689a7",
  storageBucket: "bulkbuddy-689a7.appspot.com",
  messagingSenderId: "262675147914",
  appId: "1:262675147914:web:90548d5900061048139173",
  measurementId: "G-W3ZD14ZB2D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}