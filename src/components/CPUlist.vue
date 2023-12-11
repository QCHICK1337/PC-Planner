<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-3">
                <h3 class="d-none d-md-block">Filtry</h3>
                <button @click="isCollapsed = !isCollapsed" class="btn btn-primary mb-1 d-md-none">
                    <font-awesome-icon icon="filter" /> Filtry
                </button>
                <div class="filter-sidebar">
                    <BCollapse v-model="isCollapsed" class="d-md-block">
                        <h6>Test</h6>
                    </BCollapse>
                </div>
            </div>
            <div class="col-md-9">
                <BTable :items="filteredProducts" :fields="fields" v-model:sort-by="sortBy" v-model:sort-desc="sortDesc"
                    responsive="sm" :row-class="'align-items-center'">
                    <template #cell(price)="data">
                        {{ data.item.price }}
                    </template>
                    <template #cell(actions)="data">
                        <BButton variant="primary" class="ml-3" @click="selectCpu(data.item)">Dodaj</BButton>
                    </template>
                </BTable>
            </div>
        </div>
    </div>
</template>
  
<script>
import { BTable, BButton, BCollapse } from 'bootstrap-vue-next';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        BTable,
        BButton,
        BCollapse,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const selectCpu = (cpu) => {
            store.commit('setSelectedCpu', cpu);
            router.push('/configurator');
        };

        return {
            selectCpu,
        };
    },
    data() {
        return {
            products: [],
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'core-count', sortable: true, label: 'Ilość rdzeni' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'actions', label: '' },
            ],
            sortBy: 'name',
            sortDesc: false,
            isCollapsed: false,
        };
    },
    created() {
        const q = query(collection(db, 'cpu'));
        onSnapshot(q, (snapshot) => {
            this.products = snapshot.docs.map(doc => doc.data());
        });
    },
    computed: {
        filteredProducts() {
            return this.products;
        },
    },
};
</script>
  
<style scoped>
.filter-sidebar {
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .d-md-none {
        display: none;
    }
}
</style>