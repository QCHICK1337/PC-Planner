<template>
    <div class="hero-section">
        <div class="hero-content">
            <h1 class="display-4"><b>PC PLANNER</b></h1>
            <p class="lead">Skonfiguruj idealny komputer.</p>
            <b-button variant="primary" size="lg" @click="$router.push('/configurator')"><font-awesome-icon icon="screwdriver-wrench" /> Rozpocznij konfigurację</b-button>
        </div>
    </div>
</template>

<script>
import { BButton } from 'bootstrap-vue-next';

export default {
    components: {
        BButton,
    },
};
</script>

<style scoped>
.hero-section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow: hidden; 
}

.hero-section::before {
    content: "";
    position: absolute;
    top: -10%; 
    right: -10%;
    bottom: -10%;
    left: -10%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/main-background.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
}

.hero-content {
    text-align: center;
}

.hero-content h1 {
    color: white;
}

.hero-content p {
    color: white;
}

.b-button {
    margin-top: 20px;
}
</style>
