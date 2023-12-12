<template>
    <component-list :items="state.products" :fields="fields" :filter-categories="filterCategories"
        v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
        @select-item="selectRAM" :itemType="'ram'" /> 
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
            isCollapsed: false, 
            sortBy: '', 
            sortDesc: false, 
        });
        const selectRAM = (ram) => {
            store.dispatch('selectRAM', ram);
            router.push({ name: 'Configurator', params: { cardId: 'ram' } });
        };

        onMounted(() => {
            const q = query(collection(db, 'ram'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
            });
        });

        return {
            state, 
            selectRAM,
        };
    },
    data() {
        return {
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'type', sortable: true, label: 'Typ pamięci' },
                { key: 'total-memory', sortable: true, label: 'Pojemność łączna'},
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [], 
        };
    },
};
</script>