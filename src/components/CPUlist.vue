<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="8">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filterCategories"
                    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
                    @select-item="selectCpu" :itemType="'cpu'" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed } from 'vue';
import ComponentList from './ComponentList.vue';
import FilterSidebar from './FilterSidebar.vue';

export default {
    components: {
        ComponentList,
        FilterSidebar,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            products: [],
            isCollapsed: false,
            sortBy: '',
            sortDesc: false,
            manufacturers: [],
        });
        const selectCpu = (cpu) => {
            store.dispatch('selectCpu', cpu);
            router.push({ name: 'Configurator', params: { cardId: 'cpus' } });
        };

        onMounted(() => {
            const q = query(collection(db, 'cpu'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());
                state.manufacturers = [...new Set(state.products.map(product => product.manufacturer))];
            });
        });

        const filters = computed(() => [
            {
                name: 'Manufacturer',
                options: state.manufacturers,
                selectedOptions: state.manufacturers,
            },
        ]);

        const filteredProducts = computed(() => {
            return state.products;
        });

        return {
            state,
            selectCpu,
            filters,
            filteredProducts,
        };
    },
    data() {
        return {
            fields: [
                { key: 'image', sortable: false, label: '' },
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'core-count', sortable: true, label: 'Ilość rdzeni' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>