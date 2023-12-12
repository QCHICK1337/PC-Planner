import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    selectedCpu: null,
    selectedCooler: null,
    selectedMotherboard: null,
    selectedRAM: null,
  },
  mutations: {
    setSelectedCpu(state, cpu) {
      state.selectedCpu = cpu;
    },
    setSelectedCooler(state, cooler) {
      state.selectedCooler = cooler;
    },
    setSelectedMotherboard(state, motherboard) {
      state.selectedMotherboard = motherboard;
    },
    setSelectedRAM(state, ram) {
      state.selectedRAM = ram;
    },
  },
  actions: {
    selectCpu({ commit }, cpu) {
      commit('setSelectedCpu', cpu);
    },
    selectCooler({ commit }, cooler) {
      commit('setSelectedCooler', cooler);
    },
    selectMotherboard({ commit }, motherboard) {
      commit('setSelectedMotherboard', motherboard);
    },
    selectRAM({ commit }, ram) {
      commit('setSelectedRAM', ram);
    },
  },
  plugins: [createPersistedState()],
});