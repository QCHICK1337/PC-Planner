import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    selectedCpu: null,
    selectedCooler: null,
  },
  mutations: {
    setSelectedCpu(state, cpu) {
      state.selectedCpu = cpu;
    },
    setSelectedCooler(state, cooler) {
      state.selectedCooler = cooler;
    },
  },
  actions: {
    selectCpu({ commit }, cpu) {
      commit('setSelectedCpu', cpu);
    },
    selectCooler({ commit }, cooler) {
      commit('setSelectedCooler', cooler);
    },
  },
  plugins: [createPersistedState()],
});