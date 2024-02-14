<template>
  <div>
    <header style="background-color: black; color: white; padding: 20px;">
      <h1>BulkBuddy</h1>
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
</style>
