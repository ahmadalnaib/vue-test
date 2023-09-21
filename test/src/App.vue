<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header class="flex justify-between container mx-auto  p-4">
    <RouterLink to="/">
    <img alt="Vue logo" class="logo bg-slate-500 p-2" src="@/assets/PlanerAI-Logo-w-2048x448.png" width="100" height="100" />
  </RouterLink>
    <div class="wrapper">
    

      <nav class="flex">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/reporting-view">Recommendation-Ai</RouterLink>
      
        <RouterLink to="/about">About</RouterLink>
       
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
