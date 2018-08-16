<template>
  <div>
    <header-bar :showBack="true" :title="showTypeName"></header-bar>
    <div v-for="item in itemList">
      <ball-panel :showType="showType" :item="item"   @showBetForm="showBetForm"></ball-panel>
   </div>
    <div v-transfer-dom>
      <popup v-model="show1">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
          left-text="取消"
          right-text="完成"
          title="交易单"
          :show-bottom-border="false"
          @on-click-left="show1 = false;canelTime2();"
          @on-click-right="show1 = false;canelTime2();"></popup-header>
       <!-- <group gutter="0">
          <radio :options="['1', '222','333']"></radio>
        </group>-->
        <bet-form  ref="betform" v-if="betformData.item"  :showType="showType"  :betformData="betformData" header-label="付款金额" header-value="¥2400.00" :body-items="betformList" :footer-buttons="buttons1"></bet-form>
      </popup>
    </div>
    <div v-transfer-dom>
      <alert v-model="showErr" title="错误提示" > {{ errorMsg }}</alert>
    </div>
  </div>
</template>

<i18n>
  Switch the type:
  zh-CN: 切换样式
  List of content with image:
  zh-CN: 图文组合列表
  More:
  zh-CN: 查看更多
</i18n>

<script>
  import { Alert,Panel, Group, Radio,PopupHeader, Popup, TransferDom,XSwitch,FormPreview} from 'vux'
  import BallPanel from "@/components/BallPanel.vue";
  import HeaderBar from "@/components/HeaderBar.vue";
  import BetForm from "@/components/BetForm.vue";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Alert,
      BetForm,
      FormPreview,
      PopupHeader,
      Popup,
      Group,
      XSwitch,
      Panel,
      Radio,
      BallPanel,
      HeaderBar
    },
    methods: {
      onImgError (item, $event) {
        console.log(item, $event)
      },
      showErrTip(message){
        this.errorMsg =  message;
        this.showErr = true;
      },
      getbkPreOrderViewTimer(){
        if(this.timer2) { //如果定时器还在运行 或者直接关闭，不用判断
          clearInterval(this.timer2); //关闭
        }
        if(this.$refs.betform)
          this.$refs.betform.getbkPreOrderView();
        this.timer2 = setInterval(() => {
          if(this.$refs.betform)
             this.$refs.betform.getbkPreOrderView();
        }, 8000);
      },
      showBetForm (wtype,side,item,ratio,iorratio,strong,$event) {
        if(this.showType=='RB') {
          this.betformData.header = "【滚球】";
        }else{
          this.betformData.header = "【今日】";
        }
        //比赛类型
        if(item.gtype=='FT'){
          this.betformData.header += "足球";
        }else if(item.gtype=='BK'){
          this.betformData.header += "篮球";
        }
        //投注类型
        if(wtype=='RE'){
          this.betformData.header += "让球";
        }else if(wtype=='ROU'){
          this.betformData.header += "大小球";
        }
        this.betformData.item=item;
        this.betformData.side=side;
        this.betformData.wtype=wtype;
        this.betformData.showType=this.showType;
        this.betformData.ratio=ratio;
        this.betformData.iorratio=iorratio;
        this.betformData.strong=strong;
        if(wtype=='RE' &&  iorratio =='0.0'){
          this.showErrTip("已关闭让球下注");
          return;
        }else if(wtype=='ROU' && iorratio =='0.0'){
          this.showErrTip("已关闭大小球下注");
          return;
        }
        console.info('this.$refs.betform:'+this.$refs.betform);
        if(this.$refs.betform){
          this.$refs.betform.reset();
        }
        this.show1=true;
        this.getbkPreOrderViewTimer();
        console.log("wtype:"+wtype+",side:"+side+",item:"+item+",ratio:"+ratio+",iorratio:"+iorratio+",strong:"+strong);
      },
      getShowType(){
        if(this.$route.path=='/bkroll'){
          this.showType = "RB";
          this.showTypeName="滚球篮球";
        }else if(this.$route.path=='/bktoday'){
          this.showType = "FT";
          this.showTypeName="今日篮球";
        }
      },
      bkRollGameList(){
        let url ='';
        if(this.showType=='RB'){
          url = '/ball/bkRollGameList.op';
        }else if(this.showType=='FT' ){
          url = '/ball/bkTodayGameList.op';
        }
        this.axios({
          method: 'post',
          url: url,
          data: {
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              this.itemList = resp.data;
            }
          }.bind(this));
      },
      canelTime2(){
        console.info('canelTime2');
        if(this.timer2) { //如果定时器还在运行 或者直接关闭，不用判断
          clearInterval(this.timer2); //关闭
        }
      }
    },
    created: function () {
         this.show1 =false;
        this.getShowType();
        this.bkRollGameList();
        this.timer = setInterval(() => {
          this.bkRollGameList();
        }, 5000);
    },
    beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
      this.canelTime2();
    },
    data () {
      return {
        showType:"",
        showTypeName:"",
        money:0,
        errorMsg :"",
        showErr :false,
        type: '5',
        show1: true,
        timer: null,
        timer2: null,
        betformData:{
          header:"",
          item:null
        },
        buttons1: [{
            style: 'default',
            text: '辅助操作'
          }, {
            style: 'primary',
            text:  '跳转到首页' ,
            link: '/'
          }],
        betformList:  [{
                      label: '商品',
                      value: '电动打蛋机'
                    }, {
                      label: '标题标题',
                      value: '名字名字名字'
                    }, {
                      label: '标题标题',
                      value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
                    }],
        itemList: [ {
          league:" ",
          match_time:" ",
          n_time:" ",
          team_h:" ",
          team_c:" ",
          radio_u:"18",
          n_radio_u:"18",
          n_min_radio_u:"9",
          n_max_radio_u:"",
          radio_ou:"180",
          n_radio_ou:"160"
        } ]
      }
    }
  }
</script>

