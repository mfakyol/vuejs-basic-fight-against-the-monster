const vm = new Vue({
  el: "#app",
  data: {
    turn: 1,
    isStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    playerBaseDamage: 12,
    playerBonusDamageMultiplier: 5,
    monsterBaseDamage: 10,
    playerBaseHeal: 15,
    monsterBaseHeal: 14,
    playerFocus: 25,
    monsterFocus: 25,
    focusActionOpen: false,
    isPromotionOpen: false,
    logs: [],
    gameStatus: "",
  },
  methods: {
    startGame: function () {
      this.turn = 1;
      this.logs = [];
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.playerFocus = 25;
      this.monsterFocus = 25;
      this.playerBaseHeal = 15;
      this.playerBaseDamage = 8;
      this.playerBonusDamageMultiplier = 5;
      this.monsterBonusDamageMultiplier = 5;
      this.monsterBaseDamage = 10;
      this.monsterBaseHeal = 14;
      this.isStarted = true;
      this.focusActionOpen = false;
      this.isPromotionOpen = false;
      this.gameStatus = "";
    },

    log: function (turn, playerTurnLog, monsterTurnLog) {
      this.logs = [{ turn, playerTurnLog, monsterTurnLog }, ...this.logs];
    },

    surrender: function () {
      this.isStarted = false;
      this.gameStatus = "You surrendered";
      this.log(this.turn++, "Player surrendered", "Monster yelling");
    },

    attack: function () {
      const damage =
        this.playerBaseDamage +
        Math.ceil(Math.random() * this.playerBonusDamageMultiplier);
      this.monsterHealth -= damage;
      this.playerFocus += 12;
      const playerTurnLog = `The Player damaged ${damage} and gained 12 focus.`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    heal: function () {
      const heal = this.playerBaseHeal;
      this.playerHealth += heal;
      const playerTurnLog = `The Player Healed ${heal}.`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    focusedAttack() {
      const damage =
        2 *
        (this.playerBaseDamage +
          Math.ceil(Math.random() * this.playerBonusDamageMultiplier));
      this.monsterHealth -= damage;
      this.playerFocus -= 55;
      const playerTurnLog = `The Player damaged ${damage} and spent 55 focus.`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    promotion() {
      this.playerHealth += 40;
      this.playerBaseDamage += 4;
      this.playerFocus = 0;
      const playerTurnLog = `The Player promoted and spent 100 focus.`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    focusedHeal() {
      const heal = 2 * this.playerBaseHeal;
      this.playerHealth += heal;
      this.playerFocus -= 55;
      const playerTurnLog = `The Player healded ${heal} and spent 55 focus.`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    gatherFocus: function () {
      this.playerFocus += 30;
      const playerTurnLog = `The Player gained 30 focus`;
      const monsterTurnLog = this.monsterTurn();
      this.log(this.turn++, playerTurnLog, monsterTurnLog);
    },

    monsterTurn: function () {
      const monsterTurnLog = "";
      if (this.monsterFocus < 55) {
        this.monsterTurnLog = this.monsterAttack();
      } else if (this.monsterHealth < 40) {
        this.monsterTurnLog = this.monsterHeal();
      } else {
        this.monsterTurnLog = this.monsterDoubleAttack();
      }
      return this.monsterTurnLog;
    },

    monsterAttack: function () {
      const damage =
        this.monsterBaseDamage +
        Math.ceil(Math.random() * this.monsterBonusDamageMultiplier);
      this.playerHealth -= damage;
      this.monsterFocus += 15;
      return ` The Monster damaged ${damage} and gained 15 focus.`;
    },

    monsterDoubleAttack: function () {
      const damage =
        2 *
        (this.monsterBaseDamage +
          Math.ceil(Math.random() * this.monsterBonusDamageMultiplier));
      this.playerHealth -= damage;
      this.monsterFocus -= 55;
      return ` The Monster damaged ${damage} and spent 55 focus.`;
    },

    monsterHeal: function () {
      const heal = this.monsterBaseHeal;
      this.monsterHealth += this.monsterFocus -= 55;
      return ` The Monster damaged ${heal} and spent 55 focus.`;
    },
  },
  computed: {
    playerHealhtBarWidth: function () {
      return {
        width: this.playerHealth + "%",
      };
    },

    playerFocusBarWidth: function () {
      return {
        width: this.playerFocus + "%",
      };
    },

    monsterHealhtBarWidth: function () {
      return {
        width: this.monsterHealth + "%",
      };
    },

    monsterFocusBarWidth: function () {
      return {
        width: this.monsterFocus + "%",
      };
    },
  },
  watch: {
    playerHealth: function (value) {
      if (value <= 0) {
        this.playerHealth = 0;
        this.gameStatus = "You Lost";
        this.isStarted = false;
      } else if (value > 100) {
        this.playerHealth = 100;
      }
    },

    playerFocus: function (value) {
      if (value <= 0) {
        this.playerFocus = 0;
      } else if (value > 100) {
        this.playerFocus = 100;
      }
    },

    monsterHealth: function (value) {
      if (value <= 0) {
        console.log("asds");
        this.monsterHealth = 0;
        this.gameStatus = "You Win";
        this.isStarted = false;
      } else if (value > 100) {
        this.monsterHealth = 100;
      }
    },

    playerFocus: function (value) {
      if (value >= 100) {
        this.playerFocus = 100;
        this.isPromotionOpen = true;
      } else {
        this.isPromotionOpen = false;
      }

      if (value >= 55) {
        this.focusActionOpen = true;
      } else {
        this.focusActionOpen = false;
      }
    },
  },
});
