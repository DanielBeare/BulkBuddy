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

                            <label class="input-label" for="mealdisc">Meal description:</label>
                            <input class="input-field" type="text" id="mealdisc" v-model="mealdisc">

                            <button class="add-meal-button" @click="addMeal">Add Meal</button>
                        </div>
                    </div>
                </div>
                <div class="meal-list" ref="mealList">
            <ul>
                <li v-for="meal in meals" :key="meal.id + meal.mealdisc" class="meal-item" @click="scrollToMeal(meal)">
                    {{ meal.mealno }}
                </li>
            </ul>
        </div>
            </div>
        </transition>
    </div>
    <div class="meal-container">
        
        <div class="meal-details" v-if="selectedMeal">
            <h3>{{ selectedMeal.mealno }}</h3>
            <p>Meal Description: {{ selectedMeal.mealdisc }}</p>
            <p>Calories: {{ selectedMeal.calories }}</p>
            <p>Fats: {{ selectedMeal.fats }}</p>
            <p>Carbs: {{ selectedMeal.carbs }}</p>
            <p>Protein: {{ selectedMeal.protein }}</p>
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
            selectedMeal: null,
            mealListHeight: 'auto',
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
                    user: this.currentUser,
                    mealdisc: this.mealdisc
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
        console.log("attempting to read meals"+this.meals);
        this.updateMealListHeight();
    }
    catch (error) {
        console.log('An error occurred during reading:', error);
    }
},
        toggleInputFields() {
            if (!this.showInputFields) {
                // Show input fields
                this.showInputFields = true;
                this.$nextTick(() => {
                    const inputFields = document.querySelector('.input-fields');
                    const loginContainer = document.querySelector('.login');
                    if (inputFields && loginContainer) {
                        const inputHeight = inputFields.scrollHeight;
                        inputFields.style.transition = 'height 0.3s ease';
                        inputFields.style.height = `${inputHeight}px`;
                        loginContainer.style.height = `${inputHeight + 100}px`;
                    }
                });
            } else {
                // Hide input fields
                const originalLoginHeight = parseInt(this.loginHeight);
                if (originalLoginHeight === 300) {
                    // No need to retract if input fields are already hidden
                    return;
                }
                const inputFields = document.querySelector('.input-fields');
                const loginContainer = document.querySelector('.login');
                if (inputFields && loginContainer) {
                    inputFields.style.transition = 'height 0.3s ease';
                    inputFields.style.height = '0';
                    setTimeout(() => {
                        this.showInputFields = false;
                        loginContainer.style.height = '300px'; // reset the login div height
                    }, 300);
                }
            }
        },
        updateMealListHeight() {
            this.$nextTick(() => {
                const mealList = this.$refs.mealList;
                const mealItems = mealList.querySelectorAll('.meal-item');
                const totalHeight = Array.from(mealItems).reduce((acc, item) => acc + item.offsetHeight, 0);
                mealList.style.transition = 'height 0.3s ease';
                mealList.style.height = `${totalHeight}px`;
                this.mealListHeight = `${totalHeight}px`;
            });
        },
        scrollToMeal(meal) {
            this.selectedMeal = meal;
            const mealDetails = document.querySelector('.meal-details');
            if (mealDetails) {
                mealDetails.scrollIntoView({ behavior: 'smooth' });
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
    width: 50%;
    opacity: 0.8;
    margin-bottom: 20px; /* Added margin to prevent touching */
    margin: 10px;
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

.meal-container {
    display: flex;
}

.meal-list {
    background-color: #ffffff;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    height: 0;
    width: 50%;
    opacity: 0.8;
    margin-bottom: 20px; /* Added margin to prevent touching */
    margin:5px;
}

.meal-item {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin: 5px;
    cursor: pointer;
}

.meal-details {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    width: 50%;
    opacity: 0.8;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}

.meal-details h3 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin-bottom: 10px;
}

.meal-details p {
    font-family: 'Arial', sans-serif;
    margin-bottom: 5px;
}

</style>
