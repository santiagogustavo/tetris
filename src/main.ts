import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3TouchEvents from 'vue3-touch-events';

import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.use(Vue3TouchEvents);
app.mount('#app');
