<template>
  <div id="app">
    <FSApp></FSApp>
<!--    <Login></Login>-->
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
import FSApp from "./components/FSApp"

export default {
  name: 'App',
  components: {
      FSApp
  }
}
</script>

<style>
  html, body {
    margin: 0;
    top: 0;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
