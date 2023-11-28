<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <Home />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Home
}
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  flex: 1 0 auto;
}
</style>