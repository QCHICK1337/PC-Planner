<template>
    <h2 class="text-center my-4 my-md-5">{{ $t('labels.selectGpu') }}</h2>
    <b-container fluid>
        <b-row>
            <b-col cols="12" md="2">
                <filter-sidebar :filters="filters" @filter-change="applyFilters" />
            </b-col>
            <b-col cols="12" md="10">
                <component-list :items="filteredProducts" :fields="fields" :filter-categories="filters"
                    v-model:is-collapsed="state.isCollapsed" v-model:sort-by="state.sortBy"
                    v-model:sort-desc="state.sortDesc" @select-item="selectGpu" :itemType="'gpu'" />
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
            isCollapsed: false,
            sortBy: '',
            sortDesc: false,
        });
        const selectGpu = (gpu) => {
            store.dispatch('selectGpu', gpu);
            router.push({ name: 'Configurator' });
        };

        const filters = reactive([
            {
                name: 'Manufacturer',
                label: t('labels.manufacturer'),
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Chipset',
                label: t('labels.chipset'),
                options: [],
                selectedOptions: [],
            },
            {
                name: 'Memory',
                label: t('labels.memory'),
                options: [],
                selectedOptions: [],
            },
        ]);

        onMounted(() => {
            const q = query(collection(db, 'gpu'));
            onSnapshot(q, (snapshot) => {
                state.products = snapshot.docs.map(doc => doc.data());

                filters.forEach(filter => {
                    const productProperty = filter.name.toLowerCase();
                    let uniqueValues = [...new Set(state.products.map(product => product[productProperty]))];

                    if (filter.name === 'Memory') {
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
            selectGpu,
            filters,
            applyFilters,
            filteredProducts,
        };
    },
    data() {
        return {
            fields: [
                { key: 'image', sortable: false, label: '' },
                { key: 'name', sortable: true, label: this.$t('labels.name') },
                { key: 'memory', sortable: true, label: this.$t('labels.memory') },
                { key: 'price', sortable: true, label: this.$t('labels.price') },
                { key: 'add', label: '' },
            ],
            filterCategories: [],
        };
    },
};
</script>