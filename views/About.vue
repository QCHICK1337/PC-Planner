<template>
    <div class="about">
        <h1>About Page</h1>
        <p>{{ aboutText }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aboutText: "This is some placeholder text for the about page.",
        };
    },
};
</script>

<style scoped>
.about {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
