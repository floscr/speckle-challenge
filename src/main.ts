import { createApp } from 'vue';
import App from '@/App.vue';

import router from '@/router';
import { createPinia } from 'pinia';
import '@/assets/main.css';
const pinia = createPinia();

const app = createApp(App);

// vue router
app.use(router);

// directives
app.directive('lazyLoad', (el, binding) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = new Image();
                img.src = binding.value;

                img.addEventListener('load', () => {
                    el.setAttribute('src', img.src);
                    observer.unobserve(el);
                });
            }
        });
    });

    observer.observe(el);
});

// pinia
app.use(pinia);

// mount vue on div#app
app.mount('#app');
