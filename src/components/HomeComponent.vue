<template>
    <div class="login-register">
        <transition name="slide">
            <div class="loginregister-container">
                <div class="login">
                    <button class="add-food-button" @click="toggleInputFields">
                        {{ showInputFields ? 'Cancel' : 'Add Food' }}
                    </button>
                    <div v-if="showInputFields" class="input-fields" ref="inputFields">
                        <label class="input-label" for="protein">Protein:</label>
                        <input class="input-field" type="text" id="protein" v-model="protein">

                        <label class="input-label" for="carbs">Carbs:</label>
                        <input class="input-field" type="text" id="carbs" v-model="carbs">

                        <label class="input-label" for="fats">Fats:</label>
                        <input class="input-field" type="text" id="fats" v-model="fats">

                        <label class="input-label" for="calories">Calories:</label>
                        <input class="input-field" type="text" id="calories" v-model="calories">

                        <button class="add-meal-button" @click="addMeal">Add Meal</button>
                    </div>
                </div>
            </div>
        </transition>
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
            currentUser: localStorage.getItem("username"),
            showInputFields: false
        };
    },
    methods: {
        async addMeal() {
            try {
                const response = await axios.post('http://192.168.0.146:3000/add', {
                    protein: this.protein,
                    carbs: this.carbs,
                    fats: this.fats,
                    calories: this.calories,
                    date: this.currentDate,
                    user: this.currentUser
                });
                console.log(response);
            } catch (error) {
                console.log('An error occurred during registration:', error);
            }
        },
        toggleInputFields() {
            this.showInputFields = !this.showInputFields;
            if (this.showInputFields) {
                this.$nextTick(() => {
                    this.$refs.inputFields.style.height = `${this.$refs.inputFields.scrollHeight}px`;
                });
            } else {
                this.$refs.inputFields.style.height = '0';
            }
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
    height: 300px;
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
</style>
