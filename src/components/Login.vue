<template>
    <div>
      <div class="logo">
        <img slot="icon" src="../assets/grid_icon.png">
      </div>
      <group>
        <x-input title="账号" name="user" placeholder="请输入帐号" v-model="account" ></x-input>
      </group>

      <group>
        <x-input title="密码" name="pwd" placeholder="请输入密码" type="password" v-model="pwd" ></x-input>
      </group>
      <div class="loginbtn">
        <x-button   type="primary" @click.native="login">登入</x-button>
      </div>
      <div v-transfer-dom>
        <alert v-model="showErr" title="错误提示" > {{ errorMsg }}</alert>
      </div>
    </div>

</template>

<script>
  import {  Alert,XInput, Group, XButton,TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Alert,
      XInput,
      XButton,
      Group
    },
    data () {
      return {
        account:"",
        pwd:"",
        showErr:false,
        errorMsg:""
      }
    },
    methods: {
      showErrTip(message){
        this.errorMsg =  message;
        this.showErr = true;
      },
      login( ) {
        let debugLogin = false;
        if (debugLogin) {
          this.goHome(2222);
          return;
        }else {
          console.info("start to request login webservice.");
          this.axios({
            method: 'post',
            url: '/ball/login.op',
            data: {
              "account": this.account,
              "pwd": this.pwd
            }
          })
            .then(function (response) {
              let resp = response.data;
              if (resp.code != 200) {
                this.showErrTip('登陆失败，服务出错！');
                return;
              }
              let data = resp.data;
              let uid = data.uid;
              let account =data.account;
              if (!uid) {
                this.showErrTip(data.code_message);
                return;
              } else {
                this.goHome(uid,account);
              }
            }.bind(this))
            .catch(function (err) {
              console.log(err);
              this.showErrTip('服务异常');
            }.bind(this));
        }
      },
      goHome(uid,account){
        let loginTime = Date.parse(new Date());
        //vuex中记录登录信息
        this.$store.commit("setLoginInfo",{uid:uid,account:account,loginTime:loginTime});
        this.$router.push({
          name: "roll"
        });
        this.$store.commit("showNavBar");
      },
      onEnter (val) {
       // this.$store.commit("hideNavBar");
        console.log('click enter!', val)
      }
    }
  }
</script>
<style scoped>

</style>
