import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// Import your components
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import HomeComponent from './components/HomeComponent.vue'


const routes = [
    { 
      name: 'LoginRegister',
      path: '/loginregister',
      component: HelloWorld,
    },
    { 
      name: 'MainMenu',
      path: '/mainmenu', 
      component: HomeComponent,
    },
    
  ]
  
  // Create router instance
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  
  const app = createApp(App)
  
  
  app.use(router)
  app.mount('#app')
