export const gameData = {
    data() {
      return {
          NameOfObjectToGet: 'UwU',
          Clicks: 0,
          TotalClicks: 0,
          clicksPerClicks: 1,
          ClicksPerSecond: 0,
          CostOfNextClickUpgrade: 10,
          ClickUpgradeCostMod: 1.07,
          ClicksUpgraded: 0,
          Tickrate: 10,
          Buildings: [
            {id: 0, name: 'Animu newb', cost: 10, base_prod: 0.1, amount_owned: 0, total_prod: 0},
            {id: 1, name: 'Weabu', cost: 50, base_prod: 1, amount_owned: 0, total_prod: 0},
            {id: 2, name: 'Otaku', cost: 100, base_prod: 5, amount_owned: 0, total_prod: 0},
            {id: 3, name: 'Konrad', cost: 250, base_prod: 10, amount_owned: 0, total_prod: 0}
          ],
          Upgrades: [
              {id: 0, name: 'Animu newb', cost: 10},
              {id: 1, name: 'Weabu', cost: 20},
              {id: 2, name: 'Otaku', cost: 30},
              {id: 3, name: 'Konrad', cost: 40}
          ]
      }
    },
    
    created() {
        console.log('Mixin loaded')
    },
    methods: {
        incClick: function () {
            this.Clicks+=this.clicksPerClicks;
            this.TotalClicks+=this.clicksPerClicks;
        },
        decClick: function () {
            this.Clicks--;
        },
        tickClick: function(tick) {
            this.Clicks += tick;
        },
        increaseClicksPerClick: function(mod) {
            this.clicksPerClicks += mod;
            this.Clicks-=this.CostOfNextClickUpgrade;
            this.ClicksUpgraded++;
            this.CostOfNextClickUpgrade = Math.ceil(this.CostOfNextClickUpgrade * Math.pow(this.ClickUpgradeCostMod, this.ClicksUpgraded));
        },
        buyBuilding: function(buildingID) {

            let building = this.Buildings.find( building => building.id === buildingID);
            this.Clicks-=building.cost;

            building.amount_owned++;
            let cost = this.costBuildingCalculator(building)
            building.cost = cost;
            building.total_prod=(building.amount_owned*building.base_prod);

            this.allBuildingTotalProduction();
        },
        costBuildingCalculator: function(building) {
            return Math.ceil(building.cost * Math.pow(this.ClickUpgradeCostMod, building.amount_owned));
        },
        ticker: function() {
            setInterval(() => {
                this.tickClick(this.ClicksPerSecond*this.Tickrate);
            },this.Tickrate*1000)
        },
        allBuildingTotalProduction: function() {
            let prod = 0;
            this.Buildings.forEach( building => {
                prod+=building.total_prod
            })
            this.ClicksPerSecond=prod;
        }
    },
}