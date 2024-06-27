<template>
    <h2 class="text-center my-4 my-md-5">{{ $t('labels.selectCpu') }}</h2>
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
import { useI18n } from 'vue-i18n';

export default {
    components: {
        ComponentList,
        FilterSidebar,
    },
    setup() {
        const { t } = useI18n();
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
        const selectedSockets = ref([]);
        const selectedCoreCounts = ref([]);

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: t('labels.manufacturer'),
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Socket',
                label: t('labels.socket'),
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Core-Count',
                label: t('labels.core-count'),
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
                    let uniqueValues = [...new Set(state.products.map(product => product[productProperty]))];

                    if (filter.name === 'Core-Count') {
                        uniqueValues = uniqueValues.sort((a, b) => a - b);
                    }

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
                {
                    name: 'Socket',
                    options: state.sockets,
                    selectedOptions: selectedSockets.value,
                },
                {
                    name: 'Core-Count',
                    options: state.coreCounts,
                    selectedOptions: selectedCoreCounts.value,
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

        const fields = computed(() => [
            { key: 'image', sortable: false, label: '' },
            { key: 'name', sortable: true, label: t('labels.name') },
            { key: 'core-count', sortable: true, label: t('labels.core-count') },
            { key: 'price', sortable: true, label: t('labels.price') },
            { key: 'add', label: '' },
        ]);

        return {
            state,
            selectCpu,
            filters,
            filteredProducts,
            applyFilters,
            fields,
            filterCategories: [],
        };
    },
};
</script>