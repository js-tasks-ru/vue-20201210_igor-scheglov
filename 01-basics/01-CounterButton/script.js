import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события
const app = new Vue({
  el: '#app',
  data(){
    return {
      buttonValue: 0,
    };
  },
  methods: {
    buttonClickHandler() {
      this.buttonValue += 1;
    }
  },
})
