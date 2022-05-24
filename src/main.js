import { createApp } from 'vue'
import App from './App.vue'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// Подключение иконок
UIkit.use(Icons);

// компоненты могут быть вызваны из импортированной ссылки UIkit


createApp(App).mount('#app')
