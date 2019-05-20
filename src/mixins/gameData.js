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
          Buildings: [
            {id: 0, name: 'Animu newb', cost: 10},
            {id: 1, name: 'Weabu', cost: 20},
            {id: 2, name: 'Otaku', cost: 30},
            {id: 3, name: 'Konrad', cost: 40}
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
        ticker: function() {
            setInterval(() => {
                this.tickClick(this.ClicksPerSecond);
            },1000)
        }
    },
}