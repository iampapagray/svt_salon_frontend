import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from '@/router';
import VCalendar from 'v-calendar';
import store from './store';

import 'v-calendar/style.css';

const app = createApp(App);
app.use(VCalendar, {});
app.use(router);
app.use(store)
app.mount('#app')
