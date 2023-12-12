import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        selectedCpu: null,
        // Add other selected items here
    },
    mutations: {
        setSelectedCpu(state, cpu) {
            state.selectedCpu = cpu;
        },
        // Add other mutations here
    },
    actions: {
        selectCpu({ commit }, cpu) {
            commit('setSelectedCpu', cpu);
        },
        // Add other actions here
    },
    plugins: [createPersistedState()],
});