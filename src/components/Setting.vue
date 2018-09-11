<template>
  <div>
    <group>
      <x-switch title="自动投注" v-model="autoBuyIsEff" @on-change="onchangeAutoBuyIsEff"></x-switch>
    </group>
  </div>
</template>

<script>
  import { InlineXSwitch, XSwitch, Group } from 'vux'

  export default {
    components: {
      InlineXSwitch,
      XSwitch,
      Group
    },
    data () {
      return {
        autoBuyIsEff: false
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

        this.axios({
          method: 'post',
          url: '/ballauto/updateStatus.op',
          data: {
            "account": this.$store.state.account,
            "iseff":iseff
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
