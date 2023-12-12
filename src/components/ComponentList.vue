<template>
    <BCollapse v-model="localIsCollapsed" class="d-md-block">

    </BCollapse>

    <BTable :items="items" :fields="fields" v-model:sort-by="localSortBy" v-model:sort-desc="localSortDesc" responsive="sm"
        :row-class="'align-items-center'">

    </BTable>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        items: Array,
        fields: Array,
        filterCategories: Array,
        isCollapsed: Boolean,
        sortBy: String,
        sortDesc: Boolean,
    },

    emits: ['selectItem'],

    setup(props, { emit }) {
        const localIsCollapsed = ref(props.isCollapsed);
        const localSortBy = ref(props.sortBy);
        const localSortDesc = ref(props.sortDesc);

        const selectItem = (item) => {
            console.log(item); 
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
        };

        
    },
};
</script>