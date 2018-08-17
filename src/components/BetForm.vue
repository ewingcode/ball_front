<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__hd form-match-info">
      <div><strong>{{betformData.header}}</strong></div>
      <div>{{betformData.item.league}}</div>
      <div>{{betformData.item.team_h}}

        <span class="warningdesc" v-if="betformData.wtype=='RE'">{{ betformData.strong == 'H' ? betformData.ratio : '0' }}</span>
        V {{betformData.item.team_c}}
        <span class="warningdesc" v-if="betformData.wtype=='RE'">{{ betformData.strong == 'C' ? betformData.ratio : '0' }}</span></div>
    </div>
    <div class="weui-form-preview__hd form-match-info ">
      <div>
        <p v-if="betformData.wtype=='RE'">
          <span v-if="betformData.side=='H'">
            {{betformData.item.team_h}}
          </span>
          <span v-if="betformData.side=='C'">
            {{betformData.item.team_c}}
          </span>@ <span class="warningdesc">{{ betformData.iorratio }}</span>
        </p>
        <p v-if="betformData.wtype=='ROU'">
          {{ betformData.ratio }} @ <span class="warningdesc">{{ betformData.iorratio }}</span>
        </p>
      </div>
    </div>
    <div class="weui-form-preview__hd form-match-info ">
      <div class="form-cell">
        <input v-if="showcalculation" type="text" id="betMoney" v-model="money" readonly/> <span class="warningdesc">{{errorMsg}}</span>
      </div>
      <div class="form-cell" v-if="showcalculation">
        <span>单注最低：50</span>
        <span>单注最高：2000</span>
      </div>
    </div>

    <div class="weui-form-preview__hd form-match-info ">
      <div class="form-cell">
        <input type="hidden" name="importValue" v-model="importValue"/>
        <div v-if="!showcalculation">
          <span><strong>投注金额:</strong></span>
          <span><strong class="warningdesc">{{money}}</strong></span>
        </div>
        <span><strong>可赢金额:</strong></span>
        <span><strong class="warningdesc">{{winMoney}}</strong></span>
      </div>
    </div>
    <div class="weui-form-preview__hd form-match-info " v-if="showcalculation">
      <calculation ref="calculation" :betMoney="betMoney" @getKeyBoardMoney="getKeyBoardMoney" @confirmEvent="confirmEvent"></calculation>
    </div>
  </div>
</template>

