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
        money:"100"
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
            "money": this.money
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
