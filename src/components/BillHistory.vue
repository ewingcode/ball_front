<template>
  <div>
    <header-bar :showBack="false" title="历史账单"></header-bar>
    <div v-if="billHistory!=null && billHistory.msg!=null" class="closeQuery" >{{billHistory.msg}}</div>
    <div v-if="billHistory!=null && billHistory.msg==null">

      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
        <tr>
          <th width="40%">日期</th>
          <th>投注额</th>
          <th>有效金额</th>
          <th>输 / 赢</th>
        </tr>
        </thead>
        <tbody>
        <tr v-model="billHistory" v-for="item in this.billHistory.history" @click="goDaliyBill(item.date)">
          <td>{{item.date_name}}</td>
          <td>{{item.gold}}</td>
          <td>{{item.vgold}}</td>
          <td v-bind:class="item.winloss_class">{{item.winloss}}</td>
        </tr>


        </tbody>
      </x-table>
      <br>
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <tr>
          <td width="40%">总计<br></td>
          <td>{{billHistory.total_gold}}</td>
          <td>{{billHistory.total_vgold}}</td>
          <td v-bind:class="billHistory.total_winloss_calss">{{billHistory.total_winloss}}</td>
        </tr>
      </x-table>

    </div>

  </div>
</template>

<script>
  import { XTable, LoadMore } from 'vux'
  import HeaderBar from "@/components/HeaderBar.vue";
  export default {
    name: 'BillHistory',
    components: {
      XTable,
      LoadMore,
      HeaderBar
    },
    created: function () {
      this.getBillHistory();
    } ,
    methods: {
      goDaliyBill(date ) {
        console.log('dailybill'+date);
        this.$router.push({
          name: "dailybill",
          query:{
            date:date,
            showBack:true
          }
        });
      },
      getBillHistory() {
        this.axios({
          method: 'post',
          url: '/ball/getHistoryData.op',
          data: {
             "uid": this.$store.state.uid
          }
        })
          .then(function (response) {
            let resp = response.data;
            if(resp.code==200){
              this.billHistory = resp.data;
            }
          }.bind(this));
      }
    },
    data(){
      return{
        billHistory : null
      }
    }
  }
</script>
<style>
  table{
    font-size: 12px !important ;
    line-height: 35px !important ;
    text-align: center;
  }

  table th{
    font-size: 14px !important ;
    font-weight: bold !important;
    background-color:#503F32 ;
    color: white;
    line-height: 35px !important ;
  }

  .winloss_green{
     color:green !important;
  }

  .winloss_red{
    color:red !important;
  }
</style>
