import { db } from "../bulkbuddy/src/fireBase/FB.mjs";
import { collection, addDoc, getDocs , query, where, doc, getDoc,setDoc, serverTimestamp } from "@firebase/firestore";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { triggerRef } from "vue";
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


    app.post('/readmeals', async (req, res) => {
        console.log('attempting to read meals');
        try {
            const { user, date } = req.body;
            console.log('User:', user);
            console.log('Date:', date);
            const querySnapshot = await getDocs(query(collection(db, "Users", user, "LoggedDays", date, "meals")));
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                res.status(401).send('No meals found');
            } else {
                let carbsTotal = 0;
                let fatsTotal = 0;
                let caloriesTotal = 0;
                let proteinTotal = 0;
                const mealsData = [];
                querySnapshot.forEach((doc) => {
                    const meal = doc.data();
                    console.log('Meal found:', meal);
                    mealsData.push(meal);
                    carbsTotal += meal.carbs;
                    fatsTotal += meal.fats;
                    caloriesTotal += meal.calories;
                    proteinTotal += meal.protein;
                });
                const totals = {
                    carbsTotal,
                    fatsTotal,
                    caloriesTotal,
                    proteinTotal
                };
                console.log('Totals:', totals);
                res.status(200).send({ mealsData ,totals});
            }
        } catch (error) {
            console.error('Error reading meals:', error.message);
            res.status(500).send('Error reading meals');
        }
    });
    app.post('/readloggedtotals', async (req, res) => {
        console.log('attempting to read logged totals');
        try {
            const { user, date } = req.body;
            console.log('User:', user);
            console.log('Date:', date);
            const querySnapshot = await getDocs(query(collection(db, "Users", user, "LoggedDays", date, "meals")));
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                res.status(401).send('No meals found');
            } else {
                let carbsTotal = 0;
                let fatsTotal = 0;
                let caloriesTotal = 0;
                let proteinTotal = 0;
                querySnapshot.forEach((doc) => {
                    const meal = doc.data();
                    console.log('Meal found:', meal);
                    carbsTotal += meal.carbs;
                    fatsTotal += meal.fats;
                    caloriesTotal += meal.calories;
                    proteinTotal += meal.protein;
                });
                const totals = {
                    carbsTotal,
                    fatsTotal,
                    caloriesTotal,
                    proteinTotal
                };
                console.log('Totals:', totals);
                res.status(200).send(totals);
            }
        } catch (error) {
            console.error('Error reading meals:', error.message);
            res.status(500).send('Error reading meals');
        }
    });
    app.post('/readLoggedDays', async (req, res) => {
        console.log('attempting to read logged days');
        try {
            const { user } = req.body;
            console.log('User:', user);
            const querySnapshot = await getDocs(query(collection(db, "Users", user, "LoggedDays")));
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                res.status(401).send('No logged days found');
            } else {
                const loggedDays = [];
                querySnapshot.forEach((doc) => {
                    const loggedDay = doc.id;
                    console.log('Logged day found:', loggedDay);
                    loggedDays.push(loggedDay);
                });
                console.log('Sending loggedDays:', loggedDays);
                res.status(200).send(loggedDays);
            }
        } catch (error) {
            console.error('Error reading logged days:', error.message);
            res.status(500).send('Error reading logged days');
        }
    });
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
    console.log('attempting to register')
    try {
        const { name, email, password } = req.body;
        const userQuerySnapshot = await getDocs(query(collection(db, "Users"), where("name", "==", name)));
        
        if (!userQuerySnapshot.empty) {
            console.log('User already exists');
            res.status(409).send('User already exists');
            return;
        }
        
        await setDoc(doc(collection(db, "Users"), `${name}`), { name, email, password });
        console.log('User saved successfully:', { name, email, password });
        res.status(201).send();
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).send('Error saving user');
    }
});


app.post('/add', async (req, res) => {
    console.log('attempting to add food');
    try {
        const { protein, carbs, fats, calories, user, mealdisc } = req.body;
        console.log('Received request with user ID:', user);

        const currentDate = new Date();
        const currentDay = currentDate.toISOString().split('T')[0];

        const loggedDaysCollectionRef = collection(db, `Users/${user}/LoggedDays`);
        const loggedDayDocRef = doc(loggedDaysCollectionRef, currentDay);
        const loggedDayDocSnapshot = await getDoc(loggedDayDocRef);

        if (!loggedDayDocSnapshot.exists()) {
            await setDoc(loggedDayDocRef, { meals: {} }, { merge: true });
        }

        const mealsCollectionRef = collection(loggedDayDocRef, 'meals');
        const mealsSnapshot = await getDocs(mealsCollectionRef);

        const mealName = `meal${mealsSnapshot.size + 1}`;

        await setDoc(doc(mealsCollectionRef, mealName), {
            protein: parseInt(protein),
            carbs: parseInt(carbs),
            fats: parseInt(fats),
            calories: parseInt(calories),
            mealno: mealName,
            mealdisc : mealdisc
        });

        console.log('Food saved successfully for the meal:', mealName);
        res.status(201).send();
    } catch (error) {
        console.error('Error saving food:', error.message);
        res.status(500).send('Error saving food');
    }
});





app.listen(3000, () => console.log('Server started on port 3000'));