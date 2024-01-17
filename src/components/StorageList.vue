<template>
    <h2 class="text-center my-4 my-md-5">Wybierz dysk</h2>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="10">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filters"
                    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy"
                    v-model:sort-desc="state.sortDesc" @select-item="selectStorage" :itemType="'storage'" />
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
        const selectStorage = (storage) => {
            store.dispatch('selectStorage', storage);
            router.push({ name: 'Configurator', params: { cardId: 'storages' } });
        };

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: 'Producent',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Capacity',
                label: 'Pojemność',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Memory-Form-Factor',
                label: 'Format pamięci',
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Interface',
                label: 'Interfejs',
                options: [],
                selectedOptions: [],
            },
        ]);

        onMounted(() => {
            const q = query(collection(db, 'storage'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());

                filters.forEach(filter => {
                    const productProperty = filter.name.toLowerCase();
                    let uniqueValues = [...new Set(state.products.map(product => product[productProperty]))];

                    if (filter.name === 'Capacity') {
                        uniqueValues.sort((a, b) => {
                            const numA = parseInt(a.replace(/\D/g, ''));
                            const numB = parseInt(b.replace(/\D/g, ''));
                            const unitA = a.replace(/\d/g, '').trim();
                            const unitB = b.replace(/\d/g, '').trim();

                            if (unitA === unitB) {
                                return numA - numB;
                            } else {
                                return unitA === 'GB' ? -1 : 1;
                            }
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
            selectStorage,
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
                { key: 'capacity', sortable: true, label: 'Pojemność' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>