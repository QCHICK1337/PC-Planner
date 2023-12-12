<template>
<component-list :items="state.products" :fields="fields" :filter-categories="filterCategories"
    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
    @select-item="selectCooler" :itemType="'cooler'" /> <!-- Add :itemType="'cooler'" -->
</template>

<script>
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
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
        const selectCooler = (cooler) => {
            store.dispatch('selectCooler', cooler);
            router.push({ name: 'Configurator', params: { cardId: 'coolers' } });
        };

        onMounted(() => {
            const q = query(collection(db, 'cooler'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
            });
        });

        return {
            state,
            selectCooler,
        };
    },
    data() {
        return {
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'max-rpm', sortable: true, label: 'Max. Obroty' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>