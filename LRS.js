// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/Users', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((error) => console.error('Error connecting to MongoDB:', error));

// const User = mongoose.model('User', new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// }, { collection: 'UserData',
//     versionKey: false},
// ));


// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = new User({ name, email, password });
//         await user.save();
//         console.log('User saved successfully:', user);
//         res.status(201).send();
//     } catch (error) {
//         console.error('Error saving user:', error.message);
//         res.status(500).send('Error saving user');
//     }
// });
// app.post('/login', async (req, res) => {
//     try {
//         console.log("logging in")
//         const { name, password } = req.body;
//         console.log('Request Body:', req.body);
//         const user = await User.findOne({ name }); 
//         console.log('User:', user);
//         if (user && user.password === password) {
//             res.status(200).send('Login successful');
//         } else {
//             res.status(404).send('User not found or incorrect email/password');
//         }
//     } catch (error) {
//         console.error('Error searching for user:', error.message);
//         res.status(500).send('Error searching for user');
//     }
// });
// app.listen(3000, () => console.log('Server started on port 3000'));