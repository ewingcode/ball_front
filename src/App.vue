<template>
  <div id="app">
    <div class="content">
       <router-view></router-view>
    </div>
    <div style="height:50px; ">

    </div>
    <transition name="fade">
      <app-footer v-show="ifShowNavBar"></app-footer>
    </transition>
  </div>
</template>

<script>
  import AppFooter from "./components/Footer.vue";
  import { mapState } from "vuex";
  export default {
    name: 'app',
    mounted() {

    },
    components: {
      AppFooter
    } ,
    computed: {
      ...mapState(["ifShowNavBar"])
    }
  }

</script>

<style lang="less">
  @import "./assets/less/main.less";
  @import '~vux/src/styles/reset.less';
  #app {
    width: 100%;
    overflow: hidden;
  }
  body {
    background-color: #fbf9fe;
  }

  .content{
   max-height: calc(~"100% - 50px");

    overflow: auto;
  }
</style>
