<template>
  <div>
    <x-header @on-click-back="back" :left-options="{showBack:showBack}" style="background-color:#2f2c2c;">{{title}}</x-header>
  </div>
</template>

<script>

  import { XHeader,TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    data(){
      return{

      }
    },
    props: {
      showBack:Boolean,
      title: String
    },
    components: {
      XHeader,TransferDom
    },
    methods: {
      back() {
        this.$router.back();
      }
    }
  }

</script>

<style scoped>
.header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px 0;
    width: 100vw;
    overflow: hidden;
    pointer-events: none;
    z-index: 9;
}
.back-btn {
    display: inline-block;
    position: relative;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    background: url("../assets/image/return.png") 0 0 no-repeat;
    background-size: 30px;
    pointer-events: all;
}
</style>
