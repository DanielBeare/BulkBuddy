<template>
  <div>
    <header style="text-align: center; margin-bottom: 20px; color: #000000; font-family: 'Arial', sans-serif;">
      <h1 style="font-size: 48px;">BulkBuddy</h1>
      <div style="display: flex; justify-content: flex-end;">
        <span v-if="isLoggedIn" style="margin-right: 10px; font-size: 24px;">{{ username }}</span>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </header>
    <div> 
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterView
  },
  mounted() {
    // Check if user is logged in
    this.isLoggedIn = localStorage.getItem('username') !== null;
    if (this.isLoggedIn) {
      this.username = localStorage.getItem('username');
    } else {
      // Redirect the user to /loginregister if not logged in and accessing other routes
      if (this.$route.path !== '/loginregister') {
        this.$router.push('/loginregister');
      }
    }
  },
  methods: {
    logout() {
      // Clear the username from local storage and log out the user
      localStorage.removeItem('username');
      this.isLoggedIn = false;
      this.username = '';

      // Redirect the user to /loginregister
      this.$router.push('/loginregister');
    }
  },
  data() {
    return {
      isLoggedIn: false,
      username: ''
    };
  },
  watch: {
    $route(to) {
      // Check if user is logged in
      this.isLoggedIn = localStorage.getItem('username') !== null;
      if (this.isLoggedIn) {
        this.username = localStorage.getItem('username');
      } else {
        // Redirect the user to /loginregister if not logged in and accessing other routes
        if (to.path !== '/loginregister') {
          this.$router.push('/loginregister');
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
  font-family: 'Arial', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #000000;
  background-color: #ffffff;
}

button {
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
