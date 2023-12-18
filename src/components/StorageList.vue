<template>
    <component-list :items="state.products" :fields="fields" :filter-categories="filterCategories"
        v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
        @select-item="selectStorage" :itemType="'storage'" /> 
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

        const selectStorage = (storage) => {
            store.dispatch('selectStorage', storage);
            router.push({ name: 'Configurator', params: { cardId: 'storages' } });
        };

        onMounted(() => {
            const q = query(collection(db, 'storage'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
            });
        });

        return {
            state, 
            selectStorage,
        };
    },
    data() {
        return {
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'capacity', sortable: true, label: 'Pojemność' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [], 
        };
    },
};
</script>