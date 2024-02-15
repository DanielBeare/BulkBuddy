<template>
    <div style="padding: 10px;"></div>
    <div class="login-register">
        <transition name="slide">
            <div class="loginregister-container">
                <div class="login" :style="{ height: loginHeight }">
                    <button class="add-food-button" @click="toggleInputFields">
                        {{ showInputFields ? 'Cancel' : 'Add Food' }}
                    </button>
                    <div class="input-fields-container">
                        <div v-if="showInputFields" class="input-fields" ref="inputFields">
                            <label class="input-label" for="protein">Protein:</label>
                            <input class="input-field" type="text" id="protein" v-model="protein">

                            <label class="input-label" for="carbs">Carbs:</label>
                            <input class="input-field" type="text" id="carbs" v-model="carbs">

                            <label class="input-label" for="fats">Fats:</label>
                            <input class="input-field" type="text" id="fats" v-model="fats">

                            <label class="input-label" for="calories">Calories:</label>
                            <input class="input-field" type="text" id="calories" v-model="calories">

                            <label class="input-label" for="meaml">Meal description:</label>
                            <input class="input-field" type="text" id="mealdisc" v-model="mealdisc">

                            <button class="add-meal-button" @click="addMeal">Add Meal</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <div class="meal-list" ref="mealList" style="padding: 10px; height: 100%;">
            <ul>
                <li v-for="meal in meals" :key="meal.id" class="meal-item">{{ meal.mealno }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomeComponent',
    data() {
        return {
            mealdisc: '',
            protein: '',
            carbs: '',
            fats: '',
            calories: '',
            currentDate: new Date().toISOString().split('T')[0],
            currentUser: localStorage.getItem("username"),
            showInputFields: false,
            meals: [],
        };
    },
    mounted() {
        this.readTodaysMeals();
    },
    methods: {
        async addMeal() {
            try {
                const response = await axios.post('http://172.21.252.217:3000/add', {
                    protein: this.protein,
                    carbs: this.carbs,
                    fats: this.fats,
                    calories: this.calories,
                    date: this.currentDate,
                    user: this.currentUser
                });
                console.log(response);
                this.readTodaysMeals();
            } catch (error) {
                console.log('An error occurred during registration:', error);
            }
        },
        async readTodaysMeals(){
            try{
                const response = await axios.post('http://172.21.252.217:3000/readmeals',{
                    user: this.currentUser,
                    date: this.currentDate
                });
                this.meals = response.data;
                this.updateMealListHeight();
            }
            catch (error) {
                console.log('An error occurred during reading:', error);
            }
        },
        toggleInputFields() {
            this.showInputFields = !this.showInputFields;
            if (this.showInputFields) {
                this.$nextTick(() => {
                    this.$refs.inputFields.style.height = `${this.$refs.inputFields.scrollHeight}px`;
                    this.loginHeight = `${this.$refs.inputFields.scrollHeight + 100}px`; // adjust the login div height
                });
            } else {
                this.$refs.inputFields.style.height = '0';
                this.loginHeight = '300px'; // reset the login div height
            }
        },
        updateMealListHeight() {
            this.$nextTick(() => {
                this.$refs.mealList.style.height = `${this.$refs.mealList.scrollHeight}px`;
            });
        }
    },
};
</script>

<style scoped>
.login-register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: #f2f2f2;
    overflow: hidden;
}

.loginregister-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 7.5%;
}

.login {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    width: 50%;
    opacity: 0.8;
}

.add-food-button {
    padding: 10px;
    background-color: #000000;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.input-fields-container {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.input-fields {
    display: flex;
    flex-direction: column;
    transition: height 0.3s ease;
    height: 0;
    overflow: hidden;
}

.input-label {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
}

.input-field {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
}

.add-meal-button {
    padding: 10px;
    background-color: #000000;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
}

.meal-list {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    height: auto;
    width: 50%;
    opacity: 0.8;
    overflow-y: auto;
}

.meal-item {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
