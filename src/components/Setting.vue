<template>
  <div>
    <group>
    <x-switch title="自动投注" v-model="autoBuyIsEff" @on-change="onchangeAutoBuyIsEff"></x-switch>
  </group>
    <group >
      <x-input title='通知电话' type="tel" v-model="phone"></x-input>
    </group>
    <group >
      <x-input title='投注金额'  v-model="money"></x-input>
    </group>
    <group >
      <x-input title='追加场数'  v-model="continueMaxMatch"></x-input>
    </group>
    <group >
      <x-input title='连输第几场开始追加'  v-model="continueStartLostnum"></x-input>
    </group>
    <group>
      <x-switch title="是否测试" v-model="isTest"></x-switch>
    </group>
  </div>
</template>

<script>
  import { InlineXSwitch, XSwitch, Group,XInput } from 'vux'

  export default {
    components: {
      InlineXSwitch,
      XSwitch,
      Group,
      XInput
    },
    data () {
      return {
        autoBuyIsEff: false,
        phone:"",
        money:"100",
        isTest: false,
        continueStartLostnum:"1",
        continueMaxMatch:"0"

      }
    },
    created: function () {
      this.checkAccountStatus();
     /* this.timer = setInterval(() => {
        this.checkAccountStatus();
      }, 3000)*/

    }, methods: {
      onchangeAutoBuyIsEff(value){
        let iseff = value?'1':'0';
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
            "continueStartLostnum":this.continueStartLostnum
          }
        })
          .then(function (response) {

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
