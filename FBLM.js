import { db } from "@/fireBase/FB";
import { collection, addDoc } from "firebase/firestore";

async function addDocument() {
    try {
        const docRef = await addDoc(collection(db, "Users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);    }

}

addDocument();
