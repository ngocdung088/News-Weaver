import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        username: '',
        token: '',
        infoMessage: '',
        showModal: false
    },
    getters: {
        formatUsername(state) {
            return state.username.toLowerCase().split(' ').map((word) => {
                return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
        },
        getToken(state) {
            return state.token;
        }
    },
    mutations: {
        setUser(state, user) {
            state.username = user.username;
            state.token = user.token;
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        removeUser(state) {
            state.username = '';
            state.token = '';
        },
        openModal(state, message) {
            state.showModal = true;
            state.infoMessage = message;
        },  
        closeModal(state) {
            state.infoMessage = '';
            state.showModal = false;
        }
    }
});

export default store;
