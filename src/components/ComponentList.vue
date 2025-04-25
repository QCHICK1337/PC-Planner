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
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
    props: {
        items: Array,
        fields: Array,
        sortBy: String,
        sortDesc: Boolean,
        itemType: String,
    },
    emits: ['selectItem'],
    setup(props, { emit }) {
        const { t } = useI18n();
        const store = useStore();
        const router = useRouter();

        const localSortBy = ref(props.sortBy);
        const localSortDesc = ref(props.sortDesc);
        const selectItem = (item) => {
            emit('selectItem', item);
        };
        const addItem = async (item) => {
            const typeToAction = {
                cpu: 'selectCpu',
                cooler: 'selectCooler',
                motherboard: 'selectMotherboard',
                ram: 'selectRAM',
                storage: 'selectStorage',
                gpu: 'selectGPU',
                case: 'selectCase',
                psu: 'selectPSU',
            };
            const action = typeToAction[props.itemType];
            if (action) {
                try {
                    await store.dispatch(action, item);
                } catch (error) {
                    console.error(`Failed to dispatch ${action}:`, error);
                }
            } else {
                console.warn('Unknown itemType:', props.itemType);
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
            return `$${price.toFixed(2)}`;
        };


        watch(localSortBy, (newVal) => {
            emit('update:sortBy', newVal);
        });
        watch(localSortDesc, (newVal) => {
            emit('update:sortDesc', newVal);
        });

        return {
            selectItem,

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