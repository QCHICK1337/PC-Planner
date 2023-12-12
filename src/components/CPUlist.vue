<template>
    <component-list :items="state.products" :fields="fields" :filter-categories="filterCategories"
        v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
        @select-item="selectCpu" />
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import ComponentList from './ComponentList.vue';

export default {
    components: {
        ComponentList,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            products: [],
            isCollapsed: false, // Define isCollapsed
            sortBy: '', // Define sortBy
            sortDesc: false, // Define sortDesc
        });
        const selectCpu = (cpu) => {
            store.commit('setSelectedCpu', cpu);
            router.push('/configurator');
        };

        onMounted(() => {
            const q = query(collection(db, 'cpu'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
            });
        });

        return {
            state, // Return state as an object
            selectCpu,
        };
    },
    data() {
        return {
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'core-count', sortable: true, label: 'Ilość rdzeni' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'actions', label: '' },
                { key: 'add', label: '' },
            ],
            filterCategories: [], // Define your filter categories here
        };
    },
};
</script>