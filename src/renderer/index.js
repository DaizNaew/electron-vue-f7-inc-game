// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from '../css/icons.scss';
import AppStyles from '../css/app.scss';

// Import App Component
import App from '../app.vue';

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',

  // Register App Component
  components: {
    app: App
  },
  beforeCreate: function () {
    var storage;
    storage = window['localStorage'];

    var SAVE_KEY = 'gameData';
    if (!JSON.parse(storage.getItem(SAVE_KEY)) || storage.getItem(SAVE_KEY) == "undefined") {
      console.log('INIT SAVE DATA')
      storage.setItem(SAVE_KEY, JSON.stringify({
        Clicks: 0,
        TotalClicks: 0,
        clicksPerClicks: 1,
        ClicksPerSecond: 0,
        CostOfNextClickUpgrade: 10,
        ClicksUpgraded: 0,
        Tickrate: 10,
        BuyAmount: 1,
        Buildings: [],
      }));
    }
    console.dir(storage)
  }

});
