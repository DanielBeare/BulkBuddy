<template>
  <div class="login-register">
    <div class="background-image"></div>
    <div class="loginregister-container">
      <div class="login">
        <h2 class="white-text">Login</h2>
        <form>
          <input v-model="loginUsername" type="text" placeholder="Username" class="black-textbox" />
          <input v-model="loginPassword" type="password" placeholder="Password" class="black-textbox" />
          <button class="black-button" @click.prevent="login">Login</button>
        </form>
      </div>
    </div>
    <div class="loginregister-container">
      <div class="register">
        <h2 class="white-text">Register</h2>
        <form>
          <input v-model="username" type="text" placeholder="Username" class="black-textbox" />
          <input v-model="email" type="email" placeholder="Email" class="black-textbox" />
          <input v-model="password" type="password" placeholder="Password" class="black-textbox" />
          <button class="black-button" @click.prevent="register">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2; /* Updated background color to light gray */
  overflow: hidden;
}

.background-image {
  background-image: url('../assets/jim.png');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.loginregister-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 7.5%;
}

.login,
.register {
  background-color: #ffffff; /* Updated background color to white */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  height: 300px;
  width: 50%;
  opacity: 0.8;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #000000; /* Updated color to black */
  font-family: 'Arial', sans-serif; /* Added font family */
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
  color: #000000; /* Updated color to black */
  background-color: #ffffff; /* Updated background color to white */
}

button {
  padding: 10px;
  background-color: #000000; /* Updated background color to black */
  color: #ffffff; /* Updated color to white */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Arial', sans-serif; /* Added font family */
  font-weight: bold; /* Added font weight */
  text-transform: uppercase; /* Added text transform */
}

</style>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loginUsername: '',
      loginPassword: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://172.21.252.217:3000/register', {
          name: this.username,
          email: this.email,
          password: this.password
        });
        console.log(response.data)
      } catch (error) {
        console.log('An error occurred during registration:', error);
      }
    },
    async login() {
      try {
        const response = await axios.post('http://172.21.252.217:3000/login', {
          name: this.loginUsername,
          password: this.loginPassword
        });
        console.log(response.data)
      } catch (error) {
        console.log('An error occurred during login:', error);
      }
    }
  }
}
</script>
