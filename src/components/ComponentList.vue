<template>
    <b-table :items="items" :fields="fields" v-model:sortBy="localSortBy" v-model:sortDesc="localSortDesc"
        @row-clicked="selectItem" responsive="md" tbody-tr-class="align-middle" :sort-compare="sortNumericFields">
        <template #cell(image)="data">
            <router-link :to="{ name: 'ProductDetails', params: { collection: itemType, name: data.item.name } }">
                <b-img :src="data.item.image" alt="Image" class="my-image"></b-img>
            </router-link>
        </template>
        <template #cell(name)="data">
            <router-link class="product-name"
                :to="{ name: 'ProductDetails', params: { collection: itemType, name: data.item.name } }">
                {{ data.item.name }}
            </router-link>
        </template>
        <template #cell(price)="data">
            {{ formatPrice(data.item.price) }}
        </template>
        <template #cell(add)="data">
            <b-button variant="primary" @click.stop="addItem(data.item)">Dodaj</b-button>
        </template>
    </b-table>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    props: {
        items: Array,
        fields: Array,
        filterCategories: Array,
        isCollapsed: Boolean,
        sortBy: String,
        sortDesc: Boolean,
        itemType: String,
    },

    emits: ['selectItem'],

    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        const localIsCollapsed = ref(props.isCollapsed);
        const localSortBy = ref(props.sortBy);
        const localSortDesc = ref(props.sortDesc);

        const selectItem = (item) => {
            console.log(item);
        };

        const addItem = (item) => {
            if (props.itemType === 'cpu') {
                store.dispatch('selectCpu', item);
            } else if (props.itemType === 'cooler') {
                store.dispatch('selectCooler', item);
            }
            else if (props.itemType === 'motherboard') {
                store.dispatch('selectMotherboard', item);
            }
            else if (props.itemType === 'ram') {
                store.dispatch('selectRAM', item);
            }
            else if (props.itemType === 'storage') {
                store.dispatch('selectStorage', item);
            }
            else if (props.itemType === 'gpu') {
                store.dispatch('selectGPU', item);
            }
            else if (props.itemType === 'case') {
                store.dispatch('selectCase', item);
            }
            else if (props.itemType === 'psu') {
                store.dispatch('selectPSU', item);
            }
            router.push('/configurator');
        };

        const sortNumericFields = (a, b, key) => {
            if (key === 'name') {
                return props.sortDesc ? b[key].localeCompare(a[key]) : a[key].localeCompare(b[key]);
            }
            if (!isNaN(a[key]) && !isNaN(b[key])) {
                return props.sortDesc ? b[key] - a[key] : a[key] - b[key];
            }
            return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
        };

        const formatPrice = (price) => {
            return price.toLocaleString('pl-PL', { minimumFractionDigits: 2 }) + ' zł';
        };

        watch(localIsCollapsed, (newVal) => {
            emit('update:isCollapsed', newVal);
        });

        watch(localSortBy, (newVal) => {
            emit('update:sortBy', newVal);
        });

        watch(localSortDesc, (newVal) => {
            emit('update:sortDesc', newVal);
        });

        return {
            selectItem,
            localIsCollapsed,
            localSortBy,
            localSortDesc,
            addItem,
            formatPrice,
            sortNumericFields,
        };


    },
};
</script>

<style scoped>
.my-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.product-name {
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

.product-name:hover {
    color: rgb(95, 95, 255);
}
</style>