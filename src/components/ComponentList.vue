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
            <b-button variant="primary" @click.stop="addItem(data.item)">{{ t('productDetails.add') }}</b-button>
        </template>
    </b-table>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

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
        const { t } = useI18n();
        const store = useStore();
        const router = useRouter();
        const localIsCollapsed = ref(props.isCollapsed);
        const localSortBy = ref(props.sortBy);
        const localSortDesc = ref(props.sortDesc);
        const selectItem = (item) => {
            emit('selectItem', item);
        };
        const addItem = (item) => {
            store.dispatch('cart/addItem', item);
            router.push('/cart');
        };
        const sortNumericFields = (a, b, key) => {
            return a[key] - b[key];
        };
        const formatPrice = (price) => {
            return `$${price.toFixed(2)}`;
        };
        return {
            selectItem,
            localIsCollapsed,
            localSortBy,
            localSortDesc,
            addItem,
            formatPrice,
            sortNumericFields,
            t,
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