<template>
    <b-table :items="items" :fields="fields" v-model:sortBy="localSortBy" v-model:sortDesc="localSortDesc"
        @row-clicked="selectItem" responsive="md">
        <template #cell(image)="data">
            <b-img :src="data.item.image" alt="Image" class="my-image"></b-img>
        </template>
        <template #cell(add)="data">
            <b-button variant="primary" @click="addItem(data.item)">Dodaj</b-button>
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
            addItem
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
</style>