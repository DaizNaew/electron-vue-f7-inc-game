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
const Store = require('../scripts/store')

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        theme: {
            darkMode: false
        }
    }
})
let {darkMode} = store.get('theme');

export default {

  data() {
    return{
      darkMode,
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
      } else {
        this.darkMode = false;
        that.$$('body').toggleClass('theme-dark');
      }
      this.saveData();
    },
    init() {
      const that = this;
      const app = that.$f7;
      var toggle = app.toggle.get('#darkMode');
      toggle.checked = this.darkMode;
      if(toggle.checked) that.$$('body').addClass('theme-dark');
    },
    getSavedDate() {
      const that = this;
      const app = that.$f7;
    },
    saveData() {
      let {darkMode} = this.returnSaveData();
      store.set('theme', {darkMode});
    },
    returnSaveData() {
      let data = {
        darkMode: this.darkMode
      }
      return data;
    },
    //To get implemented in the future
    deleteData() {
      const that = this;
      const app = that.$f7;
      alert("No you don't")
      //store.del()
      console.dir('get Deleted')
    }
  }
}
</script>