<template>
  <div>
    <group>
      <popup-picker title="下注规则" :data="ruleNameList" v-model="ruleName"></popup-picker>
    </group>
    <group>
      <x-switch title="自动投注" v-model="autoBuyIsEff" ></x-switch>
    </group>
    <group >
      <x-input title='通知电话' type="tel" v-model="phone"></x-input>
    </group>
    <group >
      <x-input title='投注金额'  v-model="money"></x-input>
    </group>
    <group >
      <x-input title='每天最大下注场数'  v-model="maxEachDay"></x-input>
    </group>
    <group >
      <x-input title='追加场数'  v-model="continueMaxMatch"></x-input>
    </group>
    <group >
      <x-input title='连赢N场等N场下注(赢输以逗号分隔)'  v-model="winRule"></x-input>
    </group>
    <group >
      <x-input title='追加策略金额(多场以逗号分隔)'  v-model="continuePlanMoney"></x-input>
    </group>
    <group >
      <x-input title='赢多少则停止下注'  v-model="stopWingold"></x-input>
    </group>
    <group >
      <x-input title='输多少则停止下注'  v-model="stopLosegold"></x-input>
    </group>
    <group>
      <x-switch title="是否测试" v-model="isTest"></x-switch>
    </group>
    <br>
    <div class="picker-buttons">
      <x-button type="primary" @click.native="save">保存设置</x-button>
    </div>

  </div>
</template>

<script>

  import {   XSwitch,Divider,Group,XInput,PopupPicker,Picker,XButton,Cell, AlertModule, Alert, TransferDomDirective as TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XSwitch,Divider,Group,XInput,PopupPicker,Picker,XButton,Cell, Alert
    },
    data () {
      return {
        autoBuyIsEff: false,
        phone:"",
        money:"100",
        isTest: false,
        continueStartLostnum:"1",
        continueMaxMatch:"0",
        stopWingold:"0",
        stopLosegold:"0",
        maxEachDay:"3",
        continuePlanMoney:"",
        ruleName:[],
        ruleNameList:[],
        winRule:""

      }
    },
    created: function () {
      this.checkAccountStatus();
      /* this.timer = setInterval(() => {
         this.checkAccountStatus();
       }, 3000)*/

    }, methods: {
      save(){
        let iseff = this.autoBuyIsEff?'1':'0';
        let istest = this.isTest?'1':'0';
        if(this.money && this.money>2000){
          return;
        }
        this.axios({
          method: 'post',
          url: '/ballauto/updateStatus.op',
          data: {
            "account": this.$store.state.account,
            "iseff":iseff,
            "phone": this.phone,
            "money": this.money,
            "isTest":istest,
            "continueMaxMatch":this.continueMaxMatch,
            "continueStartLostnum":this.continueStartLostnum,
            "stopWingold":this.stopWingold,
            "stopLosegold":this.stopLosegold,
            "continuePlanMoney":this.continuePlanMoney,
            "ruleName":this.ruleName[0],
            "maxEachDay":this.maxEachDay,
            "winRule":this.winRule
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              AlertModule.show({
                title: "操作提示",
                content:"保存成功"
              });
            } else{
              AlertModule.show({
                title: "操作提示",
                content:"保存失败"
              })
            }
          }.bind(this));
      },
      checkAccountStatus(){
        this.axios({
          method: 'post',
          url: '/ballauto/findAccount.op',
          data: {
            "account": this.$store.state.account,
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              let data = resp.data;
              if(data){
                this.phone = data.phone;
                this.money = data.money;
                if(data.continueMaxMatch)
                  this.continueMaxMatch=data.continueMaxMatch;
                if(data.continueStartLostnum)
                  this.continueStartLostnum=data.continueStartLostnum;
                if(data.stopWingold)
                  this.stopWingold=data.stopWingold;
                if(data.stopLosegold)
                  this.stopLosegold=data.stopLosegold;
                if(data.maxEachDay)
                  this.maxEachDay=data.maxEachDay;
                if(data.continuePlanMoney)
                  this.continuePlanMoney=data.continuePlanMoney;
                if(data.winRule)
                  this.winRule=data.winRule;
                if(data.ruleName) {
                  this.ruleName=[];
                  this.ruleName.push(data.ruleName);
                }
                if(data.ruleNameList){
                  this.ruleNameList = [];
                  this.ruleNameList.push(data.ruleNameList);
                }

              }
              if(data && data.isTest=='1'){
                this.isTest = true;
              }else{
                this.isTest = false;
              }
              if(data && data.iseff=='1'){
                this.autoBuyIsEff = true;
              }else{
                this.autoBuyIsEff = false;
              }
            }
          }.bind(this));
      }
    }
  }
</script>
