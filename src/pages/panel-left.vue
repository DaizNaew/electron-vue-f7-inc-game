<template>
  <f7-page @page:afterin="init()">
    <f7-navbar title="Left Panel"></f7-navbar>
    <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block>
    <f7-block-title>Load page in panel</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Load page in main view</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
    </f7-list>
    
    <f7-list>
      <f7-list-item>
        <span>Dark Mode Toggle</span>
        <f7-toggle id="darkMode" @toggle:change="toggleMode()"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Delete saved data</span>
        <f7-button raised fill color=red @click="deleteData()" text=Delete></f7-button>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  const {
    remote
  } = require('electron');
  var CurrWin = remote.getCurrentWindow();

var storage;
storage = window['localStorage'];

var SAVE_KEY = 'darkMode';

export default {

  data() {
    return{
      darkMode: this.load(),
    }
  },
  
  methods: {
    toggleMode() {
      const that = this;
      const app = that.$f7;
      var toggle = app.toggle.get('#darkMode');
      if(toggle.checked) {
        this.darkMode = true;
        that.$$('body').toggleClass('theme-dark');
        this.save(this.darkMode);
      } else {
        this.darkMode = false;
        that.$$('body').toggleClass('theme-dark');
        this.save(this.darkMode);
      }
    },
    init() {
    },
    getSavedDate() {
      const that = this;
      const app = that.$f7;
    },
    //To get implemented in the future
    deleteData() {
      const that = this;
      const app = that.$f7;
      app.dialog.confirm('You sure you want to delete all your saved data?','Confirm deletion', () => {this.delete()}, () => {});
      console.dir('get Deleted')
    },
    save(state) {
      storage.setItem(SAVE_KEY, JSON.stringify(state));
    },
    load() {
      return JSON.parse(storage.getItem(SAVE_KEY));
    },
    delete() {
      storage.clear();
      CurrWin.reload();
    }
  },
  mounted: function() {
    const that = this;
    const app = that.$f7;
    var toggle = app.toggle.get('#darkMode');
    toggle.checked = this.darkMode;
    toggle.checked ? that.$$('body').addClass('theme-dark') : that.$$('body').removeClass('theme-dark');
  }
}
</script>