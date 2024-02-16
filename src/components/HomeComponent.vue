<template>
    <div class="grid-container">
      <div class="grid-item top-left">
        <div class="login" :style="{ height: loginHeight }">
          <button class="add-food-button" @click="toggleInputFields">
            {{ showInputFields ? 'Cancel' : `Add Meal ${meals.length + 1}` }}
          </button>
          <div class="input-fields-container">
            <div v-if="showInputFields" class="input-fields" ref="inputFields">
              <label class="input-label" for="protein">Protein:</label>
              <input class="input-field" type="number" id="protein" v-model.number="protein" required>

              <label class="input-label" for="carbs">Carbs:</label>
              <input class="input-field" type="number" id="carbs" v-model.number="carbs" required>

              <label class="input-label" for="fats">Fats:</label>
              <input class="input-field" type="number" id="fats" v-model.number="fats" required>

              <label class="input-label" for="calories">Calories:</label>
              <input class="input-field" type="number" id="calories" v-model.number="calories" required>

              <label class="input-label" for="mealdisc">Meal description:</label>
              <input class="input-field" type="text" id="mealdisc" v-model="mealdisc" required>

              <button class="add-meal-button" @click="checkinputs">Add Meal</button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-item bottom left">
        <div class="meal-list" ref="mealList">
          <ul>
            <li v-for="meal in meals" :key="meal.id + meal.mealdisc" class="meal-item" @click="scrollToMeal(meal)">
              {{ meal.mealno }} - {{ meal.mealdisc }}
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-item top-right">
        <div class="meal-details">
          <h2>Todays total nutrition</h2>
          <p>Calories: {{ this.totcalories }}</p>
          <p>Protein: {{ this.totprotein }}</p>
          <p>Fats: {{ this.totfats }}</p>
          <p>Carbs: {{ this.totcarbs}}</p>
        </div>
      </div>
      <div class="grid-item bottom-right">
        <div class="meal-details" v-if="selectedMeal">
          <h3>{{ selectedMeal.mealno }}</h3>
          <p>Meal Description: {{ selectedMeal.mealdisc }}</p>
          <p>Calories: {{ selectedMeal.calories }}</p>
          <p>Fats: {{ selectedMeal.fats }}</p>
          <p>Carbs: {{ selectedMeal.carbs }}</p>
          <p>Protein: {{ selectedMeal.protein }}</p>
        </div>
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
        loginHeight: undefined,
        totprotein: 0,
        totcarbs: 0,
        totfats: 0,
        totcalories: 0
      };
    },
    mounted() {
      this.readTodaysMeals();
    },
    methods: {
      checkinputs(){
        if(this.mealdisc == '' || this.protein == '' || this.carbs == '' || this.fats == '' || this.calories == ''){
          return;
        }
        this.addMeal();
      },
      cleartb(){
        this.mealdisc = '';
        this.protein = '';
        this.carbs = '';
        this.fats = '';
        this.calories = '';
      },
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
          this.toggleInputFields();
          this.cleartb();
        } catch (error) {
          console.log('An error occurred during registration:', error);
        }
      },
      async readTodaysMeals() {
        try {
          const response = await axios.post('http://172.21.252.217:3000/readmeals', {
            user: this.currentUser,
            date: this.currentDate
          });
          this.meals = response.data.mealsData;
          this.totcalories = response.data.totals.caloriesTotal;
          this.totprotein = response.data.totals.proteinTotal;
          this.totcarbs = response.data.totals.carbsTotal;
          this.totfats = response.data.totals.fatsTotal;
          this.updateMealListHeight();
        } catch (error) {
          console.log('An error occurred during reading:', error);
        }
      },
      toggleInputFields() {
        console.log('toggleInputFields');
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
          const originalLoginHeight = parseInt(this.loginHeight);
          if (originalLoginHeight === 300) {
            return;
          }
          const inputFields = document.querySelector('.input-fields');
          const loginContainer = document.querySelector('.login');
          if (inputFields && loginContainer) {
            inputFields.style.transition = 'height 0.3s ease';
            inputFields.style.height = '0';
            setTimeout(() => {
              this.showInputFields = false;
              loginContainer.style.height = '300px';
            }, 300);
          }
        }
      },
    updateMealListHeight() {
      this.$nextTick(() => {
        const mealList = this.$refs.mealList;
        const mealItems = mealList.querySelectorAll('.meal-item');
        let totalHeight = 0;
        mealItems.forEach((item) => {
          totalHeight += item.offsetHeight;
        });
        const maxHeight = window.innerHeight - mealList.offsetTop + 50;
        const finalHeight = Math.min(totalHeight, maxHeight);
        mealList.style.transition = 'height 0.3s ease';
        mealList.style.height = `${finalHeight}px`;
        this.mealListHeight = `${finalHeight}px`;
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
  .grid-container {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .grid-item {
    background-color: #ffffff;
    border-radius: 5px;
    opacity: 0.8;
  }
  
  .top-left {
    grid-row: 1;
    grid-column: 1;
  }
  
  .top-right {
    grid-row: 1;
    grid-column: 2;
  }
  
  .bottom-left {
    grid-row: 2;
    grid-column: 1;
  }
  
  .bottom-right {
    grid-row: 2;
    grid-column: 2;
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
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    height: 0;
    padding-right: 30px;
    opacity: 0.8;
    text-align: left;
    overflow: hidden;
  }
  
  .meal-item {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin: 5px;
    cursor: pointer;
    padding-bottom: 20px;
  }
  
  .meal-details {
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    opacity: 0.8;
    margin-top: 20px;
    align-items: left;
    justify-content: center;
  }
  
  .meal-details h3 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .meal-details p {
    font-family: 'Arial', sans-serif;
    margin-bottom: 10px;
  }
  </style>
  