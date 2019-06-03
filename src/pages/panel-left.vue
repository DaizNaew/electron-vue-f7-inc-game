<template>
  <f7-page>
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
        <f7-toggle id="darkMode" @toggle:change="init()"></f7-toggle>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {

  data() {
    return{
      darkMode: false,
    }
  },
  
  methods: {
    init() {
      const self = this;
      const app = self.$f7;
      var toggle = app.toggle.get('#darkMode');
      if(toggle.checked) {
        this.darkMode = true;
        self.$$('body').toggleClass('theme-dark');
      } else {
        this.darkMode = false;
        self.$$('body').toggleClass('theme-dark');
      }
    }
  }
}
</script>