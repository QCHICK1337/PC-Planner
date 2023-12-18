import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    selectedCpu: null,
    selectedCooler: null,
    selectedMotherboard: null,
    selectedRAM: null,
    selectedStorage: null,
    selectedGPU: null,
    selectedCase: null,
    selectedPSU: null
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
    setSelectedStorage(state, storage) {
      state.selectedStorage = storage;
    },
    setSelectedGPU(state, gpu) {
      state.selectedGPU = gpu;
    },
    setSelectedCase(state, pccase) {
      state.selectedCase = pccase;
    },
    setSelectedPSU(state, psu) {
      state.selectedPSU = psu;
    }
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
    selectStorage({ commit }, storage) {
      commit('setSelectedStorage', storage);
    },
    selectGPU({ commit }, gpu) {
      commit('setSelectedGPU', gpu);
    },
    selectCase({ commit }, pccase) {
      commit('setSelectedCase', pccase);
    },
    selectPSU({ commit }, psu) {
      commit('setSelectedPSU', psu);
    }
  },
  plugins: [createPersistedState()],
});