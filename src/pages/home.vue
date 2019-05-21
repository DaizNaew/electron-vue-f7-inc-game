<template>
  <f7-page @page:afterin="ticker()">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>{{NameOfObjectToGet}} gatherer</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <!--
    <f7-toolbar bottom>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
    -->
    <f7-block strong>
      <p>Current amount of {{NameOfObjectToGet}} per tick: {{(ClicksPerSecond*Tickrate).toFixed(1)}}; Current tickrate each {{Tickrate}} seconds</p>
      <f7-row>
        <f7-col width=40>
          <label>Amount of {{NameOfObjectToGet}}: {{Clicks.toFixed(1)}}</label>
        </f7-col>
        <f7-col width=40>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col width=35>
          <f7-button color=blue @click="incClick()">Gather {{NameOfObjectToGet}}s</f7-button>
          <f7-button color=red @click="increaseClicksPerClick(1)" v-if="Clicks >= CostOfNextClickUpgrade">Upgrade {{NameOfObjectToGet}} collection</f7-button>
        </f7-col>
        <f7-col width=40>
          <f7-list>
            <f7-list-item>
              <label>Can buy</label>
              <label>Buildings</label>
              <label>Amount owned</label>
            </f7-list-item>
            <f7-list-item  v-for="item in Buildings" :key="item.id" :disabled="Clicks < item.cost">
              <f7-badge color=red v-if="Clicks >= item.cost">!</f7-badge><f7-badge color=white v-else></f7-badge>
              <f7-button @click="buyBuilding(item.id)" tooltip-init>{{item.name}}; Cost: {{item.cost}}; Produces: {{item.total_prod.toFixed(1)}}</f7-button>
              <f7-badge color=blue>{{item.amount_owned}}</f7-badge>
            </f7-list-item>
          </f7-list>
        </f7-col>
      </f7-row>
    </f7-block>

<!--
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    -->
  </f7-page>
</template>
<script>

import data from '../app.vue';

import {gameData} from '../mixins/gameData';
import { setInterval } from 'timers';

export default {

  mixins: [gameData],
  
  data() {
    return {
      name: 'Konrad',
      popupOpened: false
    }
  },
  methods: {
      createPopup() {
        const self = this;
        // Create popup
        if (!self.popup) {
          self.popup = self.$f7.popup.create({
            content: `
              <div class="popup">
                <div class="page">
                  <div class="navbar">
                    <div class="navbar-inner">
                      <div class="title">Dynamic Popup</div>
                      <div class="right"><a href="#" class="link popup-close">Close</a></div>
                    </div>
                  </div>
                  <div class="page-content">
                    <div class="block">
                    </div>
                  </div>
                </div>
              </div>
            `.trim(),
          });
        }
        // Open it
        self.popup.open();
      },
      onPageBeforeRemove() {
        const self = this;
        // Destroy popup when page removed
        if (self.popup) self.popup.destroy();
      },
    },
}
</script>
