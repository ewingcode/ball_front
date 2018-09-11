import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Roll from '../components/Roll'
import BkGame from '../components/BkGame'
import Today from '../components/Today'
import BillHistory from '../components/BillHistory'
import DailyBill from '../components/DailyBill'
import CurrentBill from '../components/CurrentBill'
import Setting from '../components/Setting'
Vue.use(VueRouter);

const routes = [{
  path: '/',
  name:"login",
  component: Login
}, {
  path: '/home',
  name:"home",
  component: Roll,
  meta: {
    requireAuth: true
  }
},{
  path: '/billhistory',
  name:"billhistory",
  component: BillHistory,
  meta: {
    requireAuth: true
  }
}, {
    path: '/dailybill',
    name:"dailybill",
    component: DailyBill,
    meta: {
      requireAuth: true
    }
  },{
  path: '/currentbill',
  name:"currentbill",
  component: CurrentBill,
  meta: {
    requireAuth: true
  }
},
  {
  path: '/roll',
  name:"roll",
  component: Roll,
  meta: {
    requireAuth: true
  }
},{
  path: '/bkroll',
  name:"bkroll",
  component: BkGame,
  meta: {
    requireAuth: true
  }
},{
  path: '/bktoday',
  name:"bktoday",
  component: BkGame,
  meta: {
    requireAuth: true
  }
},{
  path: '/today',
  name:"today",
  component: Today,
  meta: {
    requireAuth: true
  }
},{
    path: '/setting',
    name:"setting",
    component: Setting,
    meta: {
      requireAuth: true
    }
  }]

const router = new VueRouter({
  routes
});


export default router;
