<template>
  <div id="app">
    <router-view name='nav'></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
    name: 'App',
    components: {
      // Login,
      // Header,
      // Home,
      // UserInfo
    },
    methods: {}
}
</script>

<style>
#app {
    font-family: Nunito, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    width: 100%;
    height: 100%;
}
</style>
