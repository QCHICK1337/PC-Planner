<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">
        <font-awesome-icon icon="heart" /> Made by Kamil R.
        <span class="separator">|</span>
        <a href="https://github.com/QCHICK1337" target="_blank">
          <font-awesome-icon icon="code-branch" /> GitHub
        </a>
        <br />
        <small class="text-muted">2023-2024</small>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}

.separator {
  margin: 0 10px;
}

a {
  color: inherit;    
  text-decoration: none; 
}
</style>