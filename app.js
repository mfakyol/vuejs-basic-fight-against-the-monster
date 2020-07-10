const vm = new Vue({
    el:"#app",
    data:{
        isStarted:false,
        playerHealth: 100,
        monsterHealth: 100,
        playerBaseDamage: 12,
        playerBonusDamageMultiplier: 5,
        monsterBaseDamage: 10,
        playerBaseHeal: 15,
        monsterBaseHeal: 14,
        playerFocus:25,
        monsterFocus:25,
        focusActionOpen:false,
        isPromotionOpen:false,
        log: []
    },
    methods: {
        startGame: function(){
            this.log=[];
            this.playerHealth=100;
            this.monsterHealth=100;
            this.playerFocus=25;
            this.monsterFocus=25;
            this.playerBaseHeal=15;
            this.playerBaseDamage=8;
            this.playerBonusDamageMultiplier=5;
            this.monsterBonusDamageMultiplier=5;
            this.monsterBaseDamage=10;
            this.monsterBaseHeal=14;
            this.isStarted=true;
            focusActionOpen=false;
            isPromotionOpen=false;

        },
        surrender: function(){
            this.isStarted=false;
                       
        },
        attack: function(){
            this.monsterHealth-=(this.playerBaseDamage+Math.ceil(Math.random()*this.playerBonusDamageMultiplier));
            this.playerFocus+=10;
            this.monsterTurn();

        },
        heal: function(){
            this.playerHealth+=this.playerBaseHeal;
            this.monsterTurn();
        },
        focusedAttack(){
            this.monsterHealth-=(2*this.playerBaseDamage+Math.ceil(Math.random()*2*this.playerBonusDamageMultiplier));
            this.playerFocus-=55;
            this.monsterTurn();
        },promotion(){
            this.playerHealth+=40;
            this.playerBaseDamage+=4;
            this.playerFocus=0;
        },
        focusedHeal(){
            this.playerHealth+=2*this.playerBaseHeal;
            this.playerFocus-=55;
            this.monsterTurn();
        },
        monsterTurn: function(){
            if(this.monsterFocus<55){
                this.monsterAttack();
            }
            else if(this.monsterHealth<40){
                this.monsterHealth+=this.monsterBaseHeal;
                this.monsterFocus-=55;
            }
            else{
                this.monsterAttack();
                this.monsterAttack();
                this.monsterFocus-=55;
            }
        },
        monsterAttack: function(){
            this.playerHealth-=(this.monsterBaseDamage+Math.ceil(Math.random()*this.monsterBonusDamageMultiplier));
            this.monsterFocus+=15;
        },
        gatherFocus: function(){
            this.playerFocus+=30;
            this.monsterTurn();
        }
    },
    computed: {
        playerHealhtBarWidth: function(){
            return {
                width: this.playerHealth + "%"
            }
        },
        playerFocusBarWidth: function(){
            return {
                width: this.playerFocus + "%"
            }
        },
        monsterHealhtBarWidth: function(){
            return {
                width: this.monsterHealth + "%"
            }
        },
        monsterFocusBarWidth: function(){
            return {
                width: this.monsterFocus + "%"
            }
        },
        
    },
    watch: {
        playerHealth: function(value){
            if(value<=0){
                this.playerHealth=0;
                //game over lose
            }
            else if(value>100){
                this.playerHealth=100;
            }
        },
        playerFocus: function(value){
            if(value<=0){
                this.playerFocus=0;
            }
            else if(value>100){
                this.playerFocus=100;
            }
        },
        monsterHealth: function(value){
            if(value<=0){
                console.log("asds")
                this.monsterHealth=0;
            }
            else if(value>100){
                this.monsterHealth=100;
            }
        }, playerFocus: function(value){

            if(value>=100){
                this.playerFocus=100;
                this.isPromotionOpen=true;
            }
            else{
                this.isPromotionOpen=false;
            }

            if(value>=55){
                this.focusActionOpen=true;
            }
            else{
                this.focusActionOpen=false;
            }
        },
        
    },
});