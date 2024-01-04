<template>
    <h2 class="text-center my-4 my-md-5">Wybierz pamięć RAM</h2>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="10">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filters"
                    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy"
                    v-model:sort-desc="state.sortDesc" @select-item="selectRAM" :itemType="'ram'" />
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
        });
        const selectRAM = (ram) => {
            store.dispatch('selectRAM', ram);
            router.push({ name: 'Configurator', params: { cardId: 'ram' } });
        };

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: 'Producent',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Type',
                label: 'Typ pamięci',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Total-Memory',
                label: 'Pojemność łączna',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Speed',
                label: 'Prędkość',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Latency',
                label: 'Opóźnienie',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Modules',
                label: 'Moduły',
                options: [],
                selectedOptions: [],
            },
        ]);

        onMounted(() => {
            const q = query(collection(db, 'ram'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());

                filters.forEach(filter => {
                    const productProperty = filter.name.toLowerCase();
                    let uniqueValues = [...new Set(state.products.map(product => product[productProperty]))];

                    if (filter.name === 'Type' || filter.name === 'Modules') {
                        uniqueValues.sort((a, b) => {
                            const numA = parseInt(a.replace(/\D/g, ''));
                            const numB = parseInt(b.replace(/\D/g, ''));
                            return numA - numB;
                        });
                    } else {
                        uniqueValues.sort();
                    }

                    filter.options = uniqueValues;
                    filter.selectedOptions = uniqueValues;
                });
            });
        });

        const applyFilters = (filterName, selectedOptions) => {
            const filter = filters.find(filter => filter.name === filterName);
            if (filter) {
                filter.selectedOptions = selectedOptions;
            }
        };

        const filteredProducts = computed(() => {
            return state.products.filter(product => {
                return filters.every(filter => {
                    return filter.selectedOptions.includes(product[filter.name.toLowerCase()]);
                });
            });
        });

        return {
            state,
            selectRAM,
            filters,
            applyFilters,
            filteredProducts,
        };
    },
    data() {
        return {
            fields: [
                { key: 'image', sortable: false, label: '' },
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'type', sortable: true, label: 'Typ pamięci' },
                { key: 'total-memory', sortable: true, label: 'Pojemność łączna' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>