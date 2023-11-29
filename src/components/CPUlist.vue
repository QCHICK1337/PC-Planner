<template>
    <div class="container mt-4">
        <BTable :items="products" :fields="fields" v-model:sort-by="sortBy" v-model:sort-desc="sortDesc" responsive="sm"
            :row-class="'align-items-center'">
            <template #cell(price)="data">
                {{ data.item.price }}
            </template>
            <template #cell(actions)>
                <BButton variant="primary" class="ml-3">Dodaj</BButton>
            </template>
        </BTable>
    </div>
</template>

<script>
import { BTable, BButton } from 'bootstrap-vue-next';
import { db } from '../firebase'; // import your Firestore instance
import { collection, onSnapshot, query } from 'firebase/firestore'; // import Firestore functions

export default {
    components: {
        BTable,
        BButton,
    },
    data() {
        return {
            products: [],
            search: '',
            fields: [
                { key: 'name', sortable: true },
                { key: 'corecount', sortable: true },
                { key: 'price', sortable: true },
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