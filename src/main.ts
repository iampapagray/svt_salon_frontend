import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from '@/router';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';

import store from './store';

import 'v-calendar/style.css';

const app = createApp(App);
app.use(router);
app.use(store)
app.use(setupCalendar, {})

app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)


app.mount('#app')
