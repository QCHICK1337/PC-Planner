<template>
    <div class="container mt-4">
        <BTable :items="products" :fields="fields" v-model:sort-by="sortBy" v-model:sort-desc="sortDesc" responsive="sm"
            :row-class="'align-items-center'">
            <template #cell(price)="data">
                {{ data.item.price }}
            </template>
            <template #cell(actions)="data">
                <BButton variant="primary" class="ml-3" @click="selectCpu(data.item)">Dodaj</BButton>
            </template>
        </BTable>
    </div>
</template>

<script>
import { BTable, BButton } from 'bootstrap-vue-next';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        BTable,
        BButton,
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
            search: '',
            fields: [
                { key: 'name', sortable: true, label: 'Nazwa' },
                { key: 'core-count', sortable: true, label: 'Ilość rdzeni' },
                { key: 'price', sortable: true, label: 'Cena' },
                { key: 'actions', label: '' },
            ],
            sortBy: 'name',
            sortDesc: false,
        };
    },
    created() {
        const q = query(collection(db, 'cpu'));
        onSnapshot(q, snapshot => {
            this.products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    },
};
</script>