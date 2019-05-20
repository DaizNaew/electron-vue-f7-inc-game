export const gameData = {
    data() {
      return {
          Clicks: 0,
          TotalClicks: 0,
          clicksPerClicks: 1,
          CostOfNextClickUpgrade: 10,
          ClickUpgradeCostMod: 1.07,
          ClicksUpgraded: 0,
          Buildings: [

          ],
          Upgrades: [

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
        }
    },
}