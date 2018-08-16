<template>
  <div>
    <header-bar :showBack=showBack :title="title"></header-bar>
    <div v-if="isEmpty" class="closeQuery" >暂时没有交易记录</div>
   <div v-if="bills!=null">
     <div class="weui-panel weui-panel_access" v-for="wager in bills.wagers">
    <div class="weui-panel__hd title" v-if="wager.league" >
      <div class="weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__desc headerdesc"  >{{wager.league}}</h4>
          <h4 class="weui-media-box__desc headerdesc" >{{wager.team_h_show}}
            <span class="warningdesc" >{{ wager.team_h_ratio }}</span>
            V {{wager.team_c_show}}
            <span class="warningdesc" >{{wager.team_c_ratio}}</span></h4>
        </div>
      </div>
      <!--<slot name="item.league  item.matchTime"></slot>-->
    </div>
    <div class="weui-panel__bd">
      <slot name="body">
          <div class="weui-media-box weui-media-box_text"  >
            <div class="weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">{{wager.gtype}} {{wager.wtype}}</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"></h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"><span class="warningdesc">{{wager.result_data}}</span></h4>
              </div>
            </div>
            <div class="weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"><span class="warningdesc">{{wager.result}}</span> @ <span class="warningdesc">{{wager.ioratio}}</span></h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"> </h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"> </h4>
              </div>
            </div>
            <div class="weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">投注额:{{wager.gold}}</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc"> </h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 v-if="showType=='history'" class="weui-media-box__desc contentdesc">输/赢:  <span v-bind:class="{ 'importdesc': parseFloat(wager.win_gold)>0, 'warningdesc':  parseFloat(wager.win_gold)<0 }">{{wager.win_gold}}</span></h4>
                <h4 v-if="showType=='today'" class="weui-media-box__desc contentdesc">可赢:  <span v-bind:class="{ 'importdesc': parseFloat(wager.win_gold)>0, 'warningdesc':  parseFloat(wager.win_gold)<0 }">{{wager.win_gold}}</span></h4>
              </div>
              </div>
              <div class="weui-media-box_appmsg">
                <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__desc contentdesc">{{wager.w_id}}</h4>
                </div>
                <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__desc contentdesc"> </h4>
                </div>
                <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__desc contentdesc">{{wager.addtime}}{{wager.oddf_type}}</h4>
                </div>
              </div>
            </div>

      </slot>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/HeaderBar.vue";
  export default {
    name: 'DailyBill',
    components: {
      HeaderBar
    },
    props: {
      item: Object
    },
    computed: {

    },
    created: function () {
      let date;
      if(this.$route.query && this.$route.query.date){
          date = this.$route.query.date;
      }
      //指定日期的查询账户
      if (date) {
        this.getDailyBill();
        this.title ='账单'+date;
        this.showType='history';
      }else{
        this.title ='当前交易';
        this.getToday();
      }
    } ,
    methods: {
      getDailyBill() {
        let date =  this.$route.query.date;
        this.showBack=this.$route.query.showBack="true"?true:false;
        console.info('DailyBill:'+date);
        this.axios({
          method: 'post',
          url: '/ball/getDailyBill.op',
          data: {
            "uid": this.$store.state.uid,
            "date": date
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              this.bills = resp.data;
              this.isEmpty = this.bills.wagers==null;
            }
          }.bind(this));
      },
      getToday() {
        this.axios({
          method: 'post',
          url: '/ball/getTodayWagers.op',
          data: {
            "uid": this.$store.state.uid
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              this.bills = resp.data;
              this.isEmpty = this.bills.wagers==null;
            }
          }.bind(this));
      }
    },
    data(){
      return{
        bills : null,
        showBack: false,
        title: '',
        showType:'today',
        isEmpty:false
      }
    }
  }
</script>
<style lang="less">
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_access';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_panel/weui_panel';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_media_box/weui_media_box';
</style>

<style>


  .headerdesc{
    color:white;
    font-size:14px;
    font-weight: bold !important;
  }
  .contentdesc{
    font-size:14px;
    color:black;
  }
  .closeQuery{
    color:red !important;
    text-align: center;
  }
</style>

