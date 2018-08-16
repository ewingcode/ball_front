<template>
  <div>
    <header-bar :showBack="false" title="今日投注分类"></header-bar>
    <group>
      <!-- <cell is-link>
         <span slot="title" style="color:green;"><span style="vertical-align:middle;">足球</span> <badge name="ft" :text="ftCount"></badge></span>
       </cell>-->
      <cell is-link @click.native="goBkToday">
        <span slot="title" style="color:green;"><span style="vertical-align:middle;">篮球</span> <badge name="bk" :text="bkCount"></badge></span>
      </cell>
    </group>

  </div>
</template>

<script>
  import { Cell, Group ,Badge } from 'vux'
  import HeaderBar from "@/components/HeaderBar.vue";
  export default {
    components: {
      Group,
      Cell,
      Badge,
      HeaderBar
    },
    data () {
      return {
        ftCount:0,
        bkCount:0,
        timer : null
      }
    },
    created: function () {
      this.rollCount();
      this.timer = setInterval(() => {
        this.rollCount();
      }, 5000)
    },
    beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
    },
    methods: {
      rollCount(){
        this.axios({
          method: 'post',
          url: '/ball/todayCount.op',
          data: {
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              let data = resp.data;
              this.ftCount = data.ftCount;
              this.bkCount = data.bkCount;
            }
          }.bind(this));
      },
      goBkToday( ) {
        console.log('bktoday');
        this.$router.push({
          name: "bktoday"
        });

      }
    }
  }
</script>

<style scoped>

</style>
