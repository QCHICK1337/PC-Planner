<template>
    <component-list :items="state.products" :fields="fields" :filter-categories="filterCategories"
        v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
        @select-item="selectMotherboard" :itemType="'motherboard'" /> 
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
        const selectMotherboard = (motherboard) => {
            store.dispatch('selectMotherboard', motherboard);
            router.push({ name: 'Configurator', params: { cardId: 'motherboards' } });
        };

        onMounted(() => {
            const q = query(collection(db, 'motherboard'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
            });
        });

        return {
            state, 
            selectMotherboard,
        };
    },
    data() {
        return {
            fields: [
                // Define the fields for your motherboards here
            ],
            filterCategories: [], 
        };
    },
};
</script>