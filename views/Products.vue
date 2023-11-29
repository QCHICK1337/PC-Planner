<template>
    <div class="container mt-4">
        <BFormInput v-model="search" placeholder="Search products" class="mb-3" />
        <router-view />
    </div>
</template>

<script>
import { BFormInput } from 'bootstrap-vue-next';
import { RouterView } from 'vue-router';

export default {
    components: {
        BFormInput,
        RouterView
    }
}
</script>