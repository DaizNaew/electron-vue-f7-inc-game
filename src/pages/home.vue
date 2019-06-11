<template>
  <f7-page @page:afterin="init()">
    <f7-navbar style="-webkit-app-region: drag">
      <f7-nav-left style="-webkit-app-region: no-drag;">
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left">Menu</f7-link>
      </f7-nav-left>
      <f7-nav-title >{{NameOfObjectToGet}} gatherer</f7-nav-title>
      <!--
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      -->
      <f7-nav-right style="-webkit-app-region: no-drag;">
        <f7-segmented>
          <f7-button @click="Minimize()">_</f7-button>
          <f7-button @click="Close()">X</f7-button>
        </f7-segmented>
      </f7-nav-right>
    </f7-navbar>

    <f7-block strong>

      <f7-row>
        <f7-col width=40>
        </f7-col>
        <f7-col width=40>
        </f7-col>
      </f7-row>
      <f7-row>

        <f7-col width=40>
          <canvas id="myChart" width="400" height="400"></canvas>
        </f7-col>

        <f7-col width=20 class=text-center>
          <f7-block-title medium>You got</f7-block-title>
          <f7-block strong>
            <label>{{Clicks.toFixed(1)}} {{NameOfObjectToGet}}s</label>
          </f7-block>
          <p>Ticker:</p>
          <div id="floatingTickText"></div>
          <p>
            <f7-progressbar :progress="0" id="tickerProgress" />
          </p>
          <f7-block>
            <p>{{clicksPerClicks}} {{NameOfObjectToGet}} per click</p>
            <f7-button color=blue @click="incClick()">Gather {{NameOfObjectToGet}}s</f7-button>
            <f7-button color=red @click="increaseClicksPerClick(1)" v-if="Clicks >= CostOfNextClickUpgrade">Upgrade
              {{NameOfObjectToGet}} collection</f7-button>
          </f7-block>
          <f7-block strong>
            <p>Current amount of {{NameOfObjectToGet}} per tick: {{(ClicksPerSecond*Tickrate).toFixed(1)}}</p>
            <p>Current tickrate {{(1/Tickrate).toFixed(1)}} a second</p>
          </f7-block>

        </f7-col>
        <f7-col width=40>
          <f7-block>
            <f7-block-header>Units available for purchase</f7-block-header>
            <f7-list media-list>
              <f7-list-item v-for="item in Buildings" :key="item.id" :title="item.name">
                <ul slot=after>
                  <li><label>Price: {{item.cost}}</label></li>
                  <li><label>Produces {{item.total_prod.toFixed(1)}}/s</label></li>
                </ul>

                <f7-segmented raised tag=p slot=subtitle>

                  <f7-button @click="buyBuilding(item.id)" :disabled="Clicks < item.cost" text=Buy>
                    <f7-badge :class="[Clicks >= item.cost ? 'color-red' : 'color-white']">!</f7-badge>
                  </f7-button>

                  <f7-button :disabled="0 == item.amount_owned || item.amount_owned < 10" text=Upgrades
                    tooltip="Click this to further upgrade this unit" popover-open=.popover-menu />
                </f7-segmented>

                <f7-badge slot=media :disabled="0 == item.amount_owned" :class="{'color-blue' : item.amount_owned > 0}">
                  {{item.amount_owned}}</f7-badge>

                <f7-popover :key="item.id" class=popover-menu>
                  <!--
                  <f7-list>
                    <f7-list-item :key="upgrade.id" v-for="upgrade in item.Upgrades" :title="upgrade.name"
                      :hidden="upgrade.req_units > item.amount_owned" link=#>
                      <label slot=after>Purchase</label>
                      <label slot=header>Price: {{upgrade.cost}}</label>
                      <label slot=footer>{{upgrade.effect_text}}</label>
                    </f7-list-item>
                  </f7-list>
                  -->
                </f7-popover>

              </f7-list-item>
            </f7-list>
            <f7-block-footer>
            </f7-block-footer>
          </f7-block>
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

import {
  gameData
} from '../mixins/gameData';

const {
  remote
} = require('electron');
var CurrWin = remote.getCurrentWindow();

export default {

  mixins: [gameData],

  data() {
    return {
      name: 'Konrad',
      popupOpened: false
    }
  },
  methods: {
    Close() {
      CurrWin.close();
    },
    Minimize() {
      CurrWin.minimize();
    },
    setTickerProgress(val) {
      const that = this;
      const app = that.$f7;
      app.progressbar.set("#tickerProgress", val)
    },
    createPopup() {
      const that = this;
      // Create popup
      if (!that.popup) {
        that.popup = that.$f7.popup.create({
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
      that.popup.open();
    },
    onPageBeforeRemove() {
      const that = this;
      // Destroy popup when page removed
      if (that.popup) that.popup.destroy();
    },
    CreateChart() {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    },
    init() {
      //this.CreateChart();
      this.ticker();
    }
  },
}
</script>
