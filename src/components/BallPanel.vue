<template>
  <div class="weui-panel weui-panel_access" >
    <div class="weui-panel__hd title" v-if="item.league" @click="onClickHeader">
      <div class="weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__desc headerdesc"  >{{item.league}} {{item.datetime}}</h4>
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__desc" > </h4>
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__desc headerdesc" v-if="showType=='RB'">{{item.se_now}} {{(String(parseInt(item.t_count/60))).padLeft(2,0) }}:{{String(item.t_count&60).padLeft(2,0)}} {{item.t_status=="START"?"进行":"暂停"}}</h4>
          <h4 class="weui-media-box__desc headerdesc" v-if="showType=='FT'">{{item.matchtime}}</h4>
        </div>
      </div>
      <!--<slot name="item.league  item.matchTime"></slot>-->
    </div>
    <div class="weui-panel__bd">
      <slot name="body">
          <div class="weui-media-box weui-media-box_text"  >
            <div class="weui-media-box_appmsg">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc" v-html="item.team_h"></h4>
                <h4 class="weui-media-box__desc contentdesc" v-html="item.team_c"></h4>
              </div>
              <div class="weui-media-box__bd" v-if="showType=='RB'">
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc" @click="showBetForm('RE','H',item,item.n_ratio,item.n_ior_RH,item.n_strong)" >让 {{ item.n_strong == 'H' ? item.n_ratio : '0' }}<br> <span class="warningdesc">{{item.n_ior_RH}}</span></h4>
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc" @click="showBetForm('RE','C',item,item.n_ratio,item.n_ior_RC,item.n_strong)" >让 {{ item.n_strong == 'C' ? item.n_ratio : '0' }} <br> <span class="warningdesc">{{item.n_ior_RC}}</span></h4>
              </div>
              <div class="weui-media-box__bd" v-if="showType=='FT'">
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc" @click="showBetForm('RE','H',item,item.ratio,item.ior_RH,item.strong)" >让 {{ item.strong == 'H' ? item.ratio : '0' }}<br> <span class="warningdesc">{{item.ior_RH}}</span></h4>
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc" @click="showBetForm('RE','C',item,item.ratio,item.ior_RC,item.strong)" >让 {{ item.strong == 'C' ? item.ratio : '0' }} <br> <span class="warningdesc">{{item.ior_RC}}</span></h4>
              </div>
              <div class="weui-media-box__bd" v-if="showType=='RB'">
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc"  @click="showBetForm('ROU','C',item,item.n_ratio_o,item.n_ior_OUC)"  >{{item.n_ratio_o}} <br> <span class="warningdesc">{{item.n_ior_OUC}}</span></h4>
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc"  @click="showBetForm('ROU','H',item,item.n_ratio_u,item.n_ior_OUH)"  >{{item.n_ratio_u}} <br> <span class="warningdesc">{{item.n_ior_OUH}}</span></h4>
              </div>
              <div class="weui-media-box__bd" v-if="showType=='FT'">
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc"  @click="showBetForm('ROU','C',item,item.ratio_o,item.ior_OUC)"  >{{item.ratio_o}} <br> <span class="warningdesc">{{item.ior_OUC}}</span></h4>
                <h4 class="weui-media-box__desc betinfo_radio_ou_block contentdesc"  @click="showBetForm('ROU','H',item,item.ratio_u,item.ior_OUH)"  >{{item.ratio_u}} <br> <span class="warningdesc">{{item.ior_OUH}}</span></h4>
              </div>
            </div>
            <div class="weui-media-box_appmsg" v-if="showType=='RB'">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">主队：</h4>
                <h4 class="weui-media-box__desc contentdesc">客队：</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">{{item.sc_Q1_H?item.sc_Q1_H.padLeft(2,0):""}} {{item.sc_Q2_H?item.sc_Q2_H.padLeft(2,0):""}} {{item.sc_Q3_H?item.sc_Q3_H.padLeft(2,0):""}} {{item.sc_Q4_H?item.sc_Q4_H.padLeft(2,0):""}} </h4>
                <h4 class="weui-media-box__desc contentdesc">{{item.sc_Q1_A?item.sc_Q1_A.padLeft(2,0):""}} {{item.sc_Q2_A?item.sc_Q2_A.padLeft(2,0):""}} {{item.sc_Q3_A?item.sc_Q3_A.padLeft(2,0):""}} {{item.sc_Q4_A?item.sc_Q4_A.padLeft(2,0):""}}</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">主:{{item.sc_FT_H}} 总分:{{item.sc_total}}</h4>
                <h4 class="weui-media-box__desc contentdesc">客:{{item.sc_FT_A}} 分差:{{item.sc_FT_H-item.sc_FT_A}}</h4>
              </div>
            </div>
            <div class="weui-media-box_appmsg" v-if="showType=='RB'">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc contentdesc">初盘即时差: </h4>
                <h4 class="weui-media-box__desc contentdesc">初盘:</h4>
                <h4 class="weui-media-box__desc contentdesc">最低:</h4>
                <h4 class="weui-media-box__desc contentdesc">最高:</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc warningdesc">{{item.n_ratio!=null?item.n_ratio-item.ratio:0}} </h4>
                <h4 class="weui-media-box__desc contentdesc">{{ item.n_strong == 'C' ? '-' : '' }}{{item.ratio}} </h4>
                <h4 class="weui-media-box__desc contentdesc">{{item.minRatioR}}</h4>
                <h4 class="weui-media-box__desc contentdesc">{{item.maxRatioR}}</h4>
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__desc warningdesc"  >{{beginNowRatioOValue}}  </h4>
                <h4 class="weui-media-box__desc contentdesc"  >{{beginRatioO}} </h4>
                <h4 class="weui-media-box__desc contentdesc"  >{{item.minRatioRou}}</h4>
                <h4 class="weui-media-box__desc contentdesc"  >{{item.maxRatioRou}}</h4>
              </div>
            </div>
           <!-- <ul class="weui-media-box__info" >
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" >下注数：2</li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" >可赢：200</li>
            </ul>-->
          </div>
      </slot>
    </div>
 <!--   <div class="weui-panel__ft">
      <a  class="weui-cell weui-cell_access weui-cell_link"
        @click.prevent="onClickFooter">
        <div class="weui-cell__bd" >查看更多</div>
      </a>
    </div>-->
  </div>
</template>

<script>

  export default {
    name: 'ballpanel',
    props: {
      item: Object,
      showType:String
    },
    computed: {
      formatScore:function(score){
        return  score?score.padLeft(2,0):"";
      },
      beginNowRatioOValue:function(){
        if(this.item.n_ratio_o && this.item.ratio_o){
          return this.item.n_ratio_o.substring(2) - this.item.ratio_o.substring(2);
        }else{
          return 0;
        }
      },
      beginRatioO: function () {
        if(this.item.ratio_o) {
          return this.item.ratio_o.substring(2);
        }else{
          return "";
        }

      }
    },
    methods: {
      onImgError (item, $event) {

      },
      getUrl (url) {

      },
      onClickFooter () {

      },
      onClickHeader () {

      },
      onItemClick (item) {

      },
      showBetForm (wtype,side,item,ratio,ioratio,strong) {
        this.$emit('showBetForm',wtype,side,item,ratio,ioratio,strong);
        console.info(item);
      }
    }
  }
</script>
<style lang="less">
  @import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_access';
  @import '../../node_modules/vux/src/styles/weui/widget/weui_panel/weui_panel';
  @import '../../node_modules/vux/src/styles/weui/widget/weui_media_box/weui_media_box';
</style>

<style>


</style>

