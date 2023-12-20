<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="10">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filterCategories"
                    v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc" @select-item="selectCpu"
                    :itemType="'cpu'" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, ref, watchEffect } from 'vue';
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
            sortBy: '',
            sortDesc: false,
            manufacturers: [],
        });
        const selectCpu = (cpu) => {
            store.dispatch('selectCpu', cpu);
            router.push({ name: 'Configurator', params: { cardId: 'cpus' } });
        };

        const selectedManufacturers = ref([]);

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: 'Producent',
                options: [],
                selectedOptions: [],
            },
        ]);

        onMounted(() => {
            const q = query(collection(db, 'cpu'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());

                filters.forEach(filter => {
                    const productProperty = filter.name.toLowerCase();
                    const uniqueValues = [...new Set(state.products.map(product => product[productProperty]))];
                    filter.options = uniqueValues;
                    filter.selectedOptions = uniqueValues;
                });
            });
        });

        watchEffect(() => {
            filters.value = [
                {
                    name: 'Manufacturer',
                    options: state.manufacturers,
                    selectedOptions: selectedManufacturers.value,
                },
            ];
        });

        const filteredProducts = computed(() => {
            return state.products.filter(product => {
                return filters.every(filter => {
                    return filter.selectedOptions.includes(product[filter.name.toLowerCase()]);
                });
            });
        });

        const applyFilters = (filterName, selectedOptions) => {
            const filter = filters.find(filter => filter.name === filterName);
            if (filter) {
                filter.selectedOptions = selectedOptions;
            }
        };

        return {
            state,
            selectCpu,
            filters,
            filteredProducts,
            applyFilters,
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