<script>
  import {   Alert,XInput,TransferDomDirective as TransferDom } from 'vux'
  import Calculation from '@/components/Calculation.vue'
  export default {
    name: 'BetForm',
    directives: {
      TransferDom
    },
    components: {
      XInput,Calculation,Alert
    },
    props: {
      betformData: Object,
      showType:String
    },
    data(){
      return{
        money : "",
        importValue:0,
        timer: null,
        showErr:false,
        errorMsg:"",
        ratio:"",
        bkPreOrderViewResp:null,
        showcalculation:true,
        allowGetbkPreOrderView:true
      }
    },
    created: function () {
      //初始化时候获取一次投注赔率
      this.getbkPreOrderView();
    },
    computed: {
      // 计算属性的 getter
      betMoney: function () {
        return this.money;
      },
      winMoney: function () {
        let iorrate = parseFloat(this.betformData.iorratio);
        let win = Math.floor(this.money * iorrate * 100)/100;
        return win;
      }
    },
    methods: {
      showErrTip(message){
        this.errorMsg =  message;
        //this.showErr = true;
      },
      reset(){
        this.errorMsg='';
        this.bkPreOrderViewResp=null;
        this.showcalculation=true;
        this.allowGetbkPreOrderView=true;
        if( this.$refs.calculation)
          this.$refs.calculation.reset();
      },
      changeWtypeByShowType(wtype){
        //只对今日的投注修改wtype
        if(this.betformData.showType== "FT"){
          if(this.betformData.wtype=='RE'){
             return 'R';
          }else{
             return 'OU'
          }
        }
        return wtype;
      },
      getbkPreOrderView(){
        if(!this.allowGetbkPreOrderView)
            return;

        console.info('getbkPreOrderView..');
         this.axios({
          method: 'post',
          url: '/ball/getbkPreOrderView.op',
          data: {
            "uid": this.$store.state.uid,
            "gid": this.betformData.item.gid,
            "gtype": this.betformData.item.gtype,
            "wtype": this.changeWtypeByShowType(this.betformData.wtype),
            "side": this.betformData.side
          }
        })
          .then(function (response) {
            let resp = response.data;
            if (resp.code != 200) {
              this.showErrTip(resp.message);
              return;
            }

            let data = resp.data;
            if(data.errormsg) {
              this.showErrTip("获取投注失败");
              return;
            }
            this.bkPreOrderViewResp = resp.data;

            if(this.importValue==20){
              this.importValue =0;
            }
            this.importValue = parseFloat(this.importValue) + 1 ;
            this.betformData.iorratio = data.ioratio;
            if(this.betformData.wtype=='RE'){
               this.betformData.ratio = data.spread;
            }else if(this.betformData.wtype=='ROU'){
               let sideName = this.betformData.side=='H'?'小':"大";
               this.betformData.ratio =sideName+" "+data.spread;
            }
            console.info("ratio:"+this.betformData.ratio+",iorratio:"+this.betformData.iorratio);
            this.betformData.strong = data.strong;
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          });
      },
      onButtonClick (cb, link) {
        cb && cb(this.name)

      },
      getKeyBoardMoney (money, $event) {
        console.log("from keyboad:"+money);
        this.money = money;
      },
      confirmEvent(money){
        if(money<50 || money>100){
          this.showErrTip("单注超过投注额度（50至100）");
          return;
        }
        if(!this.bkPreOrderViewResp){
          this.allowGetbkPreOrderView = true;
          this.showErrTip("获取投注失败");
          return;
        }
        //停止获取投注信息
        if(!this.allowGetbkPreOrderView){
           return;
        }
        this.allowGetbkPreOrderView=false;
        let debug=false;
        if(debug){
          console.info('投注成功！');
          this.showcalculation = false;
          this.betformData.ratio = "5.5";
          this.showErrTip('投注成功');
          return;
        }
        let i =this.bkPreOrderViewResp.ioratio;
        this.showErrTip("投注中......");
        this.axios({
          method: 'post',
          url: '/ball/bkbet.op',
          data: {
            "account": this.$store.state.account,
            "uid": this.$store.state.uid,
            "gid": this.betformData.item.gid,
            "gtype": this.betformData.item.gtype,
            "golds": money,
            "wtype": this.changeWtypeByShowType(this.betformData.wtype),
            "side": this.betformData.side,
            "ioratio": this.bkPreOrderViewResp.ioratio,
            "con": this.bkPreOrderViewResp.con,
            "ratio": this.bkPreOrderViewResp.ratio,
            "timestamp2": this.bkPreOrderViewResp.ts
          }
        })
          .then(function (response) {
            let resp = response.data;
            if (resp.code != 200) {
              this.allowGetbkPreOrderView = true;
              this.showErrTip("投注失败,网络服务问题！");
              return;
            }
            let data = resp.data;
            let ticket_id = data.ticket_id;
            if (!ticket_id) {
              this.allowGetbkPreOrderView = true;
              this.showErrTip('投注失败，赔率问题，请重新投注！');
              return;
            } else {
               console.info('投注成功！spread:'+data.spread+",iorratio:"+data.ioratio);
              if(this.importValue==20){
                this.importValue =0;
              }
               this.showcalculation = false;
               this.showErrTip('投注成功');
              return;
            }
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang="less">
  @import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
  .vux-form-preview {
    overflow: hidden;
  }
</style>
<style>

  input{
    border: 1px solid #ccc;
    padding: 7px 0px;
    border-radius: 3px; /*css3属性IE不支持*/
    padding-left:5px;
    height: 25px;
    font-size: 20px;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .form-cell{
    text-align: left;
  }
  .form-cell-right{
    text-align: right;
  }
  .form-match-info{
    flex: 1;
    -webkit-box-flex: 1;
    text-align: left;
    position: relative;
    background-color: white ;
    color: #323232;
    font-size:14px;
    line-height:20px;
  }
  

</style>

