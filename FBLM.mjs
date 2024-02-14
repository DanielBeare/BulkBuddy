import { db } from "./src/fireBase/FB.mjs";
import { collection, addDoc, getDocs , query, where, doc,getDoc,setDoc} from "@firebase/firestore";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(bodyParser.json());


async function addDocument() {
    try {
        const docRef = await addDoc(collection(db, "Users"), {
            first: "Daniel",
            last: "Beare",
            born: 2006
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);    }

}


async function findDocument() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "Users"), where("first", "==", "Daniel")));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    } catch (e) {
        console.error("Error finding document: ", e);
    }}

app.post('/login', async (req, res) => {
    try {
        console.log('attempting login')
        const { name, password } = req.body;
        const querySnapshot = await getDocs(query(collection(db, "Users"), where("name", "==", name), where("password", "==", password)));
        if (querySnapshot.empty) {
            console.log('No matching documents.');
            res.status(401).send('Invalid username or password');
        } else {
            querySnapshot.forEach((doc) => {
                console.log('User found:', doc.data());
                
                res.status(200).send();
            });
        }
    } catch (error) {
        console.error('Error finding user:', error.message);
        res.status(500).send('Error finding user');
    }
});


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const querySnapshot = await getDoc(query(collection(db, "Users"), where("name", "==", name)));
        if (!querySnapshot.empty) {
            console.log('User already exists');
            res.status(409).send('User already exists');
            return;
        }
        else{
            console.log('User does not exist');
        }
        await addDoc(collection(db, "Users"), { name, email, password });
        console.log('User saved successfully:', { name, email, password });
        res.status(201).send();
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).send('Error saving user');
    }
});

app.post('/add', async (req, res) => {
    try {
        const { protein, carbs, fats, calories, date, user } = req.body;
        const docRef = doc(collection(db, "nutriTracker"), `${user}_${date}`);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const existingData = docSnapshot.data();
            const updatedData = {
                protein: parseInt(existingData.protein) + parseInt(protein),
                carbs: parseInt(existingData.carbs) + parseInt(carbs),
                fats: parseInt(existingData.fats) + parseInt(fats),
                calories: parseInt(existingData.calories) + parseInt(calories),
                date: existingData.date,
                user: existingData.user
            };
            await setDoc(docRef, updatedData);
            console.log('Food updated successfully:', updatedData);
        }
         else {
            await setDoc(docRef, { protein, carbs, fats, calories, date, user });
            console.log('Food saved successfully:', { protein, carbs, fats, calories, date, user });
        }

        res.status(201).send();
    } catch (error) {
        console.error('Error saving food:', error.message);
        res.status(500).send('Error saving food');
    }
});


app.listen(3000, () => console.log('Server started on port 3000'));