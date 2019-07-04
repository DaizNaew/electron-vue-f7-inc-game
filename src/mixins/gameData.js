const {
    remote
} = require('electron');
var CurrWin = remote.getCurrentWindow();

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
        BoughtBuildings: [],
    }));
}

let {
    Clicks,
    TotalClicks,
    clicksPerClicks,
    ClicksPerSecond,
    CostOfNextClickUpgrade,
    ClicksUpgraded,
    Tickrate,
    BuyAmount,
    BoughtBuildings,
} = JSON.parse(storage.getItem(SAVE_KEY));

let {Upgrades,Buildings} = require('../static/buildings.json');

export const gameData = {

    data() {
        return {
            NameOfObjectToGet: 'UwU',
            ClickUpgradeCostMod: 1.07,
            Clicks,
            TotalClicks,
            clicksPerClicks,
            ClicksPerSecond,
            CostOfNextClickUpgrade,
            ClicksUpgraded,
            Tickrate,
            BuyAmount,
            BoughtBuildings,
            Buildings,
            Upgrades,
        }
    },

    created() {
        console.log('Mixin loaded');
        for(let i = 0; i < this.Buildings.length; i++) {
            if(this.BoughtBuildings[i]) this.Buildings[i] = this.BoughtBuildings[i];
            this.Buildings[i].Upgrades = this.Upgrades[i];
        }
        console.dir(this.Buildings);
    },
    methods: {
        incClick: function () {
            this.Clicks += this.clicksPerClicks;
            this.TotalClicks += this.clicksPerClicks;
        },
        decClick: function () {
            this.Clicks--;
        },
        tickClick: function (tick) {
            this.Clicks += tick;
        },
        increaseClicksPerClick: function (mod) {
            this.clicksPerClicks += mod;
            this.Clicks -= this.CostOfNextClickUpgrade;
            this.ClicksUpgraded++;
            this.CostOfNextClickUpgrade = Math.ceil(this.CostOfNextClickUpgrade * Math.pow(this.ClickUpgradeCostMod, this.ClicksUpgraded));
        },
        buyBuilding: function (buildingID) {

            let building = this.Buildings.find(building => building.id === buildingID);
            this.Clicks -= building.cost;

            building.amount_owned++;
            let cost = this.costBuildingCalculator(building)
            building.cost = cost;
            building.total_prod = (building.amount_owned * building.base_prod);
            this.BoughtBuildings[building.id] = building
            this.allBuildingTotalProduction();
        },
        costBuildingCalculator: function (building) {
            return Math.ceil(building.cost * Math.pow(this.ClickUpgradeCostMod, building.amount_owned));
        },
        ticker: function () {
            let tick = 0;
            const that = this;
            const app = that.$f7;
            const $$ = that.$$;
            /**
             * Interval to handle the profit supposed to be given every tick
             */
            setInterval(() => {
                tick += 1000;
                if (tick >= 1000 * this.Tickrate) {
                    let profit = this.ClicksPerSecond * this.Tickrate;
                    this.tickClick(profit);
                    let tickText = `<p id="tickText" style="opacity:0;position:absolute;z-index:100;left:58%; bottom:60%">+${profit.toFixed(1)}</p>`;
                    $$('#floatingTickText').append(tickText)
                    $$('#tickText').animate({
                            'opacity': 1,
                            'top': '95%'
                        }, {
                            duration: 2500,
                            begin: function (elements) {
                                that.setTickerProgress(0);
                            }
                        })
                        .animate({
                            'opacity': 0,
                            'top': '0px'
                        }, {
                            duration: 500,
                            complete: function (elements) {
                                $$('#floatingTickText').empty();
                            }
                        });
                    tick = 0;
                }
                this.setTickerProgress(tick / 100);
            }, 1000);
            /**
             * Interval to run the save data function
             */
            setInterval(() => {
                app.toast.show({
                    destroyOnClose: true,
                    text: 'Game Data Saved',
                    closeTimeout: 2500,
                    closeButton: true,
                    closeButtonText: 'X',
                });
                that.saveGameData();
            }, 1000 * 60 * 1)
        },
        allBuildingTotalProduction: function () {
            let prod = 0;
            this.BoughtBuildings.forEach(building => {
                prod += building.total_prod
            })
            this.ClicksPerSecond = prod;
        },
        /**
         * Start on functions to handle the saving and loading of user data
         */
        saveGameData: function () {

            const that = this;
            let {
                Clicks,
                TotalClicks,
                clicksPerClicks,
                ClicksPerSecond,
                CostOfNextClickUpgrade,
                ClicksUpgraded,
                Tickrate,
                BuyAmount,
                BoughtBuildings
            } = that.returnUserGameData();
            that.save({
                Clicks,
                TotalClicks,
                clicksPerClicks,
                ClicksPerSecond,
                CostOfNextClickUpgrade,
                ClicksUpgraded,
                Tickrate,
                BuyAmount,
                BoughtBuildings
            })

        },
        returnUserGameData: function () {

            let data = {
                Clicks: this.Clicks,
                TotalClicks: this.TotalClicks,
                clicksPerClicks: this.clicksPerClicks,
                ClicksPerSecond: this.ClicksPerSecond,
                CostOfNextClickUpgrade: this.CostOfNextClickUpgrade,
                ClicksUpgraded: this.ClicksUpgraded,
                Tickrate: this.Tickrate,
                BuyAmount: this.BuyAmount,
                BoughtBuildings : this.BoughtBuildings
            }

            return data
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
}