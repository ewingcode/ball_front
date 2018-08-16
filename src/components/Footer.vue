<template>
  <tabbar  @on-index-change="indexChange" class="main-footer">
     <tabbar-item :selected="selected[0]">
        <img slot="icon" src="../assets/demo/icon_nav_cell.png">
        <span slot="label">滚球</span>
      </tabbar-item>
    <tabbar-item :selected="selected[1]">
        <img slot="icon" src="../assets/demo/icon_nav_cell.png">
        <span slot="label">今日</span>
      </tabbar-item>
    <tabbar-item :selected="selected[2]">
        <img slot="icon" src="../assets/demo/icon_nav_msg.png">
        <span slot="label">投注</span>
      </tabbar-item>
    <tabbar-item :selected="selected[3]">
        <img slot="icon" src="../assets/demo/icon_nav_article.png">
        <span slot="label">账单</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
  import { Tabbar, TabbarItem,TransferDom  } from "vux";

  let navs = ["roll", "today",  "currentbill" ,"billhistory"];

  export default {
    name: "AppFooter",
    directives: {
      TransferDom
    },
    data: function () {
      return {
        selected: [true, false, false, false]
      };
    },
    components: {
      Tabbar,
      TabbarItem
    },
    methods: {
      indexChange: function (newindex, oldindex) {
        //oldindex是undefined表示刷新页面
        if (oldindex !== undefined) {
          this.$router.push({
            name: navs[newindex]
          });
        }
      }
    },
    created: function () {
      let that = this;

      changeSelected(that.$router.currentRoute.name);
      that.$router.afterEach(function (to, from) {
        changeSelected(to.name);
      });

      function changeSelected(currentRouterName) {
        that.selected = [false, false, false, false];
        that.selected[navs.indexOf(currentRouterName)] = true;
      }
    }
  };
</script>
<style scoped>
  .main-footer {
    position: fixed;
  }
</style>
