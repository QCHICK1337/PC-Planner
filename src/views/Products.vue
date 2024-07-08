<template>
    <div class="container mt-4">
        <router-view />
    </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    components: {
        RouterView
    }
}
</script>