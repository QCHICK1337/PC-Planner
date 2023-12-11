import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    selectedCpu: null,
  },
  mutations: {
    setSelectedCpu(state, cpu) {
      state.selectedCpu = cpu;
    },
  },
  plugins: [createPersistedState()],
});