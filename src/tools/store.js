import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const state = {
    count: 1,
    author: "静茹♂鱼",
    ifShowNavBar: false,
    uid:"",
    loginTime:"-1",
    account:""
};

const mutations = {
    add(state) {
        state.count += 1;
    },
    reduce(state) {
        state.count -= 1;
    },
    hideNavBar(state) {
        state.ifShowNavBar = false;
    },
    showNavBar(state) {
        state.ifShowNavBar = true;
    },
    setLoginInfo(state,opt) {
       state.uid  = opt.uid;
       state.loginTime = opt.loginTime;
       state.account =opt.account;
    }
};

const getters = {
    author(state) {
        return "❤❤❤" + state.author + "❤❤❤";
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters
});
