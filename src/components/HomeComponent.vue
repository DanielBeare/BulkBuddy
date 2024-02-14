<template>
    <div>
        <nav>
            <ul class="nav-menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>

        <div class="input-fields">
            <label for="protein">Protein:</label>
            <input type="text" id="protein" v-model="protein">

            <label for="carbs">Carbs:</label>
            <input type="text" id="carbs" v-model="carbs">

            <label for="fats">Fats:</label>
            <input type="text" id="fats" v-model="fats">

            <label for="calories">Calories:</label>
            <input type="text" id="calories" v-model="calories">

            <button @click="addMeal">Add Meal</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HomeComponent',
    data() {
        return {
            protein: '',
            carbs: '',
            fats: '',
            calories: '',
            currentDate: new Date().toISOString().split('T')[0],
            currentUser : localStorage.getItem("username")

        };
    },
    methods: {
        async addMeal() {
            try {
                const response = await axios.post('http://172.21.252.217:3000/add',{
                    protein: this.protein,
                    carbs: this.carbs,
                    fats: this.fats,
                    calories: this.calories,
                    date: this.currentDate,
                    user: this.currentUser
                });
                console.log(response)
            }    catch (error) {   
            console.log('An error occurred during registration:', error);
        }},
    }};

</script>

<style scoped>
.nav-menu {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
}

.nav-menu li {
    margin: 0 10px;
}

.nav-menu li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

.nav-menu li a:hover {
    color: #555;
}
</style>
