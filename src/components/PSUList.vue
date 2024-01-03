<template>
    <h2 class="text-center my-4 my-md-5">Wybierz zasilacz</h2>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="10">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filters"
                    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy" v-model:sort-desc="state.sortDesc"
                    @select-item="selectPsu" :itemType="'psu'" />
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
        const selectPsu = (psu) => {
            store.dispatch('selectPsu', psu);
            router.push({ name: 'Configurator', params: { cardId: 'psus' } });
        };

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: 'Producent',
                options: [],
                selectedOptions: [],
            },
        ]);

        onMounted(() => {
            const q = query(collection(db, 'psu'));
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
            selectPsu,
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
                { key: 'wattage', sortable: true, label: 'Moc' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